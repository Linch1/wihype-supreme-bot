window.addEventListener('load', start);
let electron = require('electron');
function start(){
	let win = electron.remote.getCurrentWindow();
	$('.menu .close').click( evt => {
		win.close();
	});

	$('.menu .minimize').click( evt => {
		console.log(win)
		win.minimize();
	});
}