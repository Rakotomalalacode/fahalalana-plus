import { PDFDocument, StandardFonts, rgb } from "pdf-lib"
import { readFileSync } from "fs"
import path from "path"

export async function generateCertificatPDF({
  nomUtilisateur,
  titreCours,
}: {
  nomUtilisateur: string
  titreCours: string
}) {
  // Chemin du template dans /certificates/template.pdf
  const templatePath = path.resolve("certificates", "template.pdf")
  const templateBytes = readFileSync(templatePath)

  const pdfDoc = await PDFDocument.load(templateBytes)
  const pages = pdfDoc.getPages()
  const firstPage = pages[0]

  const font = await pdfDoc.embedFont(StandardFonts.HelveticaBold)
  const { height } = firstPage.getSize()

  firstPage.drawText(nomUtilisateur, {
    x: 200,
    y: height - 160,
    size: 18,
    font,
    color: rgb(0.2, 0.2, 0.2),
  })

  firstPage.drawText(titreCours, {
    x: 200,
    y: height - 200,
    size: 14,
    font,
    color: rgb(0.3, 0.3, 0.3),
  })

  firstPage.drawText(`Délivré le ${new Date().toLocaleDateString()}`, {
    x: 200,
    y: height - 240,
    size: 12,
    font,
    color: rgb(0.5, 0.5, 0.5),
  })

  firstPage.drawText("Signature : _________", {
    x: 200,
    y: height - 280,
    size: 12,
    font,
    color: rgb(0.1, 0.1, 0.1),
  })

  const pdfBytes = await pdfDoc.save()
  return pdfBytes
}
