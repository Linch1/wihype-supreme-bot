const remote 		= require('electron'),
      BrowserWindow = require('electron').remote.BrowserWindow,
      fetch 		= require('node-fetch');


function createWindow (proxy) {
  // Create the browser window.
  let preferences = {};
  let key = active_tasks.get_proxy_key();
  preferences.nodeIntegration = true;
  preferences.partition = 'persist:' + key.toString();

  
  win = new BrowserWindow({
    width: 1000,
    height: 600,
    icon: 'public/img/icona.png',
    webPreferences: preferences,
  });
  // and load the index.html of the app
  win.setMenuBarVisibility(false);
  win.setResizable(true);
  ses = win.webContents.session;
  ses.clearStorageData();
  return win;
}


function create_array (value, quantity){

	var array = [];
	for (var i=0; i<quantity; i++){
		array.push(value);
	}
	return array;
}

class activeTasks {
	constructor () {
		fs.readFile('datas/running-tasks.txt', "utf8", (err, data) => {
			try {
				this.store = JSON.parse(data);
			} catch(e) {
				console.log('ERROR IN PARSING RUNNING TASKS: ', e)
				fs.writeFile('datas/running-tasks.txt', '{"KEYS": []}', function (err) {
					if (err) {console.log(err)} ;
				});
				this.store = {};
			}
			this.bots = {};
			if (Object.keys(this.store).length > 1){
				this.restore();
			}
		});
	}

	delete(id){
		delete this.store[id];
		delete this.bots[id];

		fs.writeFile('datas/running-tasks.txt', JSON.stringify(this.store), function (err) {
			if (err) {console.log(err)} ;
		});
	}

	add(bot){
		let id = bot.id
		this.store[id] = {
			'items': bot.items,
			'task_type': bot.task_type, 
			'time': bot.time, 
			'date': bot.date,
			'profile': bot.profile,
			'ocr': bot.ocr,
			'proxy': bot.proxy, 
			'auto_checkout': bot.auto_checkout,
	    	'random_if_not_aviable': bot.random_if_not_aviable, 
	    	'checkout_delay': bot.checkout_delay,
	    	'window_id': bot.bot_window.id,
		}

		this.bots[id] = bot;

		fs.writeFile('datas/running-tasks.txt', JSON.stringify(this.store), function (err) {
			if (err) {console.log(err)} ;
		});
	}

	get_bot(id){
		return this.bots[id];
	}

	add_key(key){
		this.store['KEYS'].push(key);
		fs.writeFile('datas/running-tasks.txt', JSON.stringify(this.store), function (err) {
			if (err) {console.log(err)} ;
		});
	}

	get_proxy_key(){
		let key = 0;
		if (!this.store['KEYS']){
			this.store['KEYS'] = [];
		}

		while (this.store['KEYS'].includes(key)){
			key += 1
		}
		this.add_key(key);
		return key;
	}

	restore(){
		let keys = Object.keys(this.store);
		for (let i=0; i<keys.length; i++){
			let key = keys[i];
			if( key == 'KEYS'){
				continue;
			}
			let params = this.store[key];
			if(BrowserWindow.fromId(params['window_id'])){
				
				let bot = new Bot( 
					key, params['items'], params['task_type'], params['time'], params['date'], 
					params['profile'], params['ocr'], params['proxy'], 
					params['auto_checkout'], params['random_if_not_aviable'], params['checkout_delay'],false, params['window_id']
				)	
				bot.can_run = true;
				this.bots[key] = bot;
			} else {
				
				this.delete(key)
			}
			
		}
	}

	clear(){
		this.bot = {};
		for (let key in this.store){
			if (key != 'KEYS'){
				delete this.store.key;
			}
		}
		fs.writeFile('datas/running-tasks.txt', JSON.stringify(this.store), function (err) {
			if (err) {console.log(err)} ;
		});
	}
}

