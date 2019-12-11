var item_settings = `

	<div class="items-settings">	
		<div>
			<label for="category">CATEGORY</label>
			<select class="category" id="category">
				<option value="Jackets">Jackets</option>
				<option value="Shirts">Shirts</option>
				<option value="Tops/Sweaters">Tops/Sweaters</option>
				<option value="Sweatshirts">Sweatshirts</option>
				<option value="pants">Pants</option>
				<option value="shorts">Shorts</option>
				<option value="T-Shirts">T-Shirts</option>
				<option value="Hats">Hats</option>
				<option value="Bags">Bags</option>
				<option value="Accessories">Accessories</option>
				<option value="Skate">Skate</option>
				<option value="Shoes">Shoes</option>
			</select>
		</div>
		

		<div>
			<label for="keywords"> ITEM KEYWORDS</label>
			<input type="text" class="keywords" name="keywords" id="keywords" autocomplete="off" required placeholder="jacket, -camp, -polar, denim">
			
		</div>

		<div id="colors-div">
			<div>
				<label for="color">COLOR KEYWORDS</label>
				<input type="text" class="color" name="color" id="color" placeholder="red, -mixed, -camo, dark" autocomplete="off" required>
			</div>
			
			<select id="colors-select" class="colors-select">
				<option value="random"> random </option>
				<optgroup label="blue">
				<option value="blue"> blue </option>
				<option value="light blue"> light blue </option>
				<option value="bright blue"> bright blue </option>
				<option value="blue stripe"> blue stripe </option>
				<option value="marine blue"> marine blue </option>
				<option value="royal blue"> royal blue </option>
				<option value="mixed blue"> mixed blue </option>
				</optgroup>
				<optgroup label="yellow">
				<option value="yellow"> yellow </option>
				<option value="bright yellow"> bright yellow </option>
				<option value="pale yellow"> pale yellow </option>
				</optgroup>
				<optgroup label="red">
				<option value="red"> red </option>
				<option value="red stripe"> red stripe </option>
				<option value="red camo"> red camo </option>
				<option value="red tribal camo"> red tribal camo </option>
				<option value="red haida"> red haida </option>
				</optgroup>
				<optgroup label="pink">
				<option value="pink"> pink </option>
				<option value="heather light pink"> heather light pink </option>
				<option value="mixed pink"> mixed pink </option>
				</optgroup>
				<optgroup label="orange">
				<option value="orange"> orange </option>
				<option value="dark orange"> dark orange </option>
				<option value="orange stripe"> orange stripe </option>
				<option value="burnt orange"> burnt orange </option>
				<option value="dark orange monogram"> dark orange monogram </option>
				<option value="fluorescent orange"> fluorescent orange </option>
				</optgroup>
				<optgroup label="green">
				<option value="green"> green </option>
				<option value="light green"> light green </option>
				<option value="dark green"> dark green </option>
				<option value="bright green"> bright green </option>
				<option value="green camo"> green camo </option>
				<option value="work green"> work green </option>
				<option value="forest green"> forest green </option>
				</optgroup>
				<optgroup label="grey">
				<option value="grey"> grey </option>
				<option value="heather grey"> heather grey </option>
				<option value="ash grey"> ash grey </option>
				<option value="grey haida"> grey haida </option>
				<option value="mixed grey"> mixed grey </option>
				</optgroup>
				<optgroup label="black">
				<option value="black"> black </option>
				<option value="dusty black"> dusty black </option>
				<option value="black stripe"> black stripe </option>
				<option value="black tribal camo"> black tribal camo </option>
				<option value="black monogram"> black monogram </option>
				<option value="washed black"> washed black </option>
				<option value="stone black"> stone black </option>
				</optgroup>
				<optgroup label="white">
				<option value="white"> white </option>
				<option value="off white"> off white </option>
				<option value="white stripe"> white stripe </option>
				</optgroup>
				<optgroup label="brown">
				<option value="brown"> brown </option>
				<option value="light brown"> light brown </option>
				</optgroup>
				<optgroup label="purple">
				<option value="purple"> purple </option>
				<option value="dusty purple"> dusty purple </option>
				</optgroup>
				<optgroup label="neon">
				<option value="neon"> neon </option>
				</optgroup>
				<optgroup label="navy">
				<option value="navy"> navy </option>
				<option value="light navy"> light navy </option>
				<option value="navy monogram"> navy monogram </option>
				<option value="dark navy"> dark navy </option>
				</optgroup>
				<optgroup label="peach">
				<option value="peach"> peach </option>
				</optgroup>
				<optgroup label="tan">
				<option value="tan"> tan </option>
				<option value="tan stripe"> tan stripe </option>
				<option value="tangerine"> tangerine </option>
				<option value="tan tribal camo"> tan tribal camo </option>
				</optgroup>
				<optgroup label="gold">
				<option value="gold"> gold </option>
				<option value="dark gold"> dark gold </option>
				</optgroup>
				<optgroup label="olive">
				<option value="olive"> olive </option>
				<option value="dark olive"> dark olive </option>
				<option value="light olive"> light olive </option>
				<option value="stone olive"> stone olive </option>
				</optgroup>
				<optgroup label="cardinal">
				<option value="cardinal"> cardinal </option>
				</optgroup>
				<optgroup label="heather lime">
				<option value="heather lime"> heather lime </option>
				</optgroup>
				<optgroup label="dark">
				<option value="dark"> dark </option>
				<option value="dark royal"> dark royal </option>
				<option value="dark cyan"> dark cyan </option>
				<option value="dark mustard"> dark mustard </option>
				<option value="dark magenta"> dark magenta </option>
				<option value="dark aqua"> dark aqua </option>
				<option value="dark cranberry"> dark cranberry </option>
				</optgroup>
				<optgroup label="cyan">
				<option value="cyan"> cyan </option>
				</optgroup>
				<optgroup label="brick">
				<option value="brick"> brick </option>
				</optgroup>
				<optgroup label="heather">
				<option value="heather"> heather </option>
				</optgroup>
				<optgroup label="tribal">
				<option value="tribal"> tribal </option>
				</optgroup>
				<optgroup label="camo">
				<option value="camo"> camo </option>
				<option value="chocolate chip camo"> chocolate chip camo </option>
				<option value="woodland camo"> woodland camo </option>
				</optgroup>
				<optgroup label="plaid">
				<option value="plaid"> plaid </option>
				</optgroup>
				<optgroup label="silver">
				<option value="silver"> silver </option>
				</optgroup>
				<optgroup label="hickory stripe">
				<option value="hickory stripe"> hickory stripe </option>
				</optgroup>
				<optgroup label="royal">
				<option value="royal"> royal </option>
				<option value="dusty royal"> dusty royal </option>
				</optgroup>
				<optgroup label="plum">
				<option value="plum"> plum </option>
				</optgroup>
				<optgroup label="burgundy">
				<option value="burgundy"> burgundy </option>
				<option value="burgundy paisley"> burgundy paisley </option>
				</optgroup>
				<optgroup label="multicolor">
				<option value="multicolor"> multicolor </option>
				</optgroup>
				<optgroup label="sage">
				<option value="sage"> sage </option>
				</optgroup>
				<optgroup label="natural">
				<option value="natural"> natural </option>
				</optgroup>
				<optgroup label="rust">
				<option value="rust"> rust </option>
				</optgroup>
				<optgroup label="mauve">
				<option value="mauve"> mauve </option>
				</optgroup>
				<optgroup label="violet">
				<option value="violet"> violet </option>
				<option value="light violet"> light violet </option>
				</optgroup>
				<optgroup label="mustard">
				<option value="mustard"> mustard </option>
				</optgroup>
				<optgroup label="fuchsia">
				<option value="fuchsia"> fuchsia </option>
				</optgroup>
				<optgroup label="magenta">
				<option value="magenta"> magenta </option>
				<option value="dusty magenta"> dusty magenta </option>
				</optgroup>
				<optgroup label="light slate">
				<option value="light slate"> light slate </option>
				</optgroup>
				<optgroup label="sulfur">
				<option value="sulfur"> sulfur </option>
				</optgroup>
				<optgroup label="slate">
				<option value="slate"> slate </option>
				</optgroup>
				<optgroup label="rigid indigo">
				<option value="rigid indigo"> rigid indigo </option>
				</optgroup>
				<optgroup label="khaki">
				<option value="khaki"> khaki </option>
				</optgroup>
				<optgroup label="dusty rose">
				<option value="dusty rose"> dusty rose </option>
				</optgroup>
				<optgroup label="leopard">
				<option value="leopard"> leopard </option>
				</optgroup>
				<optgroup label="teal">
				<option value="teal"> teal </option>
				<option value="teal haida"> teal haida </option>
				</optgroup>
				<optgroup label="windowpane">
				<option value="windowpane"> windowpane </option>
				</optgroup>
				<optgroup label="stone washed indigo">
				<option value="stone washed indigo"> stone washed indigo </option>
				</optgroup>
				<optgroup label="moss">
				<option value="moss"> moss </option>
				</optgroup>
				<optgroup label="lime">
				<option value="lime"> lime </option>
				</optgroup>
				<optgroup label="denim">
				<option value="denim"> denim </option>
				</optgroup>
				<optgroup label="light pine">
				<option value="light pine"> light pine </option>
				</optgroup>
				<optgroup label="tiger stripe">
				<option value="tiger stripe"> tiger stripe </option>
				</optgroup>
			</select>
		</div>
		<div id="size-div">
			<label for="size">SIZE</label>
			<select id="size" class="size">
				<option value="any">Any</option>
				<optgroup label="standard sizes">
					<option value="Small">Small</option>
					<option value="Medium">Medium</option>
					<option value="Large">Large</option>
					<option value="XLarge">XLarge</option>
					<option value="N/A">One size</option>
				</optgroup>

				<optgroup label="Pants">
					<option value="30">30</option>
					<option value="32">32</option>
					<option value="34">34</option>
					<option value="36">36</option>
				</optgroup>

				<optgroup label="EU shoes">
					<option value="US 8 / UK 7">US 8 / UK 7</option>
					<option value="US 8.5 / UK 7.5">US 8.5 / UK 7.5</option>
					<option value="US 9 / UK 8">US 9 / UK 8</option>
					<option value="US 9.5 / UK 8.5">US 9.5 / UK 8.5</option>
					<option value="US 10 / UK 9">US 10 / UK 9</option>
					<option value="US 10.5 / UK 9.5">US 10.5 / UK 9.5</option>
					<option value="US 11 / UK 10">US 11 / UK 10</option>
					<option value="US 11.5 / UK 10.5">US 11.5 / UK 10.5</option>
					<option value="US 12 / UK 11">US 12 / UK 11</option>
					<option value="US 13 / UK 12">US 13 / UK 12</option>
				</optgroup>

				<optgroup label="US shoes">
					<option value="6">6</option>
					<option value="6.5">6.5</option>
					<option value="7">7</option>
					<option value="7.5">7.5</option>
					<option value="8">8</option>
					<option value="8.5">8.5</option>
					<option value="9">9</option>
					<option value="9.5">9.5</option>
					<option value="10">10</option>
					<option value="10.5">10.5</option>
					<option value="11">11</option>
					<option value="11.5">11.5</option>
					<option value="12">12</option>
					<option value="12.5">12.5</option>
					<option value="13">13</option>
				</optgroup>
			</select>
			
		</div>
	</div>

`;

