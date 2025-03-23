// The module 'vscode' contains the VS Code extensibility API
// Import the module and reference it with the alias vscode in your code below
const vscode = require('vscode');
const deployer = require('./deployer');
const intgerrit = require('./intgerrit');
const opn = require('opn');

let funckingGerritBar = null;
let gerritLinkBar = null;
let gerritInitBar = null;

// this method is called when your extension is activated
// your extension is activated the very first time the command is executed

/**
 * @param {vscode.ExtensionContext} context
 */
function activate(context) {
	initStatusBar();
	// Use the console to output diagnostic information (console.log) and errors (console.error)
	// This line of code will only be executed once when your extension is activated
	console.log('Congratulations, your extension "fuck-gerrit" is now active!');

	// The command has been defined in the package.json file
	// Now provide the implementation of the command with  registerCommand
	// The commandId parameter must match the command field in package.json

	let pushg = vscode.commands.registerCommand('extension.gerritPush', () => {
		gerritPush(vscode.window.activeTextEditor.document.uri.fsPath,vscode.window.activeTerminal)
	})
	context.subscriptions.push(pushg);

	let linkg = vscode.commands.registerCommand('extension.gerritLink', () => {
		openGerritLink();
	})
	context.subscriptions.push(linkg);

	let initg = vscode.commands.registerCommand('extension.gerritInit', () => {
		initGerrit();
	})
	context.subscriptions.push(initg);
}

function gerritPush(path,terminal) {
	deployer(path,terminal);
}

function openGerritLink() {
	opn('http://gerrit.pajk-ent.com/q/status:open+-is:wip', {app: ['google chrome', '--incognito']});
}

function initGerrit() {
	intgerrit();
}

// 初始化状态栏
function initStatusBar() {
	registerBar(funckingGerritBar, { text:  "Gerrit push", command: 'extension.gerritPush'})
	registerBar(gerritLinkBar, { text:  "Gerrit link", command: 'extension.gerritLink'})
	registerBar(gerritInitBar, { text:  "Gerrit init", command: 'extension.gerritInit'})
  }

  function registerBar(bar,{ text, command }) {
	bar = vscode.window.createStatusBarItem(vscode.StatusBarAlignment.Left);
	bar.text = text
	bar.command = command
	bar.show();
  }

function deactivate() { }

exports.deactivate = deactivate;
exports.activate = activate;
