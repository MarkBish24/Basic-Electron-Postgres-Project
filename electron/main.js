const { app, BrowserWindow, ipcMain } = require("electron");
const path = require("path");
const { Client } = require("pg");
require("dotenv").config();

// Creating the Window for the project
function createWindow() {
  const window = new BrowserWindow({
    width: 1000,
    height: 700,
    webPreferences: {
      nodeIntegration: false,
      contextIsolation: true,
      preload: path.join(__dirname, "preload.js"),
    },
  });

  const isDev = !app.isPackaged;

  if (isDev) {
    window.loadURL("http://localhost:5173");
  } else {
    window.loadFile(path.join(__dirname, "../dist/index.html"));
  }
}

app.whenReady().then(() => {
  createWindow();

  app.on("activate", () => {
    if (BrowserWindow.getAllWindows().length === 0) createWindow();
  });
});

// Postgres connection
const pgClient = new Client({
  user: process.env.PG_USER,
  host: process.env.PG_HOST,
  database: process.env.PG_DATABASE,
  password: process.env.PG_PASSWORD,
  port: 5432,
});

pgClient
  .connect()
  .then(() => console.log("Connected to PostgreSQL"))
  .catch((err) => console.error("Postgres connection error:", err));

ipcMain.handle("get-users", async () => {
  try {
    const res = await pgClient.query("SELECT * FROM users");
    console.log(res.rows);
    return res.rows;
  } catch (err) {
    console.error(err);
    return [];
  }
});
