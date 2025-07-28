import { PDFDocument } from "pdf-lib";
import fs from 'fs';
import { fileURLToPath } from "url";
import { dirname, resolve } from "path";
import { argv } from "process";
import path from "path";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const pdfName = argv[2];

async function extractFields(pdfName) {

  const filePath = resolve(__dirname, `../pdfs/original/${pdfName}`);
  const fileBytes = fs.readFileSync(filePath);
  const pdfDoc = await PDFDocument.load(fileBytes);

  const form = pdfDoc.getForm();
  const fields = form.getFields();

  const fieldInfo = fields.map(field => ({
    name: field.getName(),
    type: field.constructor.name
  }));

  const strigifiedFieldInfo = JSON.stringify(fieldInfo, null, 2);
  const outputFileName = path.parse(filePath)['name'];

  const outputFilePath = resolve(__dirname, `../fieldmaps/${outputFileName}.json`);

  fs.writeFileSync(outputFilePath, strigifiedFieldInfo);
  console.log(`Saved ${fields.length} fields to fieldmaps/${outputFileName}.json`)
}

async function main() {

  if (argv.includes('--all')) {
    // write batch here. 
    const pdfNames = fs.readdirSync(resolve(__dirname, '../pdfs/original')).filter(f => f.endsWith('.pdf'));
    try {
      for (let i = 0; i < pdfNames.length; i++) {
        await extractFields(pdfNames[i]);
      }
    }
    catch (err) {
      console.error(err)
      process.exit(1)
    }
    finally {
      process.exit(0);
    }
  }
  else if (!!pdfName) {
    try {
      await extractFields(pdfName);
    }
    catch (err) {
      console.error(err)
      process.exit(1)
    }
    finally {
      process.exit(0)
    }
  }

  else {
    console.error("Please provide a PDF filename.\nUsage: node extract/extract-fields.js <filename.pdf>");
    process.exit(0);
  };
}

main();