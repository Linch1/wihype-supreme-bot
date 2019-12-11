window.addEventListener('load', start);
var profiles_dict;

function reset(){
	$('#nome-profilo').val('')
	$('#nome').val('');
	$('#cognome').val('');
	$('#email').val('');
	$('#telefono').val('');
	$('#indirizzo-1').val('');
	$('#indirizzo-2').val('');
	$('#indirizzo-3').val('');
	$('#città').val('');
	$('#codice-postale').val('');
	$('#nazione').val('GB');
	$('#number').val('');
	$('#month').val('');
	$('#year').val('');
	$('#owner').val('');
	$('#cvv').val('');
	$('#brand').val('visa');
}

function start() {
	$('.payment .card-front').toggleClass( "position-fixed" );
	$('.payment .card-retro').toggleClass( "position-fixed" );
	$('.payment .card-settings').toggleClass( "position-fixed" );
	$('.shipping').toggleClass( "shipping-position-fixed" );
	$('.buttons .button.submit').click((target) => {

		var fields = new Object();
		fields['nome-profilo'] = $('#nome-profilo').val().trim();
		fields['nome'] = $('#nome').val().trim();
		fields['cognome']  = $('#cognome').val().trim();
		fields['email']  = $('#email').val().trim();
		fields['telefono']  = $('#telefono').val().trim();
		fields['indirizzo-1']  = $('#indirizzo-1').val().trim();
		fields['indirizzo-2']  = $('#indirizzo-2').val().trim();
		fields['indirizzo-3']  = $('#indirizzo-3').val().trim();
		fields['città']  = $('#città').val().trim();
		fields['codice-postale']  = $('#codice-postale').val().trim();
		fields['nazione']  = $('#nazione').val().trim();
		fields['number']  = $('#number').val().trim();
		fields['month']  = $('#month').val().trim();
		fields['year']  = '20' + $('#year').val().trim();
		fields['owner']  = $('#owner').val().trim();
		fields['cvv']  = $('#cvv').val().trim();
		fields['brand']  = $('#brand').val().trim();

		var incomplete = false;
		var datas = `{\n`;
		for (key in fields){
			if ((fields[key] == '' || fields[key] == 'FILL' || fields[key] == 'FILL@ME.PLS' || fields[key] == '333 333 3333')
			&& (key != 'indirizzo-2' && key != 'indirizzo-3')){
				var elem = $(`#${key}`);
				if (key == 'email'){
					elem.val('FILL@ME.PLS');
				} else if (key == 'telefono'){
					elem.val('333 333 3333');
				} else {
					elem.val('FILL');
				}
				elem.css('color', 'red');
				incomplete = true;
			}
		}

		if (!incomplete){
			let name_ = fields['nome-profilo']
			profiles_dict[name_] = new Object();
			for (key in fields){
				profiles_dict[name_][key] = fields[key];
			}

			var path = 'datas/profiles.txt';
			let datas = JSON.stringify(profiles_dict);
			fs.writeFile('datas/profiles.txt', datas, function (err) {
			  if (err) {console.log(err)} else {reset(); populate_profiles();} ;
			}); 

	
			
		} else {
			console.log('incorrect');
		}
	});

	$('.buttons .button.delete').click((target) => {

		var profile_to_delete = $('#nome-profilo').val();

		reset();

		if (profile_to_delete in profiles_dict){
			delete profiles_dict[profile_to_delete];
			var datas = JSON.stringify(profiles_dict);
			let tasks;

			fs.writeFile('datas/profiles.txt', datas, function (err) {
			  if (err) {console.log(err)} else {populate_profiles();} ;
			}); 

			fs.readFile('datas/tasks.txt', "utf8", function(err, tasks_) {
				tasks = JSON.parse(tasks_);
				fs.readFile('datas/profiles-tasks.txt', "utf8", function(err, data) {
					profiles_tasks = JSON.parse(data);

					if (profile_to_delete in profiles_tasks){

						for (let i=0; i<profiles_tasks[profile_to_delete].length; i++){
							task_id = profiles_tasks[profile_to_delete][i];
							tasks[task_id]['profiles'] = 'default';
						}

						delete profiles_tasks[profile_to_delete]
						let new_profiles_tasks = JSON.stringify(profiles_tasks);

						fs.writeFile('datas/profiles-tasks.txt', new_profiles_tasks, function (err) {
						  if (err) {console.log(err)} ;
						}); 

						let new_tasks = JSON.stringify(tasks);

						fs.writeFile('datas/tasks.txt', new_tasks, function (err) {
						  if (err) {console.log(err)} ;
						}); 
					}
					
				});
			});
			
		}
	});

	$('input').click((target) => {
		var elem = $(target)[0].currentTarget;
		elem.style.color = 'white';
	})
	$('input').focus((target) => {
		var elem = $(target)[0].currentTarget;
		elem.style.color = 'white';
	})

	$('#profiles').change((target)=>{
		var selected_profile = $(target.currentTarget).val();
		if (selected_profile == 'default'){
			reset();
		} else {
			var infos = profiles_dict[selected_profile];
			$('input').css('color', 'white');
			$('#nome-profilo').val(selected_profile)
			$('#nome').val(infos['nome']);
			$('#cognome').val(infos['cognome']);
			$('#email').val(infos['email']);
			$('#telefono').val(infos['telefono']);
			$('#indirizzo-1').val(infos['indirizzo-1']);
			$('#indirizzo-2').val(infos['indirizzo-2']);
			$('#indirizzo-3').val(infos['indirizzo-3']);
			$('#città').val(infos['città']);
			$('#codice-postale').val(infos['codice-postale']);
			$('#nazione').val(infos['nazione']);
			$('#number').val(infos['number']);
			$('#month').val(infos['month']);
			$('#year').val(infos['year'].substring(2, 4));
			$('#owner').val(infos['owner']);
			$('#cvv').val(infos['cvv']);
			$('#brand').val(infos['brand']);
		}
		
	});

	populate_profiles();
}