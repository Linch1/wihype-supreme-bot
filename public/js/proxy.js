const  request = require('request'),
	   Agent = require('socks5-https-client/lib/Agent');


var proxies;
fs.readFile('datas/proxies.txt', "utf8", function(err, data) {
	try {
		proxies = JSON.parse(data);
	} catch(e) {
		console.log(e)
		proxies = {};
		fs.writeFile('datas/proxies.txt', '{}', (err) => {
			if(err) throw  err;
		})
	}
});

window.addEventListener('load', start);


var checkProxy = function (id, ip, port, url, user, pass, callback) {
	update_status(id, 'Checking ..', '#cb793a');
    var proxyRequest = request.defaults({
        agentClass: Agent,
        agentOptions: {
            socksHost: ip,
            socksPort: port,
            socksUsername: user,
            socksPassword: pass
        }
    });

    proxyRequest({ url: url, timeout: 120000 }, function (err, res) {
        var testText = 'content="Brum Brum ..."';
        if (err) {

            callback(id, ip, port, false, -1, err);
        } else if (res.statusCode != 200) {
            callback(id, ip, port, false, res.statusCode, err);
        } else if (!res.body) {
            callback(id, ip, port, false, res.statusCode, "regex problem" + options.regex + ".");
        } else {
            callback(id, ip, port, true, res.statusCode);
        }

    });
}

function update_status(id, text, color='white'){

	let elem = $(`.proxy[data-id='${id}']`).children('.status');
	elem.text(text);
	elem.css('color', color)
}

function populate_proxies(){

	let parent = $('.proxys-list-container');
	parent.empty();
	for(key_ in proxies){
		let key = key_;
		let div = $(`
		<div class="proxy" data-id="${key}">
		
			<div class="ip">
				
			</div>
			<div class="port">
				
			</div>
			<div class="username no-wrap">
				
			</div>
			<div class="password no-wrap">
				
			</div>

			<div class="status">
				Not checked
			</div>

			<div class="actions">
				
				<div class="action run tooltip"><span class="tooltiptext bottom"> test proxy </span><i class="fas fa-play"></i></div>
				<div class="action remove tooltip"><span class="tooltiptext bottom"> remove proxy </span><i class="fas fa-trash"></i></div>
				
			</div>

		</div>	
		`)

		let username = proxies[key]['username'] == '' ?  'None' : proxies[key]['username'];
		let pswd = proxies[key]['password'] == '' ?  'None' : proxies[key]['password'];

		div.children('.ip').text(`${proxies[key]['ip']}`);
		div.children('.port').text(`${proxies[key]['port']}`)
		div.children('.username').text(`${username}`);
		div.children('.password').text(`${pswd}`);

		let status_div = div.children('.status');
		let saved_status = proxies[key]['status'];

		if(saved_status == 'None'){
			status_div.text('Not checked');
		} else if(saved_status == 'Failed'){
			status_div.text('Failed');
			status_div.css('color', 'red');
		} else if(saved_status == 'Works'){
			status_div.text('Works');
			status_div.css('color', 'green');
		}
		parent.append(div);

	}

	if (Object.keys(proxies).length == 0){
		let elem = $(`
			<div id="big-add-proxy" class="add-task button submit">
				<span>ADD A PROXY <i class="fas fa-plus"></i></span>
				<div class="background"></div>
			</div>`);

		parent.append(elem);
	}
}

function proxy_callback(id, host, port, status, code, err) {
	if(err){
		update_status(id, 'Failed', 'red');
		proxies[id]['status'] = 'Failed';
		console.log(`ERROR: proxy num: ${id}, ip: ${host}, port: ${port}, STATUS: ${code}, ERROR: ${err}`)
	} else {
		update_status(id, 'Works', 'green');
		proxies[id]['status'] = 'Works';
		console.log(host, port, status, code);
	}

	fs.writeFile('datas/proxies.txt', JSON.stringify(proxies), (err) => {
		if(err) throw  err;
	});	

}


