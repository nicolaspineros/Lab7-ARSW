var apiclient = (function() {

	const URL = "blueprints/";

	var getBlueprintsByAuthor = function(name, callback) {		
		$.get(
			URL + name,
			function(response) {
				callback(response);
			}
		);
	};

	var getBlueprintsByNameAndAuthor = function(author, name, callback) {
		$.get(
			URL + author + "/" + name,
			function(response) {
				callback(response);
			}
		);
	};

	return {
		getBlueprintsByAuthor: getBlueprintsByAuthor,
		getBlueprintsByNameAndAuthor: getBlueprintsByNameAndAuthor
	};

})();