class Proxies {
	constructor(){
		fs.readFile('datas/proxies.txt', "utf8", (err, data) => {
			try {
				this.proxies = JSON.parse(data);
			} catch(e) {
				fs.writeFile('datas/proxies.txt', '{}', function (err) {
					if (err) {console.log(err)} ;
				});
				this.proxies = {};
			}
			this.aviable_proxies = {};
			for (let id in this.proxies){
				if (this.proxies[id]['status'] == 'Works'){
					let url = this.proxies[id]['username'] == '' ? `${this.proxies[id]['ip']}:${this.proxies[id]['port']}` :
					`${this.proxies[id]['username']}:${this.proxies[id]['password']}@${this.proxies[id]['ip']}:${this.proxies[id]['port']}`
					this.aviable_proxies[id] = { url: url, used: false};
				}
			}
		});
	}

	get_proxy(){
		for ( let id in this.aviable_proxies){
			if (this.aviable_proxies[id].used === false){
				this.aviable_proxies[id].used = true;
				return this.aviable_proxies[id].url;
			}
		}

		return null;
	}
}

class Process {
	constructor(){
		this.process = {
			'captcha': false,
			'cop': false,
			'youtube': false
		}
	}

	start(proces){
		for(let key in this.process){
			if (key != proces){
				this.process[key] = false;
			} else {
				this.process[proces] = true;
			}
		}
	}

	status(proces){
		return this.process[proces];
	}
}


class Detector_drop {
	constructor(){
		this.bots = [];
		this.run = true;
		this.release_date;
		this.run_status = false;
		this.start_release_data;
		this.counter = 0;
		this.shop_dict;
	}

	add(bot){
		
		if(!this.bots.includes(bot)){
			this.bots.push(bot);
		}
	}

	remove(bot){
		if(this.bots.includes(bot)){
			this.bots.remove(bot);
		}

		if(this.bots.length == 0){
			this.reset();
		}
	}

	detect(){

		this.get_release_week();
		this.drop();
		return;

	}

	reset(){
		this.run = true;
		this.release_date = null;
		this.start_release_data == null;
	}

	drop(){
		if (! (this.run_status === false) && this.bots.length > 0){
			if (this.release_date && this.start_release_data){
				
    			if (this.start_release_data == this.release_date){
	    			setTimeout(() => {this.drop()}, 1000);
	    			return;
	    		}  else {
	    			let drop_time = new Date()
	    			this.hours = drop_time.getHours()
	    			this.minutes = drop_time.getMinutes()
	    			this.seconds = drop_time.getSeconds()
	    			this.run_bots();
	    			return;
	    		}
    		} else if (this.release_date && !this.start_release_data){
    				this.start_release_data = this.release_date;
    				setTimeout(() => {this.drop()}, 1000);
			} else {
				setTimeout(() => {this.drop()}, 1000);
			}
    	} else {
    		this.reset();
    	}
	}

	get_release_week(){
		
		fetch('https://www.supremenewyork.com/mobile_stock.json')
		.then((response) => {
		    return response.json();
		})
		.then((response) => {

			if (this.bots.length == 1){
				let bot = this.bots[0];
				if(bot.bot_window.isDestroyed()){
					this.remove(bot);
				}
			}

			if(this.bots.length > 0){
				console.log('UPDATING', this.bots.length)
				// GET RELEASE WEEK
				this.release_date =  response['release_week'];

				//this.counter += 1;
				//if (this.counter%5 == 0){
				//	this.release_date =  'FW14'
				//}
					

				// CREATE ITEMS SHOP DICT
				for(let general_separation in response) {
					if (response[general_separation].constructor == Object) {
					    
					    var shop = response[general_separation]
					    var shop_dict_local = new Object();
					    var shop_category;
					    var local_category;
					    for (shop_category in shop){
					    	local_category = shop_category.toUpperCase();
					    	shop_dict_local[local_category] = new Object();
					    	if (shop[shop_category].constructor == Array){
					    		var item_index;
					    		var item;
					    		for (item_index = 0; item_index < shop[shop_category].length; item_index ++){
					    			item = shop[shop_category][item_index];
					    			shop_dict_local[local_category][item['name'].trim().toUpperCase()] = {'id': item['id']};
					    		}
					    		
					    	}
					    }
					}
				}
				this.shop_dict = shop_dict_local;
				setTimeout( () => {this.get_release_week();}, 1000);
			}
		});
    }