function start(){

	$('.proxy-body-container').toggleClass('inview');

	populate_proxies();

	let win = electron.remote.getCurrentWindow();
	$('.menu .close').click( evt => {
		win.close();
	});

	$('.menu .minimize').click( evt => {
		console.log(win)
		win.minimize();
	});

	$('#add-proxy').click(evt => {
		let elem = $('.proxys-input-container');
		elem.css('left', '0');
		elem.children('.proxys-input').addClass('inview');
	});

	$('#big-add-proxy').click(evt => {
		let elem = $('.proxys-input-container');
		elem.css('left', '0');
		elem.children('.proxys-input').addClass('inview');
	});

	$('.proxys-input-close').click(evt => {
		let elem = $('.proxys-input-container');
		elem.children('.proxys-input').removeClass('inview');
		setTimeout( () => {elem.css('left', '-100%');}, 900);
	});

	$('.submit-textarea').click(evt => {

		let proxies_list = $('#proxys').val().split('\n');

		for(let i=0; i<proxies_list.length; i++){
			let proxy = proxies_list[i];
			console.log(proxy);
			proxy = proxy.trim();
			if(proxy == ''){
				continue;
			}
			proxy = proxy.split(':');
			let ip = proxy[0];
			let port = proxy[1];
			let user = proxy[2] ? proxy[2]: '';
			let pswd = proxy[3] ? proxy[3]: '';
			let id = 0;

			if(id in proxies){
				while (id in proxies){
					id += 1;
				}
			}

			proxies[id] = {'ip': ip, 'port': port, 'username': user, 'password': pswd, "status": "None"};
			fs.writeFile('datas/proxies.txt', JSON.stringify(proxies), (err) => {
				if(err) throw  err;
			});
		}
		populate_proxies();

		let elem = $('.proxys-input-container');
		elem.children('.proxys-input').removeClass('inview');
		setTimeout( () => {elem.css('left', '-100%');}, 900);

		$('#proxys').val('');
	});

	document.querySelector('body').addEventListener('click', evt => {
		let elem = evt.target.parentElement;;
		let proxy_div = elem.parentElement.parentElement;
		let proxy_id = proxy_div.dataset.id;
		let proxy = proxies[proxy_id];
		if (elem.classList.contains('action')){

			if (elem.classList.contains('run')){
				
				checkProxy(
					proxy_id,
					proxy['ip'], 
					proxy['port'], 
					'https://www.booking.com', 
					proxy['username'],
					proxy['password'],
					proxy_callback
				);

			}

			if (elem.classList.contains('remove')){
				$(proxy_div).css('left', '100%');
				setTimeout(() => {$(proxy_div).css('display', 'none');}, 900);
				delete proxies[proxy_id];
				fs.writeFile('datas/proxies.txt', JSON.stringify(proxies), (err) => {
					if(err) throw  err;
				});		

				if(Object.keys(proxies).length == 0){
					populate_proxies();
				}		
			}

		}
	});

	$('#test-all-proxys').click( evt  => {
		for (proxy_id in proxies){
			let proxy = proxies[proxy_id];

			checkProxy(
				proxy_id,
				proxy['ip'], 
				proxy['port'], 
				'https://www.supremenewyork.com', 
				proxy['username'],
				proxy['password'],
				proxy_callback	
			);
		}
	});

	$('#delete-not-working-proxys').click( evt  => {
		for (proxy_id in proxies){
			let proxy = proxies[proxy_id];

			if (proxy['status'] == 'Failed'){
				delete proxies[proxy_id];
			}
		}
		fs.writeFile('datas/proxies.txt', JSON.stringify(proxies), (err) => {
			if(err) throw  err;
		});	
		populate_proxies();
	});

	$('#delete-all-proxys').click( evt  => {
		proxies = {};
		fs.writeFile('datas/proxies.txt', JSON.stringify(proxies), (err) => {
			if(err) throw  err;
		});	
		populate_proxies();
	});

	//checkProxy(host, port, {url: 'https://www.supremenewyork.com'}, callback());
}