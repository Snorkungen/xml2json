const xml2json = require("./src/index").default;
const json2xml = require("./json2xml/index").default;
const {readFileSync,writeFileSync} = require("fs");

const xml = readFileSync("./data.ll.xml","utf8")
writeFileSync("./data.gg.json",JSON.stringify(xml2json(xml)),"utf8")
writeFileSync("./data.ll.k.xml",json2xml(xml2json(xml)),"utf8")