    run_bots(){
    	for (let i=0; i<this.bots.length; i++){
			let bot = this.bots[i];
			if (!bot.bot_window.isDestroyed() && bot.task_type == 'detect drop'){
				bot.update_status(`Detected Drop:  ${this.hours}:${this.minutes}:${this.seconds}`, 'green');
				bot.run();
			}
		}

		this.reset();
    }

	start(){
		if(this.run === true){
			this.run = false;
			this.run_status = true;
			this.detect();
		}
	}

	stop(){

		if (this.bots.length == 0){
			this.run_status = false;
		}

		let run = false;

		for (let i=0; i<this.bots.length; i++){
			if(!this.bots[i].bot_window.isDestroyed()){
				run = true;
			}
		}

		if(!run){
			this.run_status = false;
		}
	}

	force_stop(){
		this.run_status = false;
		this.bots = [];
	}
}


class Bot {
    constructor(task_id, items, task_type="detect drop", time=null, date=null, profile=null, ocr=false, proxy=null, auto_checkout=true,
    			random_if_not_aviable=false, checkout_delay=500, hu=false, window_id=null) {
        this.id = task_id;
        this.items = items;
        
        this.items_found = {};

        
        let main = remote.remote.getCurrentWindow();
		

        this.shop_dict = null;
        this.items_requests = create_array(false, items.length);
        this.scripts = [];
        this.checkout_time = checkout_delay;

        this.ocr = ocr;

        this.task_type = task_type;
        this.time = time;
        this.date = date;
        this.profile = profile;
        this.auto_checkout = auto_checkout;
        this.random_if_not_aviable = random_if_not_aviable;
        this.release_date = null;
        this.counter = 0;
        this.start_release_data = null;
        this.profile_datas;
        this.process = new Process();
        this.can_run = null;

        this.status_span = $(`.task[data-id="${this.id}"] .task-overview .status`);
        this.task_more_div = $(`.task[data-id="${this.id}"] .task-more`);
        this.updates_info = [];
        
        if (!profile || profile=="default"){
        	return;
        }
        if (window_id){
        	this.bot_window = BrowserWindow.fromId(window_id);

        	this.bot_window.on('closed', () => {
				this.update_status('Ready to run');
				drop_detector.remove(this);
				active_tasks.delete(this.id);

				if(this.ocr === true){
					kill_ocr();
				}
			});

        	this.url = this.bot_window.webContents.getURL()
        	
        	if(this.url.includes('captcha')){
        		this.process.start('captcha');
        		this.update_status('Captcha');
        	}
        } else {
        	this.bot_window = createWindow(proxy);

        	this.bot_window.on('closed', () => {
				this.update_status('Ready to run');
				drop_detector.remove(this);
				active_tasks.delete(this.id);
				
				if(this.ocr === true){
					kill_ocr();
				}
			});
        	if (proxy){
     			console.log(proxy)
	        	this.bot_window.webContents.session.setProxy({ 
	        		proxyRules: `socks5://${proxy}`
	        	})
	        	.then((response) => {
	        		console.log(response)
	        		this.bot_window.loadURL('https://www.google.com');
	        		this.update_status(`Setting proxy: ${proxy}`, '#cb793a');

	        		this.bot_window.webContents.executeJavaScript('window.location.href')
	        		.then((response) => { 
	        			
	        			if(!response.includes('https://www.google.com')){
	        				this.update_status(`ERR 01 PROXY: ${proxy} not working`, 'red');
	        			} else {
	        				this.can_run = true;
	        			}

	        		})
	        		.catch((response) => { this.update_status(`ERR 1 PROXY: ${proxy} not working`, 'red'); })
	        		        		
	        	})
	        	.catch((response) => {
	        		this.update_status(`ERR 02 PROXY: ${proxy} not working`, 'red');
	        	})

	        } else {
	        	this.can_run = true;
	        }
        }
        
        

    }

    captcha(){
    	// update
    	this.process.start('captcha');
    	if (!this.can_run){
    		setTimeout(() => {this.captcha()}, 100);
    		return;
    	}
		this.update_status('Captcha');
    	this.bot_window.loadURL('https://patrickhlauke.github.io/recaptcha/');
    }