window.addEventListener('load', start);

var tasks = new Object();
var TASK_TO_EDIT_ID = null;
var PREVIOUS_PROFILE_TASK_OWNER = null;
var CAROUSEL_X = 0;

function read_tasks(){
	fs.readFile('datas/tasks.txt', "utf8", function(err, data) {
		tasks = JSON.parse(data);
	});
}

function toggle_timer_inputs(){
	let input1 = $('#timer-time');
	let input2 = $('#timer-date');
	let checkbox_timer = $('#timer-checkbox'); 
	let checbox_detect_automatically = $('#timer-auto-detect'); 
	let checbox_restock = $('#restock');

	if (checkbox_timer.prop('checked')){
		input1.attr('disabled', false);
		input2.attr('disabled', false);
	} else {
		input1.attr('disabled', true);
		input2.attr('disabled', true);

		input1.css('color', 'white');
		input2.css('color', 'white');

		input1.val('');
	}

	if(!checkbox_timer.prop('checked') && !checbox_detect_automatically.prop('checked') && !checbox_restock.prop('checked')){
		checbox_detect_automatically.prop('checked', true);
	}
}

function replacer(key, value) {
  if (typeof value === "boolean"||typeof value === "number") {
    return String(value);
  }
  return value;
}

function reset(){
	$('#category').val('Jackets');
	$('#size').val('any');
	$('#keywords').val('');
	$('#color').val('');

	$('#profiles').val('default');
	$('#checkout-delay').val('');
	$('#timer-date').val('');
	$('#timer-time').val('');
	$('#item-quantity').val('1');

	$('#restock-checkbox').prop('checked', false);
	$('#timer-auto-detect-checkbox').prop('checked', false);
	$('#timer-checkbox').prop('checked', false);
	$('#ocr-checkbox').prop('checked', false);
	$('#proxy-checkbox').prop('checked', false);
	$('#auto-checkbox').prop('checked', false);
	$('#random-checkbox').prop('checked', false);

	add_settings_for_item();
}

