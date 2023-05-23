const { app, BrowserWindow, Menu } = require("electron");
const url = require("url");
const path = require("path");


if (process.env.NODE_ENV !== "production") {
    require("electron-reload")(__dirname, {
        electron: path.join(__dirname, "../node_modules", ".bin", "electron")
    })
}


let mainWindow
let VentanaAbout
let VentanaProyector


app.on("ready", () => {

    const menusuperior = Menu.buildFromTemplate(menuprincipal);
    Menu.setApplicationMenu(menusuperior);

    mainWindow = new BrowserWindow({ width: 1280, height:720 });
    mainWindow.loadURL(url.format({
        pathname: path.join(__dirname, "views/index.html"),
        protocol: "file",
        slashes: true
    }));

    VentanaProyector = new BrowserWindow();
    VentanaProyector.setMenu(null)
    VentanaProyector.loadURL(url.format({
        pathname: path.join(__dirname, "views/projection.html"),
        protocol: "file",
        slashes: true
    }));
    
    mainWindow.on("closed", () => { app.quit(); });

});


function CrearVentanaAbout() {
    VentanaAbout = new BrowserWindow({ width: 500, height: 500, });
    VentanaAbout.setMenu(null);
    VentanaAbout.loadURL(url.format({
        pathname: path.join(__dirname, "views/about.html"),
        protocol: "file",
        slashes: true
    }))
}


const menuprincipal = [
    {
        label: "Archivo",
        submenu: [
            { label: "Abrir guión", accelerator: "Ctrl+O" },
            { label: "Guardar guión", accelerator: "Ctrl+S" },
            { label: "Guardar guión como...", accelerator: "Ctrl+Shift+S" },
            { type: "separator" },
            { label: "Cerrar app", accelerator: "Ctrl+Q", click() { app.quit(); } }
        ]
    },
    {
        label: "Edición",
        submenu: [
            { label: "Deshacer", accelerator: "Ctrl+Z" },
            { label: "Rehacer", accelerator: "Ctrl+Shift+Z" },
            { type: "separator" },
            { label: "Copiar", accelerator: "Ctrl+C" },
            { label: "Cortar", accelerator: "Ctrl+X" },
            { label: "Pegar", accelerator: "Ctrl+V" },
        ]
    },
    {
        label: "Importar",
        submenu: [
            { label: "Cancioneros" },
            { label: "Versiones de la biblia" },
            { label: "Imágenes" },
            { label: "Videos" },
        ]
    },
    {
        label: "Acerca de la app",
        click() { CrearVentanaAbout(); }
    },
];