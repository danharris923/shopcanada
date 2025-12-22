const fs = require("fs");
const fileContent = fs.readFileSync("src/lib/brands-data.ts", "utf-8");

const searchStr = "export const brands: Brand[] = [";
const brandsStart = fileContent.indexOf(searchStr);
const arrayStart = fileContent.indexOf("[", brandsStart);
console.log("arrayStart:", arrayStart);

let depth = 0;
let inString = false;
let brandsEnd = -1;

for (let i = arrayStart; i < fileContent.length; i++) {
  const c = fileContent[i];
  const prev = fileContent[i-1];

  if (c === "\"" && prev !== "\\") {
    inString = !inString;
  }

  if (!inString) {
    if (c === "[") depth++;
    if (c === "]") {
      depth--;
      if (depth === 0) {
        brandsEnd = i + 1;
        break;
      }
    }
  }
}

console.log("brandsEnd:", brandsEnd);
const brandsArrayStr = fileContent.slice(arrayStart, brandsEnd);
console.log("Array str length:", brandsArrayStr.length);

try {
  const arr = JSON.parse(brandsArrayStr);
  console.log("Parsed count:", arr.length);
  console.log("First brand:", arr[0]?.slug);
} catch(e) {
  console.log("Parse error:", e.message);
}
