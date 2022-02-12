const fs = require("fs");
const fsPromises = fs.promises;


async function list(path) {
  return await getList(path);
}

/**
 * 给定一个文件夹，列出这个文件夹中所有文件的信息，以数组形式返回
 *
 * @param path 源文件路径
 * @return {Promise<[]>}
 */
async function getList(path) {
  let files = await fsPromises.readdir(path);
  let ret = await Promise.all(files.map(traversal));
  return ret.reduce((prev, next) => prev.concat(next), []);

  // 解包之后得到的是一个数组
  async function traversal(file) {
    let stat = await fsPromises.stat(path + "/" + file);

    if (stat.isDirectory()) {
      return getList(path + "/" + file);
    } else {
      return [{
        size: stat.size,
        name: file,
        path: path + "/" + file,
      }];
    }
  }
}


function listSync(path) {
  return getListSync(path);
}

// 同步版本
function getListSync(path) {
  let files = fs.readdirSync(path);
  return files.map(traversal).reduce((prev, next) => prev.concat(next), []);

  function traversal(file) {
    let stat = fs.statSync(path + "/" + file);

    if (stat.isDirectory()) {
      return getListSync(path + "/" + file);
    } else {
      return [{
        size: stat.size,
        name: file,
        path: path + "/" + file,
      }];
    }
  }
}

let path = "D:/20_webstorm/ajsexercises/eloquentjs";
let path1 = "D:/20_webstorm/ajsexercises/eloquentjs/node";

// list(path1).then(res => console.log(res)).catch(err => console.log(err));

// console.log(getListSync(path1));


// promise版本
function listPromise(path) {
  return fsPromises.readdir(path).then(files => {
    return Promise.all(files.map(file => {
      return fsPromises.stat(path + "/" + file).then(stat => {
        if (stat.isFile()) {
          return {
            size: stat.size,
            name: file,
            path: path + "/" + file,
          }
        } else {
          return listPromise(path + "/" + file);
        }
      });
    }));
  }).then(res => {
    return [].concat(...res);
  });
}

listPromise(path1 + "/file-server").then(res => console.log(res)).catch(err => console.log(err));
