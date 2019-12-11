const remote        = require('electron'),
      app           = remote.app,
      BrowserWindow = remote.BrowserWindow,
      fs            = require('fs'),
      mkdirp        = require('mkdirp'),
      ps = require('ps-node'),
      ejse          = require('ejs-electron');
let win;


mkdirp('datas', function(err) { 
  let paths = ['datas/profiles.txt', 'datas/tasks.txt', 'datas/profiles-tasks.txt', 'datas/task-status.txt', 
              'datas/categories.txt', 'datas/proxies.txt', 'datas/ocr.txt', 'datas/otp.txt', 'datas/ocr_output.txt']
    if(err){
      console.log(err)
    } else {
      
      for (i in paths){
        let path = paths[i]
        if (!fs.existsSync(path)) {
            let to_append;
            if (path == 'datas/categories.txt'){
              to_append = {
                'ACCESSORIES': [],
                'JACKETS': [],
                'NEW':  [],
                'PANTS': [],
                'SHIRTS': [],
                'SHORTS':  [],
                'TOPS/SWEATERS': [],
                'SKATE':  [],
                'SWEATSHIRTS': [],
                'T-SHIRTS': [],
                'PANTS': [],
                'HATS': [],
                'BAGS': [],
                'SHOES': [],
              }
                
            } else if (path == 'datas/ocr.txt'){

              to_append = {
                "view_screen": "True",
                "start_width": 0,
                "end_width": 300,
                "start_height": 0,
                "end_height": 300,
                "run_ocr": "False",
                "reload_time": 1,
                "pid": -1,
                "given_to_task": -1
              }

            } else if (path == 'datas/otp.txt' || path=='datas/ocr_output.txt'){

              to_append = ''

            } else {

              to_append = {}

            }

            to_append =  JSON.stringify(to_append);
            fs.appendFile(path, to_append, function (err) {
              if (err) throw err;
            });
            
        } else {
          if (path == 'datas/otp.txt' || path=='datas/ocr_output.txt'){
            continue;
          }
          fs.readFile(path, 'utf-8', function (err, data) {
              try {
                let parsed = JSON.parse(data);
              } catch(e) {
                console.log(path)
                let to_append;
                if (path == 'datas/categories.txt'){
                  to_append = {
                    'ACCESSORIES': [],
                    'JACKETS': [],
                    'NEW':  [],
                    'PANTS': [],
                    'SHIRTS': [],
                    'SHORTS':  [],
                    'TOPS/SWEATERS': [],
                    'SKATE':  [],
                    'SWEATSHIRTS': [],
                    'T-SHIRTS': [],
                    'PANTS': [],
                    'HATS': [],
                    'BAGS': [],
                    'SHOES': [],
                  }

                } else if(path == 'datas/task-status.txt'){
                  to_append = {'new': ''}
                  to_append =  JSON.stringify(to_append);

                }  else if (path == 'datas/ocr.txt'){

                  to_append = {
                    "view_screen": "True",
                    "start_width": 0,
                    "end_width": 300,
                    "start_height": 0,
                    "end_height": 300,
                    "run_ocr": "False",
                    "reload_time": 1,
                    "pid": -1,
                    "given_to_task": -1
                  }

                } else {
                  to_append = {}
                }

                to_append =  JSON.stringify(to_append);
                fs.writeFile( path, to_append, function (err) {
                  if (err) throw err;
                });
               
              }
            });
        }

       
      }
      
    }

    fs.writeFile('datas/running-tasks.txt', '{"KEYS": []}', function (err) {
      if (err) throw err;
    });

});


function createWindow () {
  // Create the browser window.
   win = new BrowserWindow({
    width: 1200,
    height: 750,
    frame: false,

    icon: 'public/img/logo.jpg',
    webPreferences: {
      nodeIntegration: true,
     
    },
  });
  //win.webContents.openDevTools();
  win.loadFile('views/index/home-placeholder.ejs') // test.js per le finestre con sessioni diversa
  //win.setMenuBarVisibility(false);

  win.setResizable(false);
  win.on('closed', () => {

    fs.readFile('datas/ocr.txt', 'utf-8', function (err, data) {
      ocr_settings = JSON.parse(data);
      if(ocr_settings['pid'] != -1){

        ps.kill( ocr_settings['pid'], function( err ) {
            if (err) {
                throw console.log('err1', err);
            }
            else {
                console.log( 'Process ocr has been killed!' );
            }
        });

        ocr_settings['pid'] = -1;
        fs.writeFile('datas/ocr.txt', JSON.stringify(ocr_settings), (err, data) => {
          if (err) console.log('err2', err);
        });
      }
    });

    app.quit();
  });

}

app.on('ready', createWindow);
app.on('window-all-closed', () => {
  if(process.platform !== 'darwin'){
    app.quit();
  }
});

