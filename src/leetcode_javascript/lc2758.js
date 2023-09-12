/*
请你编写一个有关日期对象的方法，使得任何日期对象都可以调用 date.nextDay() 方法，然后返回调用日期对象的下一天，格式为 YYYY-MM-DD 。
 */

Date.prototype.nextDay = function() {
    const nextDay = new Date(this);
    nextDay.setDate(this.getDate() + 1);
    const y = nextDay.getFullYear(),
          m = nextDay.getMonth() + 1,
          d = nextDay.getDate();
    return `${y}-${String(m).padStart(2, "0")}-${d}`;
}

/**
 * const date = new Date("2014-06-20");
 * date.nextDay(); // "2014-06-21"
 */

/*
// or use Date.prototype.toISOString()
Date.prototype.nextDay = function() {
    const nextDay = new Date(this);
    nextDay.setDate(this.getDate() + 1);
    return nextDay.toISOString().slice(0, 10);
}
*/
