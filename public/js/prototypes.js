Array.prototype.remove = function() {
    var what, a = arguments, L = a.length, ax;
    while (L && this.length) {
        what = a[--L];
        while ((ax = this.indexOf(what)) !== -1) {
            this.splice(ax, 1);
        }
    }
    return this;
};

function go_to_file(file){
    try {
        if (Object.keys(active_tasks.store).length > 1){
            show_warning(`<i class="fas fa-exclamation-triangle"></i> <br>
                    The navigation on the app is blocked While a job is running`);
            return;
        }
    } catch(e) {
       
    }
	let old_href = window.location.href;
	let old_href_array = old_href.split('/');
	let current_file = old_href_array[old_href_array.length - 1];
	let new_href = old_href.replace(current_file, file);
	window.location.href = new_href;
}