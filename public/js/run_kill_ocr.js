const fs = require('fs'),
	  spawn = require('child_process').spawn,
	  ps = require('ps-node'),
	  plat = process.platform,
	  {PythonShell} = require("python-shell");


var ocr_settings,
	ocr_process;

function edit_ocr_settings(){
	fs.writeFile('datas/ocr.txt', JSON.stringify(ocr_settings), (err, data) => {
		if (err) throw err;
	});
}

const exec = require('child_process').exec

async function kill_ocr(){
	if(ocr_settings['pid'] != -1){
		if(ocr_process){
			console.log('killing')
			await ocr_process.kill()
			console.log('killed')
		} else {
			await ps.kill( ocr_settings['pid'], function( err ) {
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

async function run_ocr(){
	await kill_ocr();
	console.log('running')
	if (ocr_settings['pid'] == -1){
		python_process = new PythonShell('wihype_ocr.py');
		ocr_process = python_process.childProcess;

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

fs.readFile('datas/ocr.txt', 'utf-8', (err, data) => {
	if (err) throw err;
	ocr_settings = JSON.parse(data);
	kill_ocr();
});
