const fs = require("fs");
const path = require("path");

const directoryPath = path.join(__dirname); // Path to your directory
const outputFile = "all_code.txt"; // Output file name
const excludedDir = "node_modules";
const excludedFile = "package-lock.json";

// Function to read all files in a directory recursively
function readDirectory(directory) {
  let results = [];
  const list = fs.readdirSync(directory);
  list.forEach((file) => {
    file = path.join(directory, file);
    const stat = fs.statSync(file);
    if (stat && stat.isDirectory() && path.basename(file) !== excludedDir) {
      results = results.concat(readDirectory(file));
    } else if (stat && stat.isFile() && path.basename(file) !== excludedFile) {
      results.push(file);
    }
  });
  return results;
}

// Function to write all files content to output file
function writeToFile(files) {
  const stream = fs.createWriteStream(outputFile, { flags: "w" });
  files.forEach((file) => {
    const content = fs.readFileSync(file, "utf8");
    stream.write(`\n\n=== ${file} ===\n\n`);
    stream.write(content);
  });
  stream.end();
}

const allFiles = readDirectory(directoryPath);
writeToFile(allFiles);

console.log(`All code has been extracted to ${outputFile}`);
