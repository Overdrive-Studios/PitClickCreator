// Pit Click desktop app (Mac and Windows). The app itself is app/index.html, the same page as the web version;
// this file gives it a proper window, menus, Save dialogs, and keeps the click running when the window is in the back.
const { app, BrowserWindow, Menu, dialog, ipcMain, shell, powerSaveBlocker, session } = require("electron");
const path = require("path");
const fs = require("fs");

// clicks must never wait for a tap before sounding, and timing must hold when another app is in front
app.commandLine.appendSwitch("autoplay-policy", "no-user-gesture-required");
app.commandLine.appendSwitch("disable-renderer-backgrounding");
app.commandLine.appendSwitch("disable-background-timer-throttling");

const REPO = "https://github.com/Overdrive-Studios/PitClickCreator";
let win = null;

if (!app.requestSingleInstanceLock()) app.quit();
app.on("second-instance", () => { if (win){ if (win.isMinimized()) win.restore(); win.focus(); } });

function createWindow(){
  win = new BrowserWindow({
    width: 1440, height: 920, minWidth: 900, minHeight: 600,
    title: "Pit Click", backgroundColor: "#18181A", show: false,
    webPreferences: {
      preload: path.join(__dirname, "preload.js"),
      contextIsolation: true, nodeIntegration: false, sandbox: true,
      backgroundThrottling: false, spellcheck: false
    }
  });
  win.once("ready-to-show", () => win.show());
  win.loadFile(path.join(__dirname, "app", "index.html"));

  // links open in the normal browser; dropping a file on the window never replaces the app
  win.webContents.setWindowOpenHandler(({ url }) => { if (/^https?:/i.test(url)) shell.openExternal(url); return { action: "deny" }; });
  win.webContents.on("will-navigate", (e, url) => { if (!url.startsWith("file:")) { e.preventDefault(); if (/^https?:/i.test(url)) shell.openExternal(url); } else if (!url.endsWith("index.html")) e.preventDefault(); });
  win.on("closed", () => { win = null; });
}

// Save dialog for every export (QLab zip, WAVs, MIDI, project files)
ipcMain.handle("save-file", async (_e, name, data) => {
  const safe = String(name || "Pit Click export").replace(/[\\/:*?"<>|]+/g, "-");
  const r = await dialog.showSaveDialog(win, { title: "Save", defaultPath: path.join(app.getPath("documents"), safe) });
  if (r.canceled || !r.filePath) return { saved: false };
  try {
    fs.writeFileSync(r.filePath, Buffer.from(data));
    shell.showItemInFolder(r.filePath);
    return { saved: true, name: path.basename(r.filePath) };
  } catch (err) { return { saved: false, error: err.message }; }
});

function buildMenu(){
  const mac = process.platform === "darwin";
  const run = js => () => { if (win) win.webContents.executeJavaScript(js).catch(() => {}); };
  const template = [
    ...(mac ? [{ role: "appMenu" }] : []),
    { label: "File", submenu: [
      { label: "Add Tracks…", accelerator: "CmdOrCtrl+O", click: run('document.getElementById("fileIn").click()') },
      { type: "separator" },
      mac ? { role: "close" } : { role: "quit" }
    ]},
    { role: "editMenu" },
    { label: "View", submenu: [
      { role: "resetZoom" }, { role: "zoomIn" }, { role: "zoomOut" }, { type: "separator" },
      { role: "togglefullscreen" }, { type: "separator" },
      { role: "reload", label: "Reload Pit Click" },
      { role: "toggleDevTools", visible: false }
    ]},
    { role: "windowMenu" },
    { role: "help", submenu: [
      { label: "Pit Click on GitHub", click: () => shell.openExternal(REPO) },
      { label: "Check for a newer version", click: () => shell.openExternal(REPO + "/releases/latest") }
    ]}
  ];
  Menu.setApplicationMenu(Menu.buildFromTemplate(template));
}

app.whenReady().then(() => {
  // stop macOS App Nap / Windows power saving from slowing the click while a show is running
  powerSaveBlocker.start("prevent-app-suspension");
  // the app works fully offline: refuse any network request the page might try
  session.defaultSession.webRequest.onBeforeRequest({ urls: ["http://*/*", "https://*/*"] }, (_d, cb) => cb({ cancel: true }));
  buildMenu();
  createWindow();
  app.on("activate", () => { if (!win) createWindow(); });
});
app.on("window-all-closed", () => { if (process.platform !== "darwin") app.quit(); });
