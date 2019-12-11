function populate_profiles(){
	fs.readFile('datas/profiles.txt', "utf8", function(err, data) {
		profiles_dict = JSON.parse(data);
		$('#profiles').empty();
	    $('#profiles').append($(`<option value="default">Select profile</option>`));
	    for (key in profiles_dict){
	    	var  option = $(`<option value="${key}"></option>`);
	    	option.text(key);
	    	$('#profiles').append(option);
	    }
	});
}