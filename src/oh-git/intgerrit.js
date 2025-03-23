const vscode = require('vscode');
const fs = require('fs');
const execa = require('execa');

let _terminal
let _disposable
let _terminalCwd
const window = vscode.window
const extensionTerminalName = 'fuck-gerrit';

function initGerrit() {
    let path = vscode.window.activeTextEditor.document.uri.fsPath;
    path = path.replace(/\/[^\/]+$/,'/');
    const terminal = vscode.window.activeTerminal;
    const appRoot = findAppRoot(path)
    init(appRoot, terminal);
}

function init(path,terminal) {
    terminal = terminal || ensureTerminal(path);
    terminal.show(false);
    let user = getEmail(path);
    user = user.replace(/@.*/,'')
    const appName = path.match(/\/([^\/]+)\/$/)[1]
    terminal.sendText(`cd ${path}`, true);
    terminal.sendText(`git remote set-url origin ssh://${user}@gerrit.pajk-ent.com:29418/${appName}`, true);
    terminal.sendText(`mkdir -p .git/hooks`, true);
    terminal.sendText(`scp -p -P 29418 ${user}@gerrit.pajk-ent.com:hooks/commit-msg ./.git/hooks/`, true);
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

function findAppRoot(path) {
    try {
        fs.statSync(path + 'package.json');
        return path;
      } catch (err) {
        return findAppRoot(path.replace(/[^\/]+\/$/,''));
      }
}

function getEmail(path) {
    path = path.replace(/\/[^\/]+$/,'/');
    let res;
    try {
		res = execa.commandSync('git config user.email', { cwd: path });
	} catch (error) {
        console.error(error)
        vscode.window.showInformationMessage(error);
    }
    return res.stdout;
}


module.exports = initGerrit;