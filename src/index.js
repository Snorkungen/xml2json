"use strict";
var __spreadArrays = (this && this.__spreadArrays) || function () {
    for (var s = 0, i = 0, il = arguments.length; i < il; i++) s += arguments[i].length;
    for (var r = Array(s), k = 0, i = 0; i < il; i++)
        for (var a = arguments[i], j = 0, jl = a.length; j < jl; j++, k++)
            r[k] = a[j];
    return r;
};
exports.__esModule = true;
function chopChop(string) {
    var chars = string.split(/\n\r?/).join("");
    var arr = [""];
    var index = 0;
    chars.split("").forEach(function (char, i) {
        if (!arr[index])
            arr[index] = "";
        arr[index] += char;
        if (/>/.test(char) || /</.test(chars[i + 1])) {
            index += 1;
        }
    });
    return arr.filter(function (val) { return /\S+/g.test(val); });
}
function bloopBloop(arr) {
    var data = {};
    function cleanTag(str) {
        return str.replace(/<|>|\s/gi, "");
    }
    for (var i = 0; i < arr.length; i++) {
        var curr = arr[i];
        // Test if a tag
        if (/\<+.+\>/g.test(curr)) {
            var _a = curr.replace(/\<|\>/g, "").split(/\s/).filter(function (v) { return v; }), tag = _a[0], attributes = _a.slice(1);
            curr = "<" + tag + ">";
            // if (attributes.length > 0) {
            //   attributes.forEach((value: string) => {
            //     let [key, val] = value.split("=");
            //     data[cleanTag(curr)] = {
            //       [key]: val
            //     }
            //   })
            // }
            if (arr[i + 2] == curr.replace(/^\</g, "</")) {
                if (data[cleanTag(curr)]) {
                    data[cleanTag(curr)] = Array.isArray(data[cleanTag(curr)]) ? __spreadArrays(data[cleanTag(curr)], [arr[i + 1]]) : [data[cleanTag(curr)], arr[i + 1]];
                }
                else {
                    data[cleanTag(curr)] = arr[i + 1];
                }
            }
            else {
                // find the closing tag
                var closingTagIndex = null;
                for (var j = i; j < arr.length; j++) {
                    if (arr[j] == curr.replace(/^\</g, "</"))
                        closingTagIndex = closingTagIndex === null ? j : closingTagIndex;
                }
                if (closingTagIndex !== null) {
                    var newArr = arr.slice(i + 1, closingTagIndex);
                    i = closingTagIndex;
                    var test = bloopBloop(newArr);
                    // console.log(newArr)
                    if (data[cleanTag(curr)]) {
                        data[cleanTag(curr)] = Array.isArray(data[cleanTag(curr)]) ? __spreadArrays(data[cleanTag(curr)], [test]) : [data[cleanTag(curr)], test];
                    }
                    else
                        data[cleanTag(curr)] = test;
                }
            }
        }
    }
    return data;
}
function xml2json(rawXML) {
    var choppedArr = chopChop(rawXML);
    return bloopBloop(choppedArr);
}
exports["default"] = xml2json;
