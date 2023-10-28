import fs from 'fs';
import { parse } from 'yaml';

const folderPath = './list';
const buildFolderPath = './build';

const yamlFileNames = fs.readdirSync(folderPath).filter((fileName) => fileName.endsWith('.yaml'));

if (!fs.existsSync(buildFolderPath)) {
  fs.mkdirSync(buildFolderPath);
}

for (const yamlFileName of yamlFileNames) {
  const yamlFileContent = fs.readFileSync(`${folderPath}/${yamlFileName}`, 'utf-8');
  const yamlObject = parse(yamlFileContent);
  const payload: string[] = yamlObject.payload;

  let outputString = '';
  for (const matchRule of payload) {
    outputString += `${matchRule}\n`;
  }

  const listFileName = yamlFileName.replace('.yaml', '.list');
  fs.writeFileSync(`${buildFolderPath}/${listFileName}`, outputString);
}
