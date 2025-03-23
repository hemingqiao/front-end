// const spawn = require('./spawn');  // note-1 导入封装好的 spawn
// const pathFn = require('path');
const vscode = require('vscode');
// const { parseCommand } = require('./command.js');
const execa = require('execa');

let _terminal
let _disposable
let _terminalCwd
const window = vscode.window
const extensionTerminalName = 'fuck-gerrit';

// note-2 设置好执行 git 命令时需要用到的参数，也可以单独分离出配置文件
// const args = {
//   user: {
//     name: 'name',
//     email: 'name@email.com',
//   },
//   // 需要 push 的目录，此处推送的是 webpack 默认的打包路径
//   baseDir: pathFn.resolve('./', 'dist'),
//   repo: {
//     url: 'git@github.com:username/username.github.io.git',
//     branch: 'master',
//   },
// };

function deployToGit(path,terminal) {

  push(path,terminal);

//   function git(command) {
//     const [file, ...args] = parseCommand(command);
//     // const parsed = handleArguments(file, args);
//     return spawn(file, args, {});
//   }

  // 提交并推送指定目录
  function push(path,terminal) {
    terminal = terminal || ensureTerminal(path);
    terminal.show(false);
    const branch = getGitBranch(path);
    terminal.sendText(`git push origin HEAD:refs/for/${branch}`, true);
  }
}

function ensureTerminal(cwd = 'gerrit') {
	if (_terminal === undefined) {
		_terminal = window.createTerminal(extensionTerminalName);
		_disposable = window.onDidCloseTerminal((e) => {
			if (e.name === extensionTerminalName) {
				_terminal = undefined;
				_disposable && _disposable.dispose();
				_disposable = undefined;
			}
		});
		_terminalCwd = undefined;
	}

	if (_terminalCwd !== cwd) {
		_terminal.sendText(`cd "${cwd}"`, true);
		_terminalCwd = cwd;
	}

	return _terminal;
}

function getGitBranch(path) {
    path = path.replace(/\/[^\/]+$/,'/');
    let res;
    try {
		res = execa.commandSync('git rev-parse --abbrev-ref HEAD', { cwd: path });
	} catch (error) {
        console.error(error)
        vscode.window.showInformationMessage(error);
    }
    return res.stdout;
}


module.exports = deployToGit;