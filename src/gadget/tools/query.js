const string = "https://www.baidu.com/s?wd=%E9%95%BF%E6%B1%9F&rsv_spt=1&rsv_iqid=0xc568de04000c182b&issp=1&f=8&rsv_bp=1&rsv_idx=2&ie=utf-8&tn=baiduhome_pg&rsv_enter=1&rsv_dl=tb&rsv_sug3=24&rsv_sug2=0&rsv_btype=i&inputT=3787&rsv_sug4=7785&end";

/**
 * 实现一个函数，可以对url的query部分做拆解，返回一个key-value形式的对象
 *
 * @param string
 * @returns {{}}
 */
function getQueryObj(string) {
  const source = string.split("?")[1].split("#")[0].split("&");
  const res = {};
  source.forEach(value => {
    let temp = value.split("=");
    if (!temp[1]) {
      res[temp[0]] = "";
    } else {
      res[temp[0]] = temp[1];
    }
  });

  return res;
}

console.log(getQueryObj(string));
