window.addEventListener('load', start);


var menu_visibility;
var social_links_visibility;
var in_out;


function remove_visibility(elem, ms, visibility){
	if (elem.css('visibility') == 'hidden'){
		elem.css('visibility', 'visible');
	} else {
		setTimeout(elem => { 
			if (in_out == 'out'){
				elem.css('visibility', 'hidden'); 
			} else {
				elem.css('visibility', 'visible');
			}
		}, ms, elem);
	}
}


function remove_social_links(target) {
	
	li_elements = $(target.currentTarget).parent('.nav-elem').children('ul').children('li');
	for ( let i=0; i<li_elements.length; i++){
		elem = li_elements[i];
		setTimeout((elem) => {
			elem = $(elem)
			remove_visibility(elem, 1000)
			elem.toggleClass('position-fixed remove-elem');
			if (elem[0].classList.contains('remove-elem')){
				in_out = 'out'
			} else{
				in_out = 'in'
			}

		}, i*200, elem);
	}
};

function start(){


	$('.nav-elem div').click((target) => {remove_social_links(target)});

	$('.nav-menu-button').click((target) => {

		li_elements = $(target.currentTarget).parent('.navbar-container').children('.nav-elem');
		for ( let i=0; i<li_elements.length; i++){
			elem = li_elements[(li_elements.length - 1) - i ];
			setTimeout((elem) => {
				elem = $(elem);
				remove_visibility(elem, 1000);
				elem.toggleClass('shrink remove-elem');
				if (elem[0].classList.contains('remove-elem')){
					in_out = 'out'
				} else{
					in_out = 'in'
				}
				
			}, i*200, elem);
		}
	});

	$('#profiles-link').click( evt => {
		go_to_file('profiles.ejs');
	});

	$('#jobs-link').click( evt => {
		go_to_file('tasks-menu.ejs');
	});

	$('#proxys-link').click( evt => {
		go_to_file('proxy.ejs');
	});

	$('#ocr-link').click( evt => {
		go_to_file('ocr.ejs');
	});

	$('#wihype-link').click( evt => {
		go_to_file('home.ejs');
	});
}