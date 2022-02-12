/* 获取结果，并拼接成字符串 */

function getResults(regexp, str) {
  let results = [];
  let result;
  while (result = regexp.exec(str)) {
    results.push(result);
  }
  return results;
}


function spliceResults(arr, textOrigin) {
  let text = textOrigin;
  for (let i = arr.length - 1; i >= 0; i--) {
    let result = arr[i];
    let match = result[0];
    let prefix = text.substring(0, result.index);
    let suffix = text.substring(result.index + match.length);
    /*text = prefix
      + '<span class="info">'
      + match
      + '</span>'
      + suffix;*/
    text = `${prefix}<span class="info">${match}</span>${suffix}`;
  }
  return text;
}

// test
const regexp = /\b(\d+)\b/g;
const string = "2020./11./07";
const results = getResults(regexp, string);
const text = spliceResults(results, string);
console.log(text);
