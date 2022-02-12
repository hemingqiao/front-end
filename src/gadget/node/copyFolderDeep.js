const fs = require("fs");
const fsPromises = fs.promises;


/**
 * 使用node的fs模块实现对一个文件夹或文件的递归复制。
 *
 * @param srcPath 源路径
 * @param desPath 目标路径
 * @return {Promise<string>}
 */
async function copyFolderDeep(srcPath, desPath) {
  await copy(srcPath, desPath);
  return "all done";

  async function copy(srcPath, desPath) {
    let srcStat = await fsPromises.stat(srcPath);

    if (srcStat.isDirectory()) {
      let files = await fsPromises.readdir(srcPath);
      // 文件夹名
      let suffix = srcPath.split("/").pop();
      // 根据上一步得到的文件夹名创建新的文件夹
      await fsPromises.mkdir(desPath + "/" + suffix);
      // 遍历当前文件夹内的所有文件，进行复制
      for (let file of files) {
        let newPath = srcPath + "/" + file;
        let newDesPath = desPath + "/" + suffix;
        await copy(newPath, newDesPath);
      }
    } else {
      let str = await fsPromises.readFile(srcPath, "utf8");
      let name = srcPath.split("/").pop();
      await fsPromises.writeFile(desPath + "/" + name, str, "utf8");
    }
  }
}

async function copyFolderDeepMod(srcPath, desPath) {
  await copy(srcPath, desPath);
  return "all done";

  async function copy(srcPath, desPath) {
    let srcStat = await fsPromises.stat(srcPath);

    if (srcStat.isDirectory()) {
      let files = await fsPromises.readdir(srcPath);
      // 文件夹名
      let suffix = srcPath.split("/").pop();
      // 根据上一步得到的文件夹名创建新的文件夹
      await fsPromises.mkdir(desPath + "/" + suffix);
      // 遍历当前文件夹内的所有文件，进行复制，并行进行复制
      await Promise.all(files.map(file => {
        let newPath = srcPath + "/" + file;
        let newDesPath = desPath + "/" + suffix;
        return copy(newPath, newDesPath);
      }));
    } else {
      let str = await fsPromises.readFile(srcPath, "utf8");
      let name = srcPath.split("/").pop();
      await fsPromises.writeFile(desPath + "/" + name, str, "utf8");
    }
  }
}


// 递归复制的同步版本
function copyFolderDeepSync(srcPath, desPath) {
  copy(srcPath, desPath);

  function copy(srcPath, desPath) {
    let srcStat = fs.statSync(srcPath);

    if (srcStat.isDirectory()) {
      let files = fs.readdirSync(srcPath);
      let suffix = srcPath.split("/").pop();
      fs.mkdirSync(desPath + "/" + suffix);

      for (let file of files) {
        let newPath = srcPath + "/" + file;
        let newDesPath = desPath + "/" + suffix;
        copy(newPath, newDesPath);
      }
    } else {
      let data = fs.readFileSync(srcPath, "utf8");
      let name = srcPath.split("/").pop();
      fs.writeFileSync(desPath + "/" + name, data, "utf8");
    }
  }
}

let des = "C:/Users/32337/Desktop/foo";
let src = "D:/20_webstorm/ajsexercises/eloquentjs";
let src1 = "D:/20_webstorm/ajsexercises/eloquentjs/node";


/*
// async test
async function run(srcPath, desPath) {
  return await copyFolderDeepMod(srcPath, desPath);
}

run(src1, des).then(res => console.log(res)).catch(err => console.log(err));
*/


/*
// sync test
function runSync(srcPath, desPath) {
  copyFolderDeepSync(srcPath, desPath);
}

runSync(src, des);
*/

const path = require("path");

/**
 * Promise版本
 *
 * @param src
 * @param des
 * @return {Promise<string>}
 */
function copyFolderPromise(src, des) {
  return fsPromises.stat(src).then(stat => {
    let name = path.basename(src);
    let newName = path.join(des, name);

    if (stat.isFile()) {
      return fsPromises.readFile(src).then(data => {
        return fsPromises.writeFile(newName, data, "utf8");
      });
    } else if (stat.isDirectory()) {
      return fsPromises.mkdir(newName).then(() => {
        return fsPromises.readdir(src).then(files => {
          return Promise.all(files.map(file => {
            let newSrc = path.join(src, file)
            return copyFolderPromise(newSrc, newName);
          }));
        });
      });
    }
  }).then(() => "all done");
}

// copyFolderPromise("D:/20_webstorm/ajsexercises/eloquentjs/node", des).then(res => console.log(res));