function check_if_new_or_edit(){
	fs.readFile('datas/task-status.txt', "utf8", function(err, data) {
		let dict_ = JSON.parse(data);
		
		if('new' in dict_){
			return;
		} else if ('edit' in dict_){

			task_id = dict_['edit'];
			if(Object.keys(tasks).length == 0){
				setTimeout(check_if_new_or_edit, 100);
				return;
			}
			let current_task = tasks[task_id]
			TASK_TO_EDIT_ID = task_id;
			PREVIOUS_PROFILE_TASK_OWNER = current_task['profiles'];

			$('#item-quantity').val(current_task['item-quantity']);
			add_settings_for_item();
			let all_categories = $('.category');
			let all_keywords = $('.keywords');
			let all_colors = $('.color');
			let all_sizes = $('.size');
			for (key in current_task){
				let to_edit = $(`#${key}`);
				if (current_task[key] != '' && !key.includes('item')){
					if (key.includes('checkbox')){
						to_edit.prop('checked', current_task[key] == 'true');
					} else {
						to_edit.val(current_task[key]);
					}
				} else if(key.includes('item')){
					let item = current_task[key];
					let index = parseInt(item['index']);

					let current_category = all_categories[index];
					let current_keywords = all_keywords[index];
					let current_color = all_colors[index];
					let current_sizes = all_sizes[index];

					$(current_category).val(item['category']);
					$(current_keywords).val(item['keywords']);
					$(current_color).val(item['color']);
					$(current_sizes).val(item['size']);
				}
				
			}
		} 
		
		if ($('#timer-checkbox').prop('checked')){
			let input1 = $('#timer-time');
			let input2 = $('#timer-date');
			input1.attr('disabled', false);
			input2.attr('disabled', false);
		}

		
		let status = JSON.stringify({'new': ''});
		fs.writeFile('datas/task-status.txt', status, function (err) {
		  if (err) {console.log(err)};
		}); 
	});
}


