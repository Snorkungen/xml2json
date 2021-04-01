function boomBoom(xml: string) {
    let a: string[] = xml.split("");


    for (let i = 0; i < a.length; i++) {
        const c = a[i];
        const n = a[i + 1];

        if (c === ">" && n === "<") {
            a[i] += "\n";
        }
    }

    a = a.join("").split("\n");

    function indent(arr: string[]) {
        // console.dir(arr)

        return arr.map((val: string) => "\t" + val)
    }

    for (let i = 0; i < a.length; i++) {
        const c = a[i];
        if (!/\//.test(c)) {
            let closingTagIndex: number = null;
            for (let j = i + 1; j < a.length; j++) {
                if (a[j].replace(/^\t*/,"") === c.replace(/^\t*?\</gi, "</") && closingTagIndex === null) closingTagIndex = j;
            }
            let slice = a.slice(i +1, closingTagIndex);

            a.splice(i+1, slice.length, ...indent(slice));
        }
    }


    return a.join("\n");
}

function twerkTwerk(json: any) {
    const createXMLTag = (tagName: string, content: string) => `<${tagName}>${content}</${tagName}>`
    let result = "";
    for (const key in json) {
        const curr = json[key];

        if (curr instanceof Object) {
            if (Array.isArray(curr)) {
                // If array
                result += curr.map((val: any) => {
                    if (val instanceof Object) {
                        return createXMLTag(key, twerkTwerk(val));
                    }

                    return createXMLTag(key, val)
                }).join("")
                // Lazyness don't work
            } else {
                // is an object
                result += createXMLTag(key, twerkTwerk(curr));
            }
        } else {
            // Is string or number or bolean

            result += createXMLTag(key, curr + "");
        }
    }

    return result;
}

function json2xml(json: any) {
    return boomBoom(twerkTwerk(json));
}


export default json2xml;

