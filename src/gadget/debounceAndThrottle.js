/** 简单实现节流和防抖 **/


/*
debounce（防抖）：事件持续触发，但只有在事件停止触发n秒后才会执行回调。
 */

/**
 * 借助于定时器实现防抖，但是这个版本在首次触发事件后并不会执行回调
 *
 * @param callback
 * @param delay
 * @returns {function(...[*]=): void}
 */
function debounce(callback, delay) {
  let timeout;

  return function (...args) {
    const ctx = this; // 防止this值被改变，实际上下面使用了箭头函数，这一步不再是必须的了
    if (timeout) {
      clearTimeout(timeout);
    }
    timeout = setTimeout(
      () => {
        callback.apply(ctx, args);
      },
      delay
    );
  }
}


/**
 * 与上面的相比，添加了一个immediate参数来标记在首次触发事件后是否立即执行一次回调。
 * immediate为true，则会在首次触发事件后立即执行一次回调。
 *
 * @param callback
 * @param delay
 * @param immediate
 * @returns {function(...[*]=): void}
 */
function debounce(callback, delay, immediate) {
  let timeout;

  return function (...args) {
    const ctx = this;
    if (timeout) {
      clearTimeout(timeout);
    }
    if (immediate) {
      const callNow = !timeout;

      timeout = setTimeout(
        () => {
          callback.apply(ctx, args);
        },
        delay
      );

      /*
      // or
      timeout = setTimeout(
        () => {
          timeout = null; // 写成这样也是可以的，但是这样的话回调的执行依赖于再触发一次事件
        },
        delay
      );
      */

      if (callNow) {
        callback.apply(ctx, args);
      }
    } else {
      timeout = setTimeout(
        () => {
          callback.apply(ctx, args);
        },
        delay
      );
    }
  }
}


/*
throttle（防抖）：当事件持续触发时，每n秒执行一次回调。
通常使用定时器或者时间戳来实现节流。
 */


/**
 * 使用定时器实现节流。
 * 与防抖类似，这里首次触发事件并不会立即执行回调。
 *
 * @param callback
 * @param delay
 * @returns {function(...[*]=): void}
 */
function throttle(callback, delay) {
  let timeout;

  return function (...args) {
    const ctx = this;
    if (!timeout) {
      timeout = setTimeout(
        () => {
          callback.apply(ctx, args);
          timeout = null;
        },
        delay
      );
    }
  }
}


/**
 * 使用时间戳实现的节流。
 * 在首次触发事件后会立即执行一次回调，但是在停止触发事件后并不会在执行一次回调。
 *
 * @param callback
 * @param delay
 * @returns {function(...[*]=)}
 */
function throttle(callback, delay) {
  let previous = 0;

  return function (...args) {
    const ctx = this;
    const now = +new Date();

    if (now - previous >= delay) {
      callback.apply(ctx, args);
      previous = now;
    }
  }
}


/**
 * 综合了上面两个版本的优点。
 * 在首次触发事件后会立即执行一次回调，在停止触发事件后还能在执行一次回调。
 *
 * @param callback
 * @param delay
 * @returns {function(...[*]=)}
 */
function throttle(callback, delay) {
  let ctx, timeout;
  let previous = 0;

  // 把定时器的回调写在了返回的函数体外，那么这里就不能使用箭头函数了
  // 如果使用箭头函数，this值将会绑定throttle函数被调用时的this，并且不可替换
  const later = function (...args) {
    callback.apply(ctx, args);
    timeout = null;
    previous = +new Date();
  }

  return function (...args) {
    ctx = this;

    let now = +new Date();
    let remaining = delay - (now - previous);
    if (remaining <= 0) {
      if (timeout) {
        clearTimeout(timeout);
        timeout = null;
      }

      callback.apply(ctx, args);
      previous = now;
    } else if (!timeout) {
      timeout = setTimeout(later, delay, ...args);
    }
  }
}


function throttle(callback, delay) {
  let timeout;
  let previous = 0;

  return function (...args) {
    const ctx = this;

    let now = +new Date();
    let remaining = delay - (now - previous);
    if (remaining <= 0) {
      if (timeout) {
        clearTimeout(timeout);
        timeout = null;
      }

      callback.apply(ctx, args);
      previous = now;
    } else if (!timeout) {
      timeout = setTimeout(
        () => { // 这里使用了箭头函数作为定时器的回调，那么其this值一定绑定到了添加了事件监听器的DOM对象上，下面的apply就不是必须的了
          callback.apply(ctx, args);
          timeout = null;
          previous = +new Date();
        },
        delay
      );
    }
  }
}

// 注：上面throttle的第二个版本并不完整，因为并没有设置可以取消首次触发事件立即执行或者取消最后一次触发事件还会执行一次回调的选项。
