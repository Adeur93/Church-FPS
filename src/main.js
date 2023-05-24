const { app, BrowserWindow, Menu, globalShortcut, } = require("electron");
const url = require("url");
const path = require("path");


if (process.env.NODE_ENV !== "production") {
    require("electron-reload")(__dirname, {
        electron: path.join(__dirname, "../node_modules", ".bin", "electron")
    })
}


let MainWindow;
let VentanaProyector;


app.on("ready", () => {

    globalShortcut.register('F11', () => {
        if (VentanaProyector) {
            const isFullScreen = VentanaProyector.isFullScreen();
            VentanaProyector.setFullScreen(!isFullScreen);
        }
    });

    const MenuSuperior = Menu.buildFromTemplate(MenuPrincipal);
    Menu.setApplicationMenu(MenuSuperior);

    MainWindow = new BrowserWindow({ show:false });
    MainWindow.loadURL(url.format({
        pathname: path.join(__dirname, "views/index.html"),
        protocol: "file",
        slashes: true
    }));
    MainWindow.maximize();
    MainWindow.show();
    MainWindow.on("closed", () => { app.quit(); });

    VentanaProyector = new BrowserWindow({ frame: false });
    VentanaProyector.setMenu(null)
    VentanaProyector.loadURL(url.format({
        pathname: path.join(__dirname, "views/projection.html"),
        protocol: "file",
        slashes: true
    }));
    VentanaProyector.setAlwaysOnTop("true")
});


app.on("window-all-closed", () => { app.quit() });


function CrearVentanaAbout() {
    const VentanaAbout = new BrowserWindow({
        width: 500,
        height: 500,
        resizable: false,
        movable: false,
        maximizable: false,
        minimizable: false,
        parent: MainWindow,
        modal: true
    });
    VentanaAbout.setMenu(null);
    VentanaAbout.loadURL(url.format({
        pathname: path.join(__dirname, "views/about.html"),
        protocol: "file",
        slashes: true
    }));
    VentanaAbout.setAlwaysOnTop("true")
};


function CrearVentanaAjustes() {
    const VentanaAjustes = new BrowserWindow({
        width: 1280,
        height: 720,
        maximizable: false,
        minimizable: false,
        parent: MainWindow,
        modal: true
    });
    VentanaAjustes.setMenu(null);
    VentanaAjustes.loadURL(url.format({
        pathname: path.join(__dirname, "views/ajustes.html"),
        protocol: "file",
        slashes: true
    }));
    VentanaAjustes.setAlwaysOnTop("true")
};


const MenuPrincipal = [
    {
        label: "Archivo",
        submenu: [
            { label: "Abrir guión", accelerator: "CommandOrControl+O" },
            { label: "Guardar guión", accelerator: "CommandOrControl+S" },
            { label: "Guardar guión como...", accelerator: "CommandOrControl+Shift+S" },
            { type: "separator" },
            { label: "Cerrar app", accelerator: "CommandOrControl+Q", click() { app.quit(); } }
        ]
    },
    {
        label: "Edición",
        submenu: [
            { label: "Deshacer", accelerator: "CommandOrControl+Z" },
            { label: "Rehacer", accelerator: "CommandOrControl+Shift+Z" },
            { type: "separator" },
            { label: "Copiar", accelerator: "CommandOrControl+C" },
            { label: "Cortar", accelerator: "CommandOrControl+X" },
            { label: "Pegar", accelerator: "CommandOrControl+V" },
            { type: "separator" },
            { label: "Ajustes", click() { CrearVentanaAjustes(); } },
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
        label: "Proyección",
        submenu: [
            {
                label: "Pantalla completa", accelerator: "F11", click() {
                    if (VentanaProyector) {
                        const isFullScreen = VentanaProyector.isFullScreen();
                        VentanaProyector.setFullScreen(!isFullScreen);
                    } } },
        ]
    },
    {
        label: "Acerca de la app",
        click() { CrearVentanaAbout(); }
    },
];