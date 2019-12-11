const remote = require('electron'),
      BrowserWindow = require('electron').remote.BrowserWindow;

window.addEventListener('load', start);

function sleep(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}


var windows_dict = new Object();
var windows_id = 0;

function createWindow (partition_) {
  // Create the browser window.
   win = new BrowserWindow({
    width: 1500,
    height: 900,
    icon: 'public/img/icona.png',
    webPreferences: {
      nodeIntegration: true,
      partition: partition_
    },
  })

  // and load the index.html of the app
  // win.setMenuBarVisibility(false)
  win.webContents.openDevTools();
  ses = win.webContents.session;
  ses.clearStorageData();
  win.loadURL('https://www.google.com')
  return win;
}


class Bot {

    constructor(proxy=null) {
        this.id = windows_id;
        this.partition = 'persist:' + windows_id.toString() ;
        this.bot_window = createWindow(this.partition);
        this.proxy = false;
        this.bot_window.webContents.session.setProxy({ proxyRules: 'https=193.124.183.25:8888'}, function(a, b) {
          if(a){
            console.log(a);
          }
          this.proxy = true;
        });

        windows_id += 1;
        this.partition = windows_dict[this.windows_id] = this;

        this.bot_window.on('closed', (id = this.windows_id) => {
    		    delete windows_dict[id];
    		});
    }

    // gmail login
    gmail_login() {
      
		this.bot_window.loadURL('https://accounts.google.com/signin');
		  setTimeout(() => {this.check_gmail_login()}, 1000)  
    }

    // chekc gmail login
    check_gmail_login(){
      console.log(this.proxy);
    	let currentURL = this.bot_window.webContents.getURL();
		if (!currentURL.includes('myaccount')){
			console.log(this.id, 'not logged in', currentURL);
			setTimeout(() => {this.check_gmail_login()}, 1000);
		} else {
			
			this.bot_window.loadURL('https://www.google.com/recaptcha/api2/demo');
		}
    }
}

function start(){
	$('#google').click(function() {
	  bot = new Bot();
	  bot.gmail_login();
	});
}