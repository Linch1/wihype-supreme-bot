window.addEventListener('load', start);

function show_warning(innerhtml){
	$('.alert-container .alert .alert-text').html(innerhtml);
	$('.alert-container .alert').toggleClass('inview');
}

function start(){
	$('.alert .alert-close').click(evt => {
		$('.alert-container .alert').toggleClass('inview');
	});
}