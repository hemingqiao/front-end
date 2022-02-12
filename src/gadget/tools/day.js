/*! *****************************************************************************
@author Heming
founded at 2020-11-28 11:59:27
created by WebStorm
description:
***************************************************************************** */
/**
 * 求解某一天是星期几
 * @param {number} y 给定的年份
 * @param {number} m 给定的月份
 * @param {number} d 给定的某一天
 * @return {string}
 */
function weekDay(y, m, d) {
  const MONTHS = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];
  const DAY_OF_WEEK = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"];

  const isLeap = isLeapYear(y);
  if (isLeap) {
    MONTHS[1] = 29;
  }

  let days = 0;
  for (let i = 1; i < y; i++) {
    if (isLeapYear(i)) days += 366;
    else days += 365;
  }

  for (let j = 1; j < m; j++) {
    days += MONTHS[j - 1];
  }

  days += d - 1;
  //return days % 7 + 1;
  return DAY_OF_WEEK[days % 7];

  function isLeapYear(y) {
    return y % 4 === 0 && y % 100 !== 0 || y % 400 === 0;
  }
}

console.log(weekDay(2020, 12, 12));
