const {
  app,
  BrowserWindow
} = require("electron");
const url = require("url");
const path = require("path");
const {
  ipcMain
} = require("electron");

let win;

function createWindow() {
  win = new BrowserWindow({
    width: 160,
    height: 60
  });
  win.loadURL(
    url.format({
      pathname: path.join(__dirname, "index.html"),
      protocol: "file:",
      slashes: true
    })
  );
}

const {
  dialog
} = require("electron");
const fs = require("fs");

ipcMain.on("openFile", (event, arg) => {
  ipcMain.on("click-button", (event, arg) => {
    if (arg == "true") {
      dialog.showOpenDialog(function (fileNames) {
        if (fileNames == undefined) {
          console.log("没有选择文件");
        } else {
          var exec = require("child_process").exec;

          function Callback(err, stdout, stderr) {
            if (err) {
              console.log(`执行错误: ${err}`);
              return;
            } else {
              console.log(`${stdout}`);
            }
          }
          res = exec(app.getAppPath() + "/ncmdump " + fileNames[0], Callback);
        }
      });
    }
  });
});

app.on("ready", createWindow);