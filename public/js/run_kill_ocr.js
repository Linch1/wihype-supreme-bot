const fs = require('fs'),
	  spawn = require('child_process').spawn,
	  ps = require('ps-node'),
	  plat = process.platform;


var ocr_settings,
	ocr_process;

function edit_ocr_settings(){
	fs.writeFile('datas/ocr.txt', JSON.stringify(ocr_settings), (err, data) => {
		if (err) throw err;
	});
}

const exec = require('child_process').exec

function kill_ocr(){
	if(ocr_settings['pid'] != -1){
		if(ocr_process){
			ocr_process.kill()
		} else {
			ps.kill( ocr_settings['pid'], function( err ) {
			    if (err) {
			        console.log( err );
			    }
			    else {
			        console.log( 'Process ocr has been killed!' );
			    }
			});
		}
		ocr_settings['pid'] = -1;
		edit_ocr_settings();

	}
}

function run_ocr(){
	kill_ocr();
	if (ocr_settings['pid'] == -1){
		let program = plat == 'win32' ? 'wihype_ocr.exe' : (plat == 'darwin' ? '' : (plat == 'linux' ? 'linux' : ''))
		if (program != ''){
			if (plat == 'linux' || plat == 'win32'){
				ocr_process = spawn('python3', ['wihype_ocr.py']);
			} else if( plat == 'win32') {
				ocr_process = spawn('py', ['wihype_ocr.py']);
			} else {
				ocr_process = spawn(program);
			}
			
			ocr_settings['pid'] = ocr_process.pid;
			edit_ocr_settings()

			ocr_process.stdout.on('data', (data) => {
			  console.log(data.toString());
			});

			ocr_process.stderr.on('data', (data) => {
			  console.error(data.toString());
			});

			ocr_process.on('exit', (code) => {
			  console.log(`Child exited with code ${code}`);
			});

			return ocr_process.pid;
		}
	}
}

fs.readFile('datas/ocr.txt', 'utf-8', (err, data) => {
	if (err) throw err;
	ocr_settings = JSON.parse(data);
	kill_ocr();
});
