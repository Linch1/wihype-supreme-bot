
window.addEventListener('load', start);

var tasks_dict;
var profiles_tasks;
var categories;
var profiles;
var active_tasks;
var child;

function files_status_check(){
	fs.readFile('datas/profiles.txt', "utf8", function(err, data) {
		try {
			profiles = JSON.parse(data);
		} catch(e) {
			profiles = {};
			fs.writeFile('datas/profiles-tasks.txt', JSON.stringify(profiles_tasks), (err) => {
				if(err) throw  err;
			})
		}
	});

	fs.readFile('datas/tasks.txt', "utf8", function(err, data) {
		tasks_dict = JSON.parse(data);
		populate_tasks();
	});

	fs.readFile('datas/profiles-tasks.txt', "utf8", function(err, data) {
		try {
			profiles_tasks = JSON.parse(data);
		} catch(e) {
			profiles_tasks = {};

			for(key in tasks_dict){
				let task = tasks_dict[key]
				if (! (task['profiles'] in profiles_tasks)){
					profiles_tasks[task['profiles']] = []
				} 
				profiles_tasks[task['profiles']].push(parseInt(key));
			}
			fs.writeFile('datas/profiles-tasks.txt', JSON.stringify(profiles_tasks), (err) => {
				if(err) throw  err;
			})
		}
	});

	fs.readFile('datas/categories.txt', "utf8", function(err, categories_) {
		try {
			categories = JSON.parse(data);
		} catch(e) {

			categories = {
                'ACCESSORIES': [],
                'JACKETS': [],
                'NEW':  [],
                'PANTS': [],
                'SHIRTS': [],
                'SHORTS':  [],
                'TOPS/SWEATERS': [],
                'SKATE':  [],
                'SWEATSHIRTS': [],
                'T-SHIRTS': [],
                'PANTS': [],
                'HATS': [],
                'BAGS': [],
                'SHOES': [],
              }

			for (key in tasks_dict){
				for (item_category in tasks_dict[key]['categories']){
					categories[item_category].push(parseInt(key));
				}
			}

			fs.writeFile('datas/categories.txt', JSON.stringify(categories), (err) => {
				if(err) throw  err;
			})
		}
	});
}

function toggle_display_block(current){
	if (current.css('display') == 'none'){
		current.css('display', 'block');
	} else if(current.css('display') == 'block'){
		current.css('display', 'none');
	}
}

