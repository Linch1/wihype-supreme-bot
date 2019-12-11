window.addEventListener('load', start);

function start(){
	$('div.button').hover((terget) => {
		document.querySelector('div.button .background').classList.toggle('reposition');
	});

	$('div.button').click((target) => {
		elem = document.querySelector('.body');
		elem.classList.add('body-inview');
	})
}