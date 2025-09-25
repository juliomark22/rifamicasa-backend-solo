import PDFDocument from "pdfkit";
import * as QRCode from "qrcode";
import type { Response } from "express";
import { Boleto } from "../../boletos/boleto.entity";

export class PdfService {
  static async generarTalonario(res: Response, boletos: Boleto[], distribuidorNombre: string) {
    const doc = new PDFDocument({ margin: 50 });
    res.setHeader("Content-Type", "application/pdf");
    res.setHeader("Content-Disposition", `attachment; filename=talonario_${distribuidorNombre}.pdf`);
    doc.pipe(res);

    doc.fontSize(20).text(`Talonario - ${distribuidorNombre}`, { align: "center" });
    doc.moveDown();

    for (const boleto of boletos) {
      doc.fontSize(14).text(`Código: ${boleto.codigo}`);
      doc.text(`Distribuidor: ${distribuidorNombre}`);
      doc.text(`Validado: ${boleto.validado ? "Sí" : "No"}`);

      const qrData = await QRCode.toDataURL(boleto.codigo);
      const qrImage = qrData.replace(/^data:image\/png;base64,/, "");
      doc.image(Buffer.from(qrImage, "base64"), { fit: [120, 120] });
      doc.moveDown(2);
    }

    doc.end();
  }

  static async generarListadoValidados(res: Response, boletos: Boleto[]) {
    const doc = new PDFDocument({ margin: 40 });
    res.setHeader("Content-Type", "application/pdf");
    res.setHeader("Content-Disposition", "attachment; filename=boletos_validados.pdf");
    doc.pipe(res);

    doc.fontSize(20).text("Boletos Validados - Para Tómbola", { align: "center" });
    doc.moveDown();

    for (const boleto of boletos) {
      doc.fontSize(14).text(`Código: ${boleto.codigo}`);
      doc.text(`Comprador: ${boleto.compradorNombre ?? "-"}`);
      doc.text(`Documento: ${boleto.compradorDocumento ?? "-"}`);
      doc.text(`Email: ${boleto.compradorEmail ?? "-"}`);
      doc.text(`Distribuidor: ${boleto.distribuidor ? boleto.distribuidor.nombre : "-"}`);
      doc.text(`Fecha Validación: ${boleto.fechaValidacion ? new Date(boleto.fechaValidacion).toLocaleString() : "-"}`);

      const qrData = await QRCode.toDataURL(boleto.codigo);
      const qrImage = qrData.replace(/^data:image\/png;base64,/, "");
      doc.image(Buffer.from(qrImage, "base64"), { fit: [120, 120] });
      doc.moveDown(2);
      doc.moveTo(40, doc.y).lineTo(555, doc.y).stroke();
      doc.moveDown();
    }

    doc.end();
  }
}
