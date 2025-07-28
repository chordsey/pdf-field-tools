# pdf-field-tools

A CLI tool to extract and rename form field names from PDFs.  
Built to automate internal workflows and streamline PDF form management.

## Usage 

1. Place PDF(s) into pdfs/original directory
2. Run the extraction command:

Extract fields from single PDF: 
```bash
node extract/extract-fields.js my-file.pdf
```
This will output a single JSON file to fieldmaps/my-file.json

Extract fields from all PDFs in pdfs/original:
```bash
node extract/extract-fields.js --all
```
This will output JSON files corresponding with the PDFs you place in pdfs/original.

## Setup 
```bash
git clone https://github.com/chordsey/pdf-field-tools.git
cd pdf-field-tools
yarn install
```

### Planned Features
- [ ] Rename PDF fields from a mapping
- [ ] '--all' flag to batch process all PDFs

Built by @chordsey