	get_item_infos(item_array, num){
		
		if (!this.shop_dict){
			setTimeout((item_array_=item_array, num_ = num) => {this.get_item_infos(item_array_, num_)}, 100)
			return;
		}

		let category = item_array['category'].toUpperCase(),
			item_key_words = item_array['keywords'].toUpperCase().split(','),
			style_keywords = item_array['color'].toUpperCase().split(','),
			size_to_pick = item_array['size'] ? item_array['size'].toUpperCase(): item_array['size'],
			
			approvation_key_words = create_array(false, item_key_words.length),
			key_word,
			item_link,
			item_name,
			found_item,
			item_id,
			style_to_pick_id,
			size_to_pick_id,
			item_infosstyle,
			size,
			style_name,
			size_name,
			script;
		// analizzo tutti gli item per vedere se qualcuno contiene tutte le key workds e modifico la lista di conseguenza
		// se l'item contiene una keywork allora all'interno di 'approvation_key_words' inserisco un true
		for (item_name in this.shop_dict[category]){ 
			found_item = true;
			for (let i=0; i < item_key_words.length; i++){
				key_word = item_key_words[i].toUpperCase().trim();
				
				if (key_word[0] == '-'){
					if (!item_name.includes(key_word)){
						continue;
					} else {
						found_item = false;
					}
				} else {
					if (item_name.includes(key_word)){
						continue;
					} else {
						found_item = false;
					}
				}	

			}
			if (found_item){
				break
			}
		}

		if (!found_item){
			this.items_found[i] = 'false';
			this.items_requests.pop();
			this.update_item(i, 'Not found', 'Not found', 'Not found');
			return;
		}

		this.shop_dict[category][item_name]['style'] = new Object();
		item_id = this.shop_dict[category][item_name]['id'];

		item_link = `https://www.supremenewyork.com/shop/${item_id}.json`
		fetch(item_link)
		.then(function(response) {
		    return response.json();
		})
		.then((response) => {
			let item_infos = response;
			for(let general_separation in item_infos){
				if (general_separation == 'styles'){
					let style;
					let continue_ = true;
					for (style in item_infos[general_separation]){
						if(!continue_){
							break;
						}
						let found_style = true;
						style = item_infos[general_separation][style]
						style_name = style['name'].toUpperCase();

						for (let i=0; i < style_keywords.length; i++){

							key_word = style_keywords[i].toUpperCase().trim();
							if (key_word == 'RANDOM'){
								continue;
							} else if (key_word[0] == '-'){
								if (!style_name.includes(key_word)){
									continue;
								} else {
									found_style = false;
								}
							} else {
								if (style_name.includes(key_word)){
									continue;
								} else {
									found_style = false;
								}
							}	
						}

						if (!found_style){
							continue;
						} else {
							style_to_pick_id =  style['id'];

							if (size_to_pick && size_to_pick!='N/A'){
								for (size in style['sizes']){
									size = style['sizes'][size];
									size_name = size['name'].toUpperCase().trim();
								
									if(size_name == size_to_pick || size_to_pick == "ANY"){
										if (size['stock_level'] > 0){
											size_to_pick_id = size['id'];
											continue_ = false;
											break
										} else {
											if(size_to_pick == "ANY"){
												continue;
											} else {
												break;
											}
										}
										
									}
								}
							} else if (size_to_pick == 'N/A'){
								size = Array.from(style['sizes'].keys())[0];
								if(style['sizes'][size]['stock_level'] > 0){
									size_to_pick_id = style['sizes'][size]['id'];
								}
							}

							if (!size_to_pick_id && this.random_if_not_aviable === true){
								for (size in style['sizes']){
									size = style['sizes'][size];
									size_name = size['name'].toUpperCase().trim();
									if (size['stock_level'] > 0){
										size_to_pick_id = size['id'];
										continue_ = false;
										break
									} 
									
								}
							}
						}
					}
				}
			}

			if (item_id && style_to_pick_id && size_to_pick_id){
				script = {'num': num, 'name': item_name, 'id': item_id.toString(), 'style': style_to_pick_id.toString(), 'size': size_to_pick_id.toString()};
				this.update_item(num, item_name, style_name, size_name);
				this.scripts.push(script);
			}
			this.items_found[num] = [item_name];
			this.items_requests.pop();
		}); 
	}

