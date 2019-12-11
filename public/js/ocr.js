window.addEventListener('load', start);

function chenge_settgins_values(){
		$('#start-width').val(ocr_settings['start_width']);
		$('#end-width').val(ocr_settings['end_width']);
		$('#start-height').val(ocr_settings['start_height']);
		$('#end-height').val(ocr_settings['end_height']);
		$('#reload-time').val(ocr_settings['reload_time']);
}

function edit_content(){

	if(!ocr_settings){
		setTimeout(edit_content, 100);
	} else {
		chenge_settgins_values();
		setInterval(() => {
			let d = new Date();
			$('#screen-image').attr("src","../../datas/screen.png?"+d.getTime());		
		}, 500);
	}
}


function start(){
	setTimeout(edit_content, 1000);

	$('.ocr-menu').toggleClass('body-position-fixed');
	
	$('#start-width').change(evt => {
		let elem = $('#start-width');
		let elem_val = parseInt($('#start-width').val().trim());
		let camparison_value = parseInt(ocr_settings['end_width']);
		if (elem_val >= 0 && elem_val < camparison_value){
			ocr_settings['start_width'] = elem_val;
			edit_ocr_settings();
		} else {
			elem.val(ocr_settings['start_width']);
		}
	});

	$('#end-width').change(evt => {
		let elem = $('#end-width');
		let elem_val = parseInt($('#end-width').val().trim());
		let camparison_value = parseInt(ocr_settings['start_width']);
		if (elem_val > camparison_value){
			ocr_settings['end_width'] = elem_val;
			edit_ocr_settings();
		} else {
			elem.val(ocr_settings['end_width']);
		}
	});

	$('#start-height').change(evt => {
		let elem = $('#start-height');
		let elem_val = parseInt($('#start-height').val().trim());
		let camparison_value = parseInt(ocr_settings['end_height']);
		if (elem_val >= 0 && elem_val < camparison_value){
			ocr_settings['start_height'] = elem_val;
			edit_ocr_settings();
		} else {
			elem.val(ocr_settings['start_height']);
		}
	});

	$('#end-height').change(evt => {
		let elem = $('#end-height');
		let elem_val = parseInt($('#end-height').val().trim());
		let camparison_value = parseInt(ocr_settings['start_height']);
		if (elem_val > camparison_value){
			ocr_settings['end_height'] = elem_val;
			edit_ocr_settings();
		} else {
			elem.val(ocr_settings['end_height']);
		}
	});

	$('#reload-time').change(evt => {
		let elem = $('#reload-time');
		let elem_val = parseFloat($('#reload-time').val().trim());
		if (elem_val > 0){
			ocr_settings['reload_time'] = elem_val;
			edit_ocr_settings();
		} 
	});


	$('#run').click(() => {
		run_ocr();
	})

	$('#stop').click(() => {
		kill_ocr();
	})
}