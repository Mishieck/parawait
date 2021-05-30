const fs = require("fs");
const path = require("path");

const DIR = path.join(__dirname, "../lib/esm");
const IMPORT_REGEX =
  /import\s+?(?:(?:(?:[\$\w*\s{},]*)\s+from\s+?)|)(?:(?:["'`](.*?)["'`])|(?:["'`](.*?)["'`]))[\s]*?(?:;|$|)/g;

const modifyImportStatement = (importStatement, url) => importStatement.replace(url, addExtension);
const addExtension = (url) => `${url}.js`;

const getFileNames = (directoryPath) => {
  try {
    return fs.readdirSync(DIR);
  } catch (error) {
    console.log(`Failed to read directory ${directoryPath}`);
    return [];
  }
};

const getFileText = (filePath) => {
  try {
    return fs.readFileSync(filePath).toString();
  } catch (error) {
    console.error(`Failed to read file ${filePath}.`);
    return "";
  }
};

const writeFile = (filePath, text) => {
  try {
    fs.writeFileSync(filePath, text);
  } catch (error) {
    console.info(`Failed to write file ${filePath}.`);
  }
};

const fileNames = getFileNames(DIR);
const jsFileNames = fileNames.filter((fileName) => /\.js$/.test(fileName));

for (const name of jsFileNames) {
  const filePath = path.join(DIR, name);
  let text = getFileText(filePath);
  if (text === "") continue;
  text = text.replace(IMPORT_REGEX, modifyImportStatement);
  writeFile(filePath, text);
}
