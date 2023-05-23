const { app, BrowserWindow } = require("electron");

let mainWindow

app.on("ready", () => {
    mainWindow = BrowserWindow
});