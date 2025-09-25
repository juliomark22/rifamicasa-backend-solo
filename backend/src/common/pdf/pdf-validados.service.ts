import PDFDocument from "pdfkit";
import type { Response } from "express";
import { Boleto } from "../../boletos/boleto.entity";

export class PdfValidadosService {
  generar(res: Response, boletos: Boleto[]) {
    const doc = new PDFDocument({ margin: 40 });
    res.setHeader("Content-Type", "application/pdf");
    res.setHeader("Content-Disposition", "attachment; filename=boletos_validados.pdf");
    doc.pipe(res);

    doc.fontSize(18).text("Listado de Boletos Validados", { align: "center" });
    doc.moveDown();

    boletos.forEach((b, idx) => {
      doc.fontSize(12).text(
        `${idx + 1}. Código: ${b.codigo} | Comprador: ${b.compradorNombre ?? "-"} | Documento: ${
          b.compradorDocumento ?? "-"
        } | Fecha: ${b.fechaValidacion ? b.fechaValidacion.toISOString().split("T")[0] : "-"}`
      );
    });

    doc.end();
  }
}
