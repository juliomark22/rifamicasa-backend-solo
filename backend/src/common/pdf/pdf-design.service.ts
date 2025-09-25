import PDFDocument from "pdfkit";
import * as QRCode from "qrcode";
import type { Response } from "express";
import { Boleto } from "../../boletos/boleto.entity";
import * as fs from "fs";

export class PdfDesignService {
  static async generarTalonarioConDiseno(
    res: Response,
    boletos: Boleto[],
    distribuidorNombre: string,
    tituloSorteo: string,
    logoPath?: string,
    premioPath?: string
  ) {
    const doc = new PDFDocument({ margin: 30 });
    res.setHeader("Content-Type", "application/pdf");
    res.setHeader(
      "Content-Disposition",
      `attachment; filename=talonario_${distribuidorNombre}.pdf`
    );
    doc.pipe(res);

    if (logoPath && fs.existsSync(logoPath)) {
      doc.image(logoPath, { fit: [80, 80], align: "center" });
    }
    doc.fontSize(18).text(tituloSorteo, { align: "center" });
    doc.moveDown();

    for (const boleto of boletos) {
      doc.rect(doc.x, doc.y, 500, 200).stroke();
      doc.moveDown();

      if (premioPath && fs.existsSync(premioPath)) {
        doc.image(premioPath, { fit: [180, 120], align: "center" });
      }

      doc.fontSize(14).text(`Código: ${boleto.codigo}`);
      doc.text(`Distribuidor: ${distribuidorNombre}`);
      doc.text(`Validado: ${boleto.validado ? "Sí" : "No"}`);

      const qrData = await QRCode.toDataURL(boleto.codigo);
      const qrImage = qrData.replace(/^data:image\/png;base64,/, "");
      doc.image(Buffer.from(qrImage, "base64"), {
        fit: [100, 100],
        align: "right",
      });

      doc.moveDown(2);
    }

    doc.end();
  }
}
