"use strict";
var __spreadArrays = (this && this.__spreadArrays) || function () {
    for (var s = 0, i = 0, il = arguments.length; i < il; i++) s += arguments[i].length;
    for (var r = Array(s), k = 0, i = 0; i < il; i++)
        for (var a = arguments[i], j = 0, jl = a.length; j < jl; j++, k++)
            r[k] = a[j];
    return r;
};
exports.__esModule = true;
function boomBoom(xml) {
    var a = xml.split("");
    for (var i = 0; i < a.length; i++) {
        var c = a[i];
        var n = a[i + 1];
        if (c === ">" && n === "<") {
            a[i] += "\n";
        }
    }
    a = a.join("").split("\n");
    function indent(arr) {
        // console.dir(arr)
        return arr.map(function (val) { return "\t" + val; });
    }
    for (var i = 0; i < a.length; i++) {
        var c = a[i];
        if (!/\//.test(c)) {
            var closingTagIndex = null;
            for (var j = i + 1; j < a.length; j++) {
                if (a[j].replace(/^\t*/, "") === c.replace(/^\t*?\</gi, "</") && closingTagIndex === null)
                    closingTagIndex = j;
            }
            var slice = a.slice(i + 1, closingTagIndex);
            a.splice.apply(a, __spreadArrays([i + 1, slice.length], indent(slice)));
        }
    }
    return a.join("\n");
}
function twerkTwerk(json) {
    var createXMLTag = function (tagName, content) { return "<" + tagName + ">" + content + "</" + tagName + ">"; };
    var result = "";
    var _loop_1 = function (key) {
        var curr = json[key];
        if (curr instanceof Object) {
            if (Array.isArray(curr)) {
                // If array
                result += curr.map(function (val) {
                    if (val instanceof Object) {
                        return createXMLTag(key, twerkTwerk(val));
                    }
                    return createXMLTag(key, val);
                }).join("");
                // Lazyness don't work
            }
            else {
                // is an object
                result += createXMLTag(key, twerkTwerk(curr));
            }
        }
        else {
            // Is string or number or bolean
            result += createXMLTag(key, curr + "");
        }
    };
    for (var key in json) {
        _loop_1(key);
    }
    return result;
}
function json2xml(json) {
    return boomBoom(twerkTwerk(json));
}
exports["default"] = json2xml;
