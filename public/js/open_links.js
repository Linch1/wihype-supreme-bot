const open = require('open');
window.addEventListener('load', start);

function start(){
	
	$('.banner').click( evt => {
		console.log('clicked');
		let banner = $(evt.currentTarget);
		let link = banner.attr('data-link');
		console.log(link);
		// opens the url in the default browser 
		(async () => {
		    // Opens the url in the default browser
		    await open(link);
		})();
	});
}