	handle_error(err, text){
		console.log(err)
		this.update_status(text, 'red');
		drop_detector.remove(this);
	}

	update_status(text, color='white'){
		if(this.status_span.length == 0){
			this.status_span = $(`.task[data-id="${this.id}"] .task-overview .status`);
			this.task_more_div = $(`.task[data-id="${this.id}"] .task-more`);
			this.updates_info.push([text, color]);
			setTimeout(() => {
				let last_index = this.updates_info.length - 1;
				this.update_status(this.updates_info[last_index][0], this.updates_info[last_index][1]);
			}, 100);
			return;
		}

		this.status_span.text(text);
		this.status_span.css('color', color);
	}

	update_item(id, name='None', style='None', size='None', color='white', cart=null){
		// update
		let item = this.task_more_div.children(`div[data-id="${parseInt(id)}"]`).children('span');
		if (cart){
			item.children('.status').text(cart);
			return;
		}
		item.children('.name').text(name)
		item.children('.style').text(style)
		item.children('.size').text(size)
	}

    timer_detector(){
    	if (!this.bot_window.isDestroyed() && this.process.status('cop') == true){
	    	let date_start = new Date(this.date + 'T' + this.time).getTime();
			let now = new Date().getTime();
			if (now < date_start){
				console.log('here')
				setTimeout(() => {this.timer_detector()}, 100);
				return;
			} else {

				this.run();

			}
		}
    }

	detect_when_start(){
		
		if (!this.can_run){
    		setTimeout(() => {this.detect_when_start()}, 100) 
    		return;
    	}
    	// update
    	this.process.start('cop');
		this.update_status('Running');
    	if (!this.bot_window.isDestroyed()){
    		this.bot_window.loadURL('https://www.supremenewyork.com/shop')
	    	if (this.task_type == 'detect drop'){
	    		drop_detector.add(this);
	    		drop_detector.start();
	    		
	    	} else if (this.task_type == 'timer'){
	    		let date_start = new Date(this.date + 'T' + this.time).getTime();
				let now = new Date().getTime();
				if (now < date_start){
					setTimeout(() => {this.timer_detector()}, 100);
					return;
				} else {
					this.run();
				}

	    	} else if (this.task_type == 'restock'){
	    		this.update_status('Restock Checking', 'purple');
	    		drop_detector.add(this);
	    		drop_detector.start();
	    		this.run();
	    	}
	    }
    }



    run(recall){
    	if (!this.bot_window.isDestroyed() && this.process.status('cop') == true){
    		
			this.shop_dict = drop_detector.shop_dict;
			if(!this.shop_dict){
				setTimeout(() => {this.run()}, 1000);
				return
			}
			for (let i=0; i< this.items.length; i++){
				let item = this.items[i];
				this.get_item_infos(item, i=i);
			}
			
			if (!recall){
				this.bot_window.loadURL('https://www.supremenewyork.com/shop')
				.then(function(response) {  
				    this.buy();
				}).catch((response) => {
					this.buy();
				});
			} else {
			
				this.buy();
			}
		}
    }

    quit(){
    	this.bot_window.close();
    }

