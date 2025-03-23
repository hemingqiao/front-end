const { spawn } = require('child_process')

function promiseSpawn(command, args, options) {
  if (!command) throw new TypeError('command is reuqired');

  if (!options && args && !Array.isArray(args)) {
    options = args;
    args = [];
  }
  console.log('spawn', command, args, options);
  // note-1 以上是对参数的容错处理

  args = args || [];
  options = options || {};

  // note-2 接下来将其封装成一个 Promise 对象
  return new Promise((resolve, reject) => {
    const task = spawn(command, args, options);
    // const encoding = options.hasOwnProperty('encoding') ? options.encoding : 'utf8';

    /*-- note-3 start --*/
    if (task.stdout) {
      task.stdout.pipe(process.stdout);
    }

    if (task.stderr) {
      task.stderr.pipe(process.stdout)
    }
    /* 
     这里调用子进程输出流(stdout/stderr)的 pipe 方法，
     将其输入到当前进程的输出流，这样就能在调用该脚本的
     进程中看到子进程中执行的命令的输入了

     如果你希望子进程的命令静默执行，这些代码同样不是必要的
     或者可以传入一个参数来决定是否在主进程中展示这些信息
    */
    /*-- note-3 end --*/

    // note-4 监听命令结束事件，根据 code 来决定是否 resolve
    task.on('close', code => {
      if (code) {
        const e = new Error('command execute failed');
        return reject(e);
      }

      resolve();
    });


    // note-5 命令执行错误时 reject
    task.on('error', reject)

    // note-6 处理 `exit` 事件
    if (!task.stderr && !task.stdout) {
      task.on('exit', code => {
        if (code) {
          const e = new Error('Spawn failed');
          return reject(e);
        }
      });
    }
  });
}

module.exports = promiseSpawn;