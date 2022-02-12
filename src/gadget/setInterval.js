/** 使用setTimeout模拟setInterval **/

/**
 * 模拟实现setInterval
 *
 * @param cb 回调
 * @param delay
 * @param args
 */
function myInterval(cb, delay, ...args) {
  function inside(...vars) {
    cb(...vars);
    setTimeout(inside, delay, ...vars);
  }

  setTimeout(inside, delay, ...args);
}
