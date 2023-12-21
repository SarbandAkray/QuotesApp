const {
  app,
  BrowserWindow,
  ipcMain,
  Tray,
  Menu,
  Notification,
} = require("electron");
const path = require("path");
const url = require("url");
const EventEmitter = require("events");
const loadingEvents = new EventEmitter();
const axios = require("axios").default;
const Alert = require("electron-alert");

// Handle creating/removing shortcuts on Windows when installing/uninstalling.
if (require("electron-squirrel-startup")) {
  // eslint-disable-line global-require
  app.quit();
}

let mainWindow;
let notifications;
const createWindow = () => {
  // Create the browser window.
  mainWindow = new BrowserWindow({
    frame: false,
    icon: __dirname + "./logo.png",
    titleBarStyle: "hidden",
    width: 300,
    height: 300,
    webPreferences: {
      nodeIntegration: true,
      contextIsolation: false,
      enableRemoteModule: true,
    },
  });
  mainWindow.hide();
  mainWindow.loadURL(
    url.format({
      pathname: path.join(__dirname, "loading.html"),
      protocol: "file:",
      slashes: true,
    })
  );
  mainWindow.setResizable(false);
  setTimeout(() => {
    mainWindow.show();
  }, 3000);
};

// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
// Some APIs can only be used after this event occurs.
app.on("ready", () => {
  //create the window and loading
  createWindow();
  //do stuff while loading when done emit finished;
  let getversion = axios({
    method: "get",
    url: "http://quotes.sarband.online/getVersion",
    responseType: "json",
  }).then(function (response) {
    let data1 = response.data;
    let latestlVersion = data1.version;
    let appVersion = app.getVersion();
    if (appVersion == latestlVersion) {
      setTimeout(() => {
        loadingEvents.emit("finished");
      }, 3000);
    } else {
      pleaseUpdate();
    }
  });
  //handle errors
  getversion.catch((err) => {
    let alert = new Alert();

    let swalOptions = {
      title: "ERROR!!",
      text: "cant connect to our servers please check if you are connected to internet then open the app again",
      icon: "error",
    };

    let promise = alert.fireFrameless(swalOptions, null, true, false);
    promise.then((result) => {
      if (result.value) {
        // confirmed
        app.exit();
      }
    });
  });
  //after loading
  loadingEvents.on("finished", () => {
    mainWindow.loadURL(
      url.format({
        pathname: path.join(__dirname, "index.html"),
        protocol: "file:",
        slashes: true,
      })
    );
    mainWindow.setSize(900, 700, true);
    mainWindow.center();
    mainWindow.setResizable(true);
    mainWindow.setMinimumSize(900, 700);
    loadTheNotfication();
  });
});

// handle nav
ipcMain.handle("exit", () => {
  mainWindow.hide();
});
ipcMain.handle("mini", () => {
  mainWindow.minimize();
});
ipcMain.handle("max", () => {
  if (mainWindow.isMaximized()) {
    mainWindow.unmaximize();
  } else {
    mainWindow.maximize();
  }
});

//tray settting

let tray = null;
app.whenReady().then(() => {
  tray = new Tray(path.join(__dirname, "logo.png"));
  const contextMenu = Menu.buildFromTemplate([
    {
      label: "Open",
      click: function () {
        mainWindow.show();
      },
    },
    {
      label: "Quit",
      click: function () {
        app.quit();
      },
    },
  ]);
  tray.setToolTip("QUOTES BY SARBAND AKRAY");
  tray.setContextMenu(contextMenu);
  tray.on("double-click", () => {
    mainWindow.show();
  });
});

if (process.platform === "win32") {
  app.setAppUserModelId("Sarband");
}
// In this file you can include the rest of your app's specific main process
// code. You can also put them in separate files and import them here.

var AutoLaunch = require("auto-launch");
var autoLauncher = new AutoLaunch({
  name: "MyApp",
  isHidden: true,
});
// Checking if autoLaunch is enabled, if not then enabling it.
autoLauncher
  .isEnabled()
  .then(function (isEnabled) {
    if (isEnabled) return;
    autoLauncher.enable();
  })
  .catch(function (err) {
    throw err;
  });

//handle add to favourites
ipcMain.on("item:addFavQ", (e, item) => {
  var jsonData = JSON.stringify(item);
  var fs = require("fs");
  if (fs.existsSync("sample.json")) {
    const fileData = JSON.parse(fs.readFileSync("sample.json"));
    fileData.push(item);
    fs.writeFileSync("sample.json", JSON.stringify(fileData, null, 2));
  } else {
    fs.writeFileSync("sample.json", JSON.stringify([item], null, 2));
  }
});

// setting json file
var defualt = { name: "NotficationTime", value: "1h" };
var fs = require("fs");
if (!fs.existsSync("settings.json")) {
  fs.writeFileSync("settings.json", JSON.stringify([defualt], null, 2));
}