    script_execution(divs){
    	this.bot_window.webContents.executeJavaScript(`
			function eventFire(el, etype){
				if (el.fireEvent) {
					el.fireEvent('on' + etype);
				} else {
					var evObj = document.createEvent('Events');
					evObj.initEvent(etype, true, false);
					el.dispatchEvent(evObj);
				}
			}
			let divs = '${divs.trim()}'.split('$-$');
			divs.shift();
			divs.pop();
			let buttons = [];
			if(divs.length > 0){
				let i;
				let cart = $('<div class="" id="cart" style="opacity: 0; position:absolute;"><ul><li class="num"><i id="items-count">2 items</i> <span class="in_cart_text">in basket</span></li><li class="subtotal-container"><b>subtotal</b>&nbsp;<i id="subtotal" class="four-chars">€146</i></li></ul><a class="button edit" href="/shop/cart">view/edit basket</a><a class="button checkout" data-no-turbolink="true" href="https://www.supremenewyork.com/checkout">checkout now</a></div>');
				cart.prependTo('body');
				for ( i in divs){
					let div = $(divs[i]);
					
					buttons.push(div);
					div.prependTo('body');
				}
				for (let i=0; i<buttons.length; i++){
					let button = buttons[i].children('form').children('fieldset').children('input[type="submit"]');
					setTimeout((button_ = button) => {
						button_.trigger( "click" );
					}, 200 * i);
				}		
			}
			
	`).then((response) => {
	    let divs_ = divs.trim().split('$-$');
		divs_.shift();
		divs_.pop();

		this.profile_datas = profiles[this.profile];
		setTimeout(() => {this.checkout()}, this.checkout_time );

	}).catch((response) => {
		this.handle_error(response, 'ERR 03: slow internet or proxy error ( try restarting wihype )');
	});
    }

    buy(){
    	if(this.process.status('cop') == false){
    		return;
    	}

		if (!(this.items_requests.length == 0)){
			setTimeout(() => {this.buy()}, 100);
			return;
		}
		//this.bot_window.hide();
		let divs = '$-$';

`
DIV FORMAT

<div class="cctrl">
	<form class="add" id="cart-addf" action="/shop/111111}/add" accept-charset="UTF-8" data-remote="true" method="post">
		<input name="utf8" type="hidden" value="✓">
		<input type="hidden" name="style" id="style" value="11111">
		<input type="hidden" name="size" id="size" value="11111">
		<fieldset id="add-remove-buttons">
			<input type="submit" name="commit" value="add ITEM NAME" class="button">
		</fieldset>
	</form>
</div>`
		
		if (this.scripts.length == 0){
			if (this.task_type == 'restock'){
	    		setTimeout(() => {this.run('recall true');}, 1000);
	    		return;
	    	} else {
	    		this.update_status('Items not found', 'red');
	    		return;
	    	}
		}
		this.update_status('Items found', 'green');
		for (let i=0; i<this.scripts.length; i++){
			let script = this.scripts[i];
			let div = `<div class="custom" style="opacity: 0; position:absolute;"><form class="add" id="cart-addf" action="/shop/${script['id']}/add" accept-charset="UTF-8" data-remote="true" method="post"><input name="utf8" type="hidden" value="✓"><input type="hidden" name="style" id="style" value="${script['style']}"><input type="hidden" name="size" id="size" value="${script['size']}"><fieldset id="add-remove-buttons"><input type="submit" name="commit" value="add ${script['name']}" class="button"></fieldset></form></div>$-$`
			divs += div;
		}
		this.bot_window.loadURL('https://www.supremenewyork.com/shop')
		.then( response => {
			this.script_execution(divs)
		})
		.catch( response => {
			this.script_execution(divs)
		})
	}

	start_ocr(){
		ocr_settings['run_ocr'] = 'True';
		edit_ocr_settings();
		let ocr_pid = run_ocr();
		this.send_otp(ocr_pid);
	}

	
	send_otp(pid){
		fs.readFile('datas/otp.txt', 'utf-8', (err, data) => {
			if (err) throw err;
			let otp = data.trim()
			if (otp.length == 6){
				this.update_status(data, 'white');
			} 
			console.log('checking otp')
			if (ocr_settings['pid'] == pid){
				setTimeout(() => {this.send_otp(pid);}, ocr_settings['reload_time'] * 1000);
			}
				
			
			
		});
	}

