function myToString(arr) {
  if (!Array.isArray(arr)) return String(arr);
  let ret = "[";
  for (let i = 0; i < arr.length; i++) {
    ret += myToString(arr[i]);
    if (i !== arr.length - 1) ret += ", ";
  }
  return ret + "]";
}

let arr = [1, 2, [3, 4], [[5]]];
console.log(myToString(arr)); // [1, 2, [3, 4], [[5]]]