function populate_tasks(){
	let parent = $('.tasks-menu .tasks');
	parent.empty();
	for(key_ in tasks_dict){
		let key = key_;
		let div = $(`
		<div class="task" data-id="${key}">
			<div class="task-overview">
				<div class="id">
					<div class="action copy tooltip"><span class="tooltiptext bottom"> copy task </span><i class="far fa-clone"></i></div>
					<div class="action edit tooltip"><span class="tooltiptext bottom"> edit task </span><i class="fas fa-edit"></i></div>
					<div class="action remove tooltip"><span class="tooltiptext bottom"> delete task </span><i class="fas fa-trash"></i></div>
					<div class="id-value"></div>
				</div>
				<div class="type no-wrap">
					
				</div>
				<div class="profile no-wrap">
					
				</div>
				<div class="item no-wrap">
					
				</div>
				<div class="status no-wrap">
					Ready to run
				</div>
				<div class="actions">
					
					<div class="action captcha tooltip"><span class="tooltiptext bottom"> cpatcha test </span><i class="fas fa-robot"></i></div>
					<div class="action run tooltip"><span class="tooltiptext bottom"> run job </span><i class="fas fa-play"></i></div>
					<div class="action stop tooltip"><span class="tooltiptext bottom"> stop job </span><i class="fas fa-square"></i></div>
					<div class="action more tooltip"><span class="tooltiptext left"> view more </span><i class="fas fa-chevron-right"></i></div>
					
				</div>
			</div>
			<div class="task-more">
				
			</div>
		</div>	
		`)

		div.children('.task-overview').children('.id').children('.id-value').text(`${key}`);
		let type = div.children('.task-overview').children('.type');
		if(tasks_dict[key]['restock-checkbox'] == 'true'){
			type.text(`restock`);
		} else if( tasks_dict[key]['timer-auto-detect-checkbox']  == 'true' ){
			type.text(`detect drop`);
		}else if(tasks_dict[key]['timer-checkbox'] == 'true'){
			type.text(`timer`);
		}
		
		div.children('.task-overview').children('.profile').text(`${tasks_dict[key]['profiles']}`);
		div.children('.task-overview').children('.item').text(`${tasks_dict[key]['item-quantity']}`);
		parent.append(div);

		let task_more = $(div.children('.task-more'));
		let c = 0
		for (info in tasks_dict[key]){
			if (info.includes('item-') && info != 'item-quantity'){
				c += 1
				let item_info = $(`
					<div class="tooltip" data-id="${tasks_dict[key][info]['index']}">
						item-${parseInt(tasks_dict[key][info]['index']) + 1}
						<span class="tooltiptext bottom">
							<div class="name no-wrap">?item-found?</div>
							<div class="style no-wrap">?style?</div>
							<div class="size no-wrap">?size?</div>
							<div class="status no-wrap">?in cart?</div>
						</span>
					</div>
				`)
				item_info.children('.item-num').text(`item-${tasks_dict[key][info]['index']}`);
				item_info.children('.found').text(`<item found?>`);
				item_info.children('.style').text(`<style?>`);
				item_info.children('.size').text(`<size?>`);
				item_info.children('.status').text(`<in cart?>`);
				task_more.append(item_info);
			}
		}
		task_more.css('grid-template-columns', `repeat(${c}, 1fr)`)
	}
	if (Object.keys(tasks_dict).length == 0){
		let elem = $(`
			<div id="create-job" class="add-task button submit">
				<span>ADD A NEW JOB <i class="fas fa-plus"></i></span>
				<div class="background"></div>
			</div>`);

		parent.append(elem);
	}
}

function run_bot(settings, id, captcha=false){
	let task_id = id;
	let items = [];
	for (key in settings){
		if (key.includes('item') && key !='item-quantity'){
			items.push(settings[key]);
		}
	}
	let task_type="detect drop";
	let time = null;
	let date = null;
	if (settings['restock-checkbox'] == 'true'){
		task_type = 'restock';
	} else if (settings['timer-checkbox'] == 'true'){
		task_type = 'timer';
		time = settings['timer-time'];
		date = settings['timer-date'];
	} else if(settings['timer-auto-detect-checkbox'] == 'true'){
		task_type = 'detect drop';
	}

	let profile = settings['profiles'];
	let ocr = settings['ocr-checkbox'] === 'true' ? true : false;
	let proxy = settings['proxy-checkbox'] === 'true' ? true : null;
	let auto_checkout = settings['auto-checkbox'] === 'true' ? true : false;
	let checkout_delay = parseInt(settings['checkout-delay']);
	let random_if_not_aviable =settings['random-checkbox'] === 'true' ? true : false;

	if (proxy === true){
		proxy = aviable_proxies.get_proxy();
	}

	bot = new Bot(task_id, items, task_type=task_type, time=time, date=date, profile=profile, ocr=ocr, proxy=proxy, auto_checkout=auto_checkout,
    			random_if_not_aviable=random_if_not_aviable, checkout_delay=checkout_delay);
	
	active_tasks.add(bot);


	if (!(captcha.toString() + ' ' == 'false ')){
		bot.captcha();
	} else{
		bot.detect_when_start();
	}
	

}