function add_settings_for_item(){
	let container = $('#items-settings-container-inner')
	let quantity = 	$('#item-quantity').val() >= 9 ? 9: $('#item-quantity').val();
	if (quantity == ''){
		return [false, 0]
	}
	let removed = false;
	let removed_num = 0
	if (quantity > 1){
		$('.arrow').css('opacity', '1');
	} else {
		$('.arrow').css('opacity', '0');
	}
	let current_quantity = container.children().length;
	if( quantity > current_quantity){

		while (quantity > current_quantity ){
			current_quantity += 1;
			let elem_to_append = $(`${item_settings}`)
			elem_to_append.attr('data-id', quantity);
			childrens = elem_to_append.children()
			for ( let i=0; i<childrens.length; i++ ){
				child = $(childrens[i]);
				let label = child.children('label');
				if (label.length == 0){
					let label_parent = $(child.children('div')[0]);
					label = label_parent.children('label');
				}
				label.text( `${label.text()} - ${current_quantity}`)
			}
			container.append(elem_to_append);

		}
		
	} else if (quantity < current_quantity ){
		while(quantity < current_quantity){
			container.children('div:last-child').remove();
			removed_num += 1;
			current_quantity -= 1;
		}
		
		removed = true;
	}

	let quantity_ = container.children().length;
	if (removed){
		if (CAROUSEL_X > (quantity_ - 1)*100){
			CAROUSEL_X = (quantity_ - 1)*100
			container.css('left', `-${CAROUSEL_X}%`);
		}
		
	}
}