	checkout(){

		if(this.process.status('cop') == false){
    		return;
    	}

		this.bot_window.loadURL('https://www.supremenewyork.com/checkout')
		.then((response) => {
			this.update_status('Landed Checkout', 'green');
			for (let i=1; i-1<this.scripts.length; i++){
				this.update_item(i, null, null, null, null, 'in cart: true')
			}

			this.bot_window.webContents.executeJavaScript('window.location.href')
	        		.then((response) => { 
	        			
	        			if(!response.includes('https://www.supremenewyork.com/checkout')){
	        				this.handle_error(response, `ERR 05 could not land checkout page ( maybe slow internet [check your proxy if you are using one])`);
	        			} else {
	        				console.log(this.profile_datas['year'])
	        				this.bot_window.show(true);
	        				let checkout_script = `

					    		function fill_form(){
						    		let checkout_button = $('input[name="commit"]');
						    		console.log(checkout_button);
									if (!checkout_button.length > 0){
										setTimeout(fill_form, 100);
									} 
						    		$('input[name="order[billing_name]"]').val('${this.profile_datas['nome']} ${this.profile_datas['cognome']}');
									$('input[name="order[email]"]').val('${this.profile_datas['email']}');
									$('input[name="order[tel]"]').val('${this.profile_datas['telefono']}');
									$('input[name="order[billing_address]"').val('${this.profile_datas['indirizzo-1']}');
									$('input[name="order[billing_address_2]"').val('${this.profile_datas['indirizzo-2']}');
									$('input[name="order[billing_address_3]"').val('${this.profile_datas['indirizzo-3']}');
									$('input[name="order[billing_city]"').val('${this.profile_datas['città']}');
									$('input[name="order[billing_zip]"').val('${this.profile_datas['codice-postale']}');

									$('input[name="order[billing_country]"').val('${this.profile_datas['nazione']}');

									$('#order_billing_country option[selected="selected"]').prop('selected', '');
									$('#order_billing_country option[value="${this.profile_datas['nazione']}"]').prop('selected', 'selected');


									$('#credit_card_type').val('${this.profile_datas['brand']}'); 
									$('input[name="credit_card[cnb]"').val('${this.profile_datas['number']}');

									$('#credit_card_month option[selected="selected"]').prop('selected', '');
									$('#credit_card_month option[value="${this.profile_datas['month']}"]').prop('selected', 'selected');

									$('#credit_card_year option[selected="selected"]').prop('selected', '');
									$('#credit_card_year option[value="${this.profile_datas['year']}"]').prop('selected', 'selected');


									$('input[name="credit_card[ovv]"').val('${this.profile_datas['cvv']}');
									$('input[name="order[terms]"').trigger('click');
					    		}
				    			fill_form();
					    	`
	        				this.bot_window.webContents.executeJavaScript(checkout_script)
					    	.then((response) => {  
					    		if(this.auto_checkout == true){
					    			this.bot_window.webContents.executeJavaScript(`document.querySelector('.button.checkout').click()`)
							    	.then((response) => {
							    		drop_detector.remove(this);
										this.update_status('Checkout clicked', 'green');
										if(this.ocr == true){
											this.start_ocr();
										}
									})
							    	.catch((response) => {
							    		drop_detector.remove(this);
										console.log('ERROR', 'Error trying to click checkout button');
										this.update_status('Error 07 trying to click checkout button', 'red');
									});
					    		} else {
					    			drop_detector.remove(this);
					    			this.update_status('Finished, Auto check out not enabled', 'green');
					    			if(this.ocr == true){
										this.start_ocr();
									}
					    		}
						    	
							})
							.catch((response) => {
								this.handle_error(response, 'ERR 06: problems during filling checkout form');
							});
	        			}

	        		});
			
		})
		.catch((response) => {
			this.update_status('Checkout fail', 'red');
		})
	}

}


`
<div>
	<form class="add" id="cart-addf" action="/shop/304751/add" accept-charset="UTF-8" data-remote="true" method="post">
		<input name="utf8" type="hidden" value="✓">
		<input type="hidden" name="style" id="style" value="27948">
		<fieldset>
			<select name="size" id="size">
				<option value="61194">Medium</option>
				<option value="61195">Large</option>
				<option value="61196">XLarge</option>
			</select>
			<a class="next" href="/shop/tops-sweaters/dgurnlp8k">next tops/sweater &gt;</a>
		</fieldset>
			<fieldset id="add-remove-buttons">
				<input type="submit" name="commit" value="add to basket" class="button">
				<a class="button continue" href="/shop">keep shopping</a>
			</fieldset>
	</form>
</div>
`