function start(){
	
	active_tasks = new activeTasks();
	aviable_proxies = new Proxies();
	drop_detector = new Detector_drop();
	
	files_status_check();
	
	$('.tasks-menu').toggleClass('body-position-fixed');

	document.querySelector('body').addEventListener('click', (event) => {
		elem = event.target.parentElement;
		if (elem.classList.contains('action')){
			let task_div = elem.parentElement.parentElement.parentElement;
			let task_id = task_div.dataset.id;
				
			let current_profile = tasks_dict[task_id]['profiles'];

			if(elem.classList.contains('remove')){

				for (key in tasks_dict[task_id]['categories']){
					categories[key].remove(parseInt(task_id));
				}

				fs.writeFile('datas/categories.txt', JSON.stringify(categories), function (err) {
				  if (err) {console.log(err)} ;
				});
				$(task_div).css('left', '100%');
				
				setTimeout((task_div_=task_div) => {

					$(task_div).remove();
				}, 1000);

				let task_bot = active_tasks.get_bot(task_id);
				if(task_bot){
					if (! task_bot.bot_window){
						active_tasks.delete(task_id);
					}else if (task_bot.bot_window.isDestroyed()){
						active_tasks.delete(task_id);
					} else if (task_bot.bot_window.isMinimized()) {
						task_bot.quit();
					    active_tasks.delete(task_id);
					} else{
						task_bot.quit();
						active_tasks.delete(task_id);
					}
					
				}

				delete tasks_dict[task_id]
				let datas = JSON.stringify(tasks_dict);
				fs.writeFile('datas/tasks.txt', datas, function (err) {
				  if (err) {console.log(err)};
				}); 
				profiles_tasks[current_profile].remove(parseInt(task_id)); 
				fs.writeFile('datas/profiles-tasks.txt', JSON.stringify(profiles_tasks), function (err) {
				  if (err) {console.log(err)} ;
				}); 
			}

			if(elem.classList.contains('copy')){
				let new_id = 0;
				while (new_id in tasks_dict){
					new_id += 1;
				}
				
				for (key in tasks_dict[task_id]['categories']){
					categories[key].push(parseInt(new_id));
				}

				fs.writeFile('datas/categories.txt', JSON.stringify(categories), function (err) {
				  if (err) {console.log(err)} ;
				});

				
				tasks_dict[new_id] = Object.assign({}, tasks_dict[task_id]);
				tasks_dict[new_id]['ocr-checkbox'] = "false";
				let datas = JSON.stringify(tasks_dict);
				fs.writeFile('datas/tasks.txt', datas, function (err) {
				  if (err) {console.log(err)};
				}); 
				profiles_tasks[current_profile].push(new_id);
				fs.writeFile('datas/profiles-tasks.txt', JSON.stringify(profiles_tasks), function (err) {
				  if (err) {console.log(err)} ;
				}); 
				populate_tasks();

				
			} 
			
			if(elem.classList.contains('run')){
				let task_bot = active_tasks.get_bot(task_id);
				if(task_bot){
					if (! task_bot.bot_window){
						active_tasks.delete(task_id);
						run_bot(tasks_dict[task_id], task_id);
					}else if (task_bot.bot_window.isDestroyed()){
						
						active_tasks.delete(task_id);
						run_bot(tasks_dict[task_id], task_id);

					} else if (task_bot.bot_window.isMinimized()) {
					    task_bot.bot_window.restore()
					    task_bot.detect_when_start();
					} else{
						task_bot.detect_when_start();
					}
					
				} else {

					run_bot(tasks_dict[task_id], task_id);
				}
				
			}

			if(elem.classList.contains('captcha')){
				let task_bot = active_tasks.get_bot(task_id);
				if(task_bot){
					if (! task_bot.bot_window){
						active_tasks.delete(task_id);
						run_bot(tasks_dict[task_id], task_id, false, true);
					}else if (task_bot.bot_window.isDestroyed()){
						
						active_tasks.delete(task_id);
						run_bot(tasks_dict[task_id], task_id, false, true);
					} else if (task_bot.bot_window.isMinimized()) {
						task_bot.bot_window.minimize();
					    task_bot.bot_window.restore()
					    task_bot.captcha();
					} else{
						task_bot.captcha();
					}
					
				} else {
					run_bot(tasks_dict[task_id], task_id, true);
				}
			}

			if(elem.classList.contains('stop')){

				let task_bot = active_tasks.get_bot(task_id);
				if(task_bot){
					if (! task_bot.bot_window){
						active_tasks.delete(task_id);
					}else if (task_bot.bot_window.isDestroyed()){
						active_tasks.delete(task_id);
					} else if (task_bot.bot_window.isMinimized()) {
						task_bot.quit();
					    active_tasks.delete(task_id);
					} else{
						task_bot.quit();
						active_tasks.delete(task_id);
					}

					if(task_bot.task_type == 'detect drop'){
						drop_detector.remove(task_bot);
					}
				}	
			}

			if(elem.classList.contains('edit')){
				if ( Object.keys(active_tasks.store).length > 1){
					show_warning()
					return;
				}
				let edit = JSON.stringify({'edit': task_id})
				fs.writeFile('datas/task-status.txt', edit , function (err) {
				  if (err) {console.log(err)};
				}); 
				let task_bot = active_tasks.get_bot(task_id);
				if(task_bot){
					if (! task_bot.bot_window){
						active_tasks.delete(task_id);
					}else if (task_bot.bot_window.isDestroyed()){
						active_tasks.delete(task_id);
					} else if (task_bot.bot_window.isMinimized()) {
						task_bot.quit();
					    active_tasks.delete(task_id);
					} else{
						task_bot.quit();
						active_tasks.delete(task_id);
					}
					
				}

				go_to_file('tasks.ejs');
			}

			if(elem.classList.contains('more')){
				let jequery_elem = $(elem);
				let span = jequery_elem.children('span')
				let i_ = jequery_elem.children('i')
				let div_task = jequery_elem.parent().parent().parent()
				i_.toggleClass('rotate');
				span.toggleClass('left');
				span.toggleClass('none');
				div_task.toggleClass('visible')
					
				if (span.text().includes('more')){
					span.text('view less');
				} else {
					span.text('view more');
				}
			}

			
		}

		if(elem.classList.contains('add-task')){
			go_to_file('tasks.ejs');
		}
	});

	$('.buttons .normal-buttons .submit').click(target => {
		go_to_file('tasks.ejs');
	});

	$('.buttons .normal-buttons .edit').click(target => {
		
		$('.id .copy').css('display', 'none');
		$('.id .remove').css('display', 'none');

		let current = $('.id .edit');
		toggle_display_block(current);
	});

	$('.buttons .normal-buttons .copy').click(target => {

		$('.id .edit').css('display', 'none');
		$('.id .remove').css('display', 'none');

		let current = $('.id .copy');
		toggle_display_block(current);
	});

	$('.buttons .normal-buttons .delete').click(target => {

		$('.id .edit').css('display', 'none');
		$('.id .copy').css('display', 'none');

		let current = $('.id .remove');
		toggle_display_block(current);
	});

	$('.buttons .dangerous-buttons .stop-all').click(target => {
		let keys = Object.keys(tasks_dict);
		for (let i=0; i<keys.length; i++){
			let task_id = keys[i];
			let task_bot = active_tasks.get_bot(task_id);
			
			if(task_bot){
				if (! task_bot.bot_window){
					active_tasks.delete(task_id);
				}else if (task_bot.bot_window.isDestroyed()){
					active_tasks.delete(task_id);
				} else if (task_bot.bot_window.isMinimized()) {
					task_bot.quit();
				    active_tasks.delete(task_id);
				} else{
					task_bot.quit();
					active_tasks.delete(task_id);
				}

				if(task_bot.task_type == 'detect drop'){
					drop_detector.remove(task_bot);
				}
			}		
		}
		active_tasks.clear();
	});

	$('.buttons .dangerous-buttons .run-all').click(target => {
		let keys = Object.keys(tasks_dict);
		for (let i=0; i<keys.length; i++){
			let task_id = keys[i];
			let task_bot = active_tasks.get_bot(task_id);
			
			setTimeout(() => {
				if(task_bot){
					if (! task_bot.bot_window){
						active_tasks.delete(task_id);
						run_bot(tasks_dict[task_id], task_id);
					}else if (task_bot.bot_window.isDestroyed()){
						
						active_tasks.delete(task_id);
						run_bot(tasks_dict[task_id], task_id);

					} else if (task_bot.bot_window.isMinimized()) {
					    task_bot.bot_window.restore()
					    task_bot.detect_when_start();
					} else{
						task_bot.detect_when_start();
					}
					
				} else {
					run_bot(tasks_dict[task_id], task_id);
				}
			}, 250)
			
			
		}

	});

	$('.buttons .dangerous-buttons .captcha-all').click(target => {
		let keys = Object.keys(tasks_dict);
		for (let i=0; i<keys.length; i++){
			let task_id = keys[i];
			let task_bot = active_tasks.get_bot(task_id);
			
			if(task_bot){
				if (! task_bot.bot_window){
					active_tasks.delete(task_id);
					run_bot(tasks_dict[task_id], task_id, true);
				}else if (task_bot.bot_window.isDestroyed()){
					
					active_tasks.delete(task_id);
					run_bot(tasks_dict[task_id], task_id, true);
				} else if (task_bot.bot_window.isMinimized()) {
					task_bot.bot_window.minimize();
				    task_bot.bot_window.restore()
				    task_bot.captcha();
				} else{
					task_bot.captcha();
				}
				
			} else {
				run_bot(tasks_dict[task_id], task_id, true);
			}
			
		}

	});

	$('.buttons .dangerous-buttons .delete-all').click(target => {
		fs.writeFile('datas/tasks.txt', JSON.stringify({}) , function (err) {
		  	if (err) {console.log(err)};
		}); 

		for (task_id in tasks_dict){
			let task_bot = active_tasks.get_bot(task_id);
			if(task_bot){
				if (! task_bot.bot_window){
					active_tasks.delete(task_id);
				}else if (task_bot.bot_window.isDestroyed()){
					active_tasks.delete(task_id);
				} else if (task_bot.bot_window.isMinimized()) {
					task_bot.quit();
				    active_tasks.delete(task_id);
				} else{
					task_bot.quit();
					active_tasks.delete(task_id);
				}
				
			}
		}

		fs.writeFile('datas/profiles-tasks.txt', JSON.stringify({}), function (err) {
		  	if (err) {console.log(err)};
		}); 

		let to_append = {
                'ACCESSORIES': [],
                'JACKETS': [],
                'NEW':  [],
                'PANTS': [],
                'SHIRTS': [],
                'SHORTS':  [],
                'TOPS/SWEATERS': [],
                'SKATE':  [],
                'SWEATSHIRTS': [],
                'T-SHIRTS': [],
                'PANTS': [],
                'HATS': [],
                'BAGS': [],
                'SHOES': [],
              }
		fs.writeFile('datas/categories.txt', JSON.stringify(to_append), function (err) {
			if (err) throw err;
		});

		profiles_tasks = {};
		tasks_dict = {};
		populate_tasks();
	});


	$('.buttons .dangerous-buttons .copy-all').click(target => {


		for (key in tasks_dict){
			let new_id = 0;
			let current_profile = tasks_dict[key]['profiles'];
			while (new_id in tasks_dict){
				new_id += 1;
			}
			tasks_dict[new_id] = Object.assign({}, tasks_dict[key]);
			tasks_dict[new_id]['ocr-checkbox'] = "false";

			profiles_tasks[current_profile].push(new_id);
			for (key in tasks_dict[key]['categories']){
				categories[key].push(parseInt(new_id));
			}
		}

		let datas = JSON.stringify(tasks_dict);
		fs.writeFile('datas/tasks.txt', datas, function (err) {
		  	if (err) {console.log(err)};
		}); 
		fs.writeFile('datas/profiles-tasks.txt', JSON.stringify(profiles_tasks), function (err) {
		  	if (err) {console.log(err)};
		}); 
		fs.writeFile('datas/categories.txt', JSON.stringify(categories), function (err) {
		  	if (err) {console.log(err)} ;
		});
		populate_tasks();

		
	});
	
}