//sending the notifications
let mint15, mint30, hour1, hour2, hour3, hour6;
function loadTheNotfication() {
  clearInterval(mint15, mint30, hour1, hour2, hour3, hour6);
  var fs = require("fs");
  const fileData = JSON.parse(fs.readFileSync("settings.json"));
  const time = fileData[0].value;
  if (time == "OFF") {
    clearInterval(mint15, mint30, hour1, hour2, hour3, hour6);
  } else if (time == "15m") {
    mint15 = setInterval(() => {
      getNewQuote();
      setTimeout(() => {
        {
          let Q, A;
          Q = notifications.q;
          A = notifications.a;
          let notifiaction15 = new Notification({
            title: notifications.a,
            body: notifications.q,
            icon: path.join(__dirname, "logo.png"),
          });
          notifiaction15.addListener("click", () => {
            showNotification(Q, A);
          });
          notifiaction15.show();
        }
      }, 1000);
    }, 900000);
  } else if (time == "30m") {
    mint30 = setInterval(() => {
      getNewQuote();
      setTimeout(() => {
        {
          let Q, A;
          Q = notifications.q;
          A = notifications.a;
          let notifiaction15 = new Notification({
            title: notifications.a,
            body: notifications.q,
            icon: path.join(__dirname, "logo.png"),
          });
          notifiaction15.addListener("click", () => {
            showNotification(Q, A);
          });
          notifiaction15.show();
        }
      }, 1000);
    }, 1.8e6);
  } else if (time == "1h") {
    hour1 = setInterval(() => {
      getNewQuote();
      setTimeout(() => {
        {
          let Q, A;
          Q = notifications.q;
          A = notifications.a;
          let notifiaction15 = new Notification({
            title: notifications.a,
            body: notifications.q,
            icon: path.join(__dirname, "logo.png"),
          });
          notifiaction15.addListener("click", () => {
            showNotification(Q, A);
          });
          notifiaction15.show();
        }
      }, 1000);
    }, 3.6e6);
  } else if (time == "2h") {
    hour2 = setInterval(() => {
      getNewQuote();
      setTimeout(() => {
        {
          let Q, A;
          Q = notifications.q;
          A = notifications.a;
          let notifiaction15 = new Notification({
            title: notifications.a,
            body: notifications.q,
            icon: path.join(__dirname, "logo.png"),
          });
          notifiaction15.addListener("click", () => {
            showNotification(Q, A);
          });
          notifiaction15.show();
        }
      }, 1000);
    }, 7.2e6);
  } else if (time == "3h") {
    hour3 = setInterval(() => {
      getNewQuote();
      setTimeout(() => {
        {
          let Q, A;
          Q = notifications.q;
          A = notifications.a;
          let notifiaction15 = new Notification({
            title: notifications.a,
            body: notifications.q,
            icon: path.join(__dirname, "logo.png"),
          });
          notifiaction15.addListener("click", () => {
            showNotification(Q, A);
          });
          notifiaction15.show();
        }
      }, 1000);
    }, 1.08e7);
  } else if (time == "6h") {
    hour6 = setInterval(() => {
      getNewQuote();
      setTimeout(() => {
        {
          let Q, A;
          Q = notifications.q;
          A = notifications.a;
          let notifiaction15 = new Notification({
            title: notifications.a,
            body: notifications.q,
            icon: path.join(__dirname, "logo.png"),
          });
          notifiaction15.addListener("click", () => {
            showNotification(Q, A);
          });
          notifiaction15.show();
        }
      }, 1000);
    }, 2.16e7);
  }
}

//changed settings
ipcMain.handle("setSettingsNot", () => {
  loadTheNotfication();
});

//getting new quote and author
function getNewQuote() {
  axios({
    method: "get",
    url: "https://zenquotes.io/api/random",
    responseType: "json",
  }).then(function (response) {
    let data = response.data;
    notifications = data[0];
  });
}
// show the quote from notifications
function showNotification(Q, A) {
  NotWindow = new BrowserWindow({
    frame: false,
    icon: __dirname + "./logo.png",
    titleBarStyle: "hidden",
    width: 900,
    height: 500,
    webPreferences: {
      nodeIntegration: true,
      contextIsolation: false,
      enableRemoteModule: true,
    },
  });
  NotWindow.setResizable(false);
  NotWindow.loadURL(
    url.format({
      pathname: path.join(__dirname, "pages/showNotfications.html"),
      protocol: "file:",
      slashes: true,
    })
  ).then(() => {
    NotWindow.webContents.send("data", [Q, A]);
  });
}
// show notificaitons window nav
ipcMain.handle("exitNot", () => {
  NotWindow.close();
});

// update your app
function pleaseUpdate() {
  let alert = new Alert();

  let swalOptions = {
    title: "ERROR!!",
    text: "new update avialabe plese click ok to update the app",
    icon: "warning",
  };

  let promise = alert.fireFrameless(swalOptions, null, true, false);
  promise.then((result) => {
    if (result.value) {
      // confirmed
      const open = require("open");
      open("https://apis-quote.herokuapp.com/download.html");
      setTimeout(() => {
        app.exit();
      }, 2000);
    }
  });
}
