function chopChop(string: string) {
  const chars = string.split(/\n\r?/).join("");
  let arr = [""];
  let index: number = 0;

  chars.split("").forEach((char: string, i: number) => {
    if (!arr[index]) arr[index] = "";

    arr[index] += char;
    if (/>/.test(char) || /</.test(chars[i + 1])) {
      index += 1;
    }

  })
  return arr.filter((val: string) => /\S+/g.test(val));
}

function bloopBloop(arr: string[]) {
  let data = {}

  function cleanTag(str: string) {
    return str.replace(/<|>|\s/gi, "")
  }

  for (let i = 0; i < arr.length; i++) {
    let curr = arr[i];


    // Test if a tag

    if (/\<+.+\>/g.test(curr)) {
      const [tag, ...attributes] = curr.replace(/\<|\>/g, "").split(/\s/).filter((v: string) => v);
      curr = `<${tag}>`;


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
          data[cleanTag(curr)] = Array.isArray(data[cleanTag(curr)]) ? [...data[cleanTag(curr)], arr[i + 1]] : [data[cleanTag(curr)], arr[i + 1]];
        } else {

          data[cleanTag(curr)] = arr[i + 1]
        }

      } else {
        // find the closing tag


        let closingTagIndex: number = null;
        for (let j = i; j < arr.length; j++) {
          if (arr[j] == curr.replace(/^\</g, "</")) closingTagIndex = closingTagIndex === null ? j : closingTagIndex;
        }

        if (closingTagIndex !== null) {
          let newArr = arr.slice(i + 1, closingTagIndex);
          i = closingTagIndex;
          let test = bloopBloop(newArr);

          
          
          // console.log(newArr)
          if (data[cleanTag(curr)]) {
            
            data[cleanTag(curr)] = Array.isArray(data[cleanTag(curr)]) ? [...data[cleanTag(curr)], test] : [data[cleanTag(curr)], test];
          } else data[cleanTag(curr)] = test;
        }
      }

    }

  }


  return data;
}

function xml2json(rawXML: string) {
  const choppedArr: string[] = chopChop(rawXML);

  return bloopBloop(choppedArr);
}

export default xml2json;