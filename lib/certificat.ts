import { PDFDocument, rgb } from "pdf-lib"
import { readFileSync } from "fs"
import path from "path"


export async function generateCertificatPDF({
  nomUtilisateur,
  titreCours,
  nomInstructeur,
}: {
  nomUtilisateur: string
  titreCours: string
  nomInstructeur: string
}) {
 const templatePath = path.resolve("certificates", "template.pdf")
  const templateBytes = readFileSync(templatePath)

  const pdfDoc = await PDFDocument.load(templateBytes)

  const pages = pdfDoc.getPages()
  const firstPage = pages[0]

  const { width, height } = firstPage.getSize()
  const helvetica = await pdfDoc.embedFont("Helvetica-Bold")

  firstPage.drawText(nomUtilisateur, {
    x: width / 2 - nomUtilisateur.length * 4.5,
    y: height - 300,
    size: 18,
    font : helvetica,
    color: rgb(0.2, 0.2, 0.2),
  })

  firstPage.drawText(titreCours, {
    x: width / 2 - titreCours.length * 4,
    y: height - 395,
    size: 14,
    font : helvetica,
    color: rgb(0.3, 0.3, 0.3),
  })

  firstPage.drawText(nomInstructeur, {
    x: 270,
    y: 85,
    size: 14,
    font : helvetica,
    color: rgb(0.2, 0.2, 0.2),
  })

  const date = new Date().toLocaleDateString()
  firstPage.drawText(date, {
    x: width - 150,
    y: 41,
    size: 12,
    font : helvetica,
    color: rgb(0.5, 0.5, 0.5),
  })

  const pdfBytes = await pdfDoc.save()
  return pdfBytes
}