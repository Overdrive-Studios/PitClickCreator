// The only thing the page can ask the desktop app for: save a file through a normal Save dialog.
const { contextBridge, ipcRenderer } = require("electron");
contextBridge.exposeInMainWorld("pitDesktop", {
  saveFile: (name, data) => ipcRenderer.invoke("save-file", name, data),
  platform: process.platform
});