function start(){
	read_tasks();
	setTimeout(check_if_new_or_edit, 200)
	populate_profiles();
	$('.tasks-body').toggleClass('body-position-fixed');

	$('#timer-checkbox').change((target) => {
		let checbox_restock = $('#restock-checkbox');
		let checbox_detect_automatically  = $('#timer-auto-detect-checkbox');
		toggle_timer_inputs();
		checbox_detect_automatically.prop('checked', false);
		checbox_restock.prop('checked', false);

	});

	$('#timer-auto-detect-checkbox').change((target) => {
		let checkbox_timer = $('#timer-checkbox'); 
		let checbox_restock = $('#restock-checkbox');
		checkbox_timer.prop('checked', false);
		checbox_restock.prop('checked', false);
		toggle_timer_inputs();
	});

	$('#restock-checkbox').change((target) => {
		let checkbox_timer = $('#timer-checkbox'); 
		let checbox_detect_automatically = $('#timer-auto-detect-checkbox'); 
		checkbox_timer.prop('checked', false);
		checbox_detect_automatically.prop('checked', false);
		toggle_timer_inputs();
	});

	


	document.querySelector('body').addEventListener('click', function(target_) {
		let target = target_.path[0];

		if (target.classList.contains('colors-select')){
			let menu = $(target);
			let parent = $(menu.parent());
			
			let color_input = $(parent.children('div')).children('.color');

			let current_value = $(color_input).val();
			let selected = $(menu).val();
			
			let new_value =  current_value == '' ? `${selected}` : `${current_value}, ${selected}`
			$(color_input).val(new_value)
		}

		if (target.classList.contains('color')){
			$(target).css('color', 'white');
		}

		if (target.classList.contains('keywords')){
			$(target).css('color', 'white');
		}

	});

	
	$('#checkout-delay').click(target => {
		$(target.currentTarget).css('color', 'white');
	});

	$('#timer-date').click(target => {
		$(target.currentTarget).css('color', 'white');
	});

	$('#timer-time').click(target => {
		$(target.currentTarget).css('color', 'white');
	});

	$('#profiles').click(target => {
		$(target.currentTarget).css('color', 'white');
	});

	$('.button.submit').click((target) => {
		let values_dict = new Object();
		let incomplete = false;
		let total_items = $('.items-settings');
		let all_categories = $('.category');
		let all_keywords = $('.keywords');
		let all_colors = $('.color');
		let all_sizes = $('.size');
		let items_categories = {};

		for (let i=0; i < total_items.length; i++){
			let current_category = all_categories[i];
			let current_keywords = all_keywords[i];
			let current_color = all_colors[i];
			let current_sizes = all_sizes[i];

			let category_value = $(current_category).val().trim();
			let keywords_value = $(current_keywords).val().trim();
			let color_value = $(current_color).val().trim();
			let sizes_value = $(current_sizes).val().trim();
			items_categories[category_value.toUpperCase()] = '';
			values_dict[`item-${i}`] = {
				'index': i,
				'category': category_value,
				'color': color_value,
				'keywords': keywords_value,
				'size': sizes_value
			}

		}

		values_dict['item-quantity'] = $('#item-quantity').val().trim();
		values_dict['profiles'] = $('#profiles').val().trim();
		values_dict['checkout-delay'] = $('#checkout-delay').val().trim();
		values_dict['timer-date'] = $('#timer-date').val().trim();
		values_dict['timer-time'] = $('#timer-time').val().trim();

		values_dict['restock-checkbox'] = $('#restock-checkbox').prop('checked');
		values_dict['timer-auto-detect-checkbox'] = $('#timer-auto-detect-checkbox').prop('checked');
		values_dict['timer-checkbox'] = $('#timer-checkbox').prop('checked');

		values_dict['ocr-checkbox']= $('#ocr-checkbox').prop('checked');

		values_dict['proxy-checkbox']= $('#proxy-checkbox').prop('checked');
		values_dict['auto-checkbox']= $('#auto-checkbox').prop('checked');
		values_dict['random-checkbox']= $('#random-checkbox').prop('checked');

		for (key in values_dict){
			if(key.includes('item')){
				let index = values_dict[key]['index']
				let parent = total_items[index]
					
				if (values_dict[key]['color'] == ''){
					incomplete = true;
					let elem = $(parent).children('#colors-div').children('div').children('.color');
					elem.css('color', 'red');
					elem.val('FILL');
				}

				if (values_dict[key]['keywords'] == ''){
					incomplete = true;
					let elem = $(parent).children('div').children('.keywords');
					elem.css('color', 'red');
					elem.val('FILL');
				}
			}

			if ((values_dict[key] == '' || values_dict[key] == '00:00:00' || values_dict[key] == 'FILL'
				|| values_dict[key] == '000' || values_dict[key] == 'default') && !(key.includes('checkbox')) ){
				
				let elem = $(`#${key}`);

				if (key == 'checkout-delay'){
					incomplete = true;
					elem.css('color', 'red');
					elem.val('000');
				}

				if (key == 'profiles'){
					incomplete = true;
					elem.css('color', 'red');
				}
	
				if (values_dict['timer-checkbox'].toString() + ' ' == 'true '){
					
					incomplete = true;
					elem.css('color', 'red');
					if(['timer-date', 'timer-time'].includes(key)){
						if( key == 'timer-time'){
							elem.val('00:00:00');
						}
					}
					if(!/^([01]?[0-9]|2[0-3]):[0-5][0-9]:[0-5][0-9]$/.test(values_dict['timer-time'])){
						incomplete = true;
						let elem = $(`#timer-time`);
						elem.css('color', 'red');
						elem.val('00:00:00');
					}
				}
			}
			
		}
		
		if(!incomplete){

			fs.readFile('datas/profiles-tasks.txt', "utf8", function(err, data) {
				fs.readFile('datas/categories.txt', "utf8", function(err, categories_) {
					let categories = JSON.parse(categories_);
					let id = 0;

					if (!TASK_TO_EDIT_ID){
						while (id in tasks){
							id += 1;
						}
					} else {
						id = TASK_TO_EDIT_ID === parseInt(TASK_TO_EDIT_ID) ? TASK_TO_EDIT_ID: parseInt(TASK_TO_EDIT_ID);
						for (key in tasks[id]['categories']){
							categories[key].remove(id);
						}
					}

					if (values_dict['ocr-checkbox'] === true){
						if (ocr_settings['given_to_task'] == -1){
							ocr_settings['given_to_task'] = id
							edit_ocr_settings();
						} else {
							if (ocr_settings['given_to_task'] != id){
								show_warning(`<i class="fas fa-exclamation-triangle"></i> <br>
	                    		You can assign the ocr only to one JOB per time, it is already enabled in JOB_ID: ${ocr_settings['given_to_task']}`);
	                    		return;
							}
							
						}
					}

					tasks[id] = new Object();
					tasks[id] = values_dict;
					tasks[id]['categories'] = items_categories;

					let datas = JSON.stringify(tasks, replacer);
					fs.writeFile('datas/tasks.txt', datas, function (err) {
					  if (err) {console.log(err)} else {reset();} ;
					}); 

					profiles_tasks = JSON.parse(data);

					if (! (values_dict['profiles'] in profiles_tasks)){
						profiles_tasks[values_dict['profiles']] = []
					} 
					if (TASK_TO_EDIT_ID && PREVIOUS_PROFILE_TASK_OWNER != 'default'){
						profiles_tasks[PREVIOUS_PROFILE_TASK_OWNER].remove(id);
					}
					profiles_tasks[values_dict['profiles']].push(id);
					
					let datas_ = JSON.stringify(profiles_tasks);
					fs.writeFile('datas/profiles-tasks.txt', datas_, function (err) {
					  if (err) {console.log(err)} ;
					}); 

				
					
					for (key in items_categories){
						categories[key].push(id);
					}
					fs.writeFile('datas/categories.txt', JSON.stringify(categories), function (err) {
					  if (err) {console.log(err)} ;
					}); 

				});
			});
			

		}

	
	});

	$('#item-quantity').bind('keyup mouseup', function () {
		add_settings_for_item();
		
	});

	$('.arrow.right').click( target => {

		let current_quantity = container.children().length - 1;
		if (CAROUSEL_X + 100 <= current_quantity * 100){
			CAROUSEL_X += 100;
			container.css('left', `-${CAROUSEL_X}%`);
		}
		
	});

	$('.arrow.left').click( target => {
		if (CAROUSEL_X - 100 >= 0){
			CAROUSEL_X -= 100;
			container.css('left', `-${CAROUSEL_X}%`);
		} 
		
	});

	let container = $('#items-settings-container-inner')

	add_settings_for_item();
}