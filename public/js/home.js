window.addEventListener('load', start);
let remote = require('electron').remote;
let main_window = remote.getCurrentWindow()

function start(){
	$('.welcome-container .welcome').toggleClass('remove-elem position-fixed');

	$('.welcome div.button').hover((terget) => {
		document.querySelector('.welcome div.button .background').classList.toggle('reposition');
	});

	$('.welcome div.button').click(() => {
		old_href = window.location.href;
		if (old_href.includes('home-')){
			new_href = old_href.replace('home-placeholder.ejs', 'tasks-menu.ejs');
		} else {
			new_href = old_href.replace('home.ejs', 'tasks-menu.ejs');
		}
		
		window.location.href = new_href;
	})
}
