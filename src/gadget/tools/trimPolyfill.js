/* 使用正则表达式模拟trim方法 */

/**
 * 第一种思路，匹配到开头和结尾的空白符，然后替换为空字符
 *
 * @param str
 * @returns {*}
 */
function trim(str) {
  return str.replace(/^\s+|\s+$/g, "");
}

const str1 = "  HelloWorld   ";
console.log(trim(str1)); // "HelloWorld"


/**
 * 第二种思路，匹配整个字符串，使用捕获组提取所需的数据
 *
 * @param str
 * @returns {*}
 * @constructor
 */
function Trim(str) {
  return str.replace(/^\s+(.*?)\s+$/g, "$1"); // 捕获组中使用了惰性匹配，否则.*会匹配到最后一个空格之前的所有空格
  // return str.replace(/^\s+(\w*)\s+$/, "$1");
}

console.log(Trim(str1)); // "HelloWorld"

/** 前者的效率高 **/


/* 将每个单词的首字母转换为大写 */

/**
 * 先找到每个单词的首字母，然后再将其转为大写（不使用非捕获组也可以）
 *
 * @param str
 * @returns {string}
 */
function titleize(str) {
  return str.toLowerCase().replace(/(?:^|\s)\w/g, match => match.toUpperCase());
}

const str2 = "my Name is heming";
console.log(titleize(str2)); // My Name Is Heming

/* 匹配成对标签 */

const regexp = /<([^>]+)>[\d\D]*<\/\1>/;
const tag1 = "<title>Hello World</title>";
const tag2 = "<p>paragraph</h>";
const tag3 = "<span>我</span>";

console.log(regexp.test(tag1)); // true
console.log(regexp.test(tag2)); // false
console.log(regexp.test(tag3)); // true
