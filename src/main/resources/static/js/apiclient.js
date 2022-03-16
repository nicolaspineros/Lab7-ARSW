var apiclient = (function() {

	var getBlueprintsByAuthor = function(name, callback) {		
		$.getJSON(
			"http://localhost:8080/blueprints/" + name,
			function(response) {
				callback(null,response);
			}
		);
	};

	var getBlueprintsByNameAndAuthor = function(author, name, callback) {
		$.getJSON(
			"http://localhost:8080/blueprints/" + author + "/" + name,
			function(response) {
				callback(null,response);
			}
		);
	};

	var updateBlueprint = function (blueprint, author, name) {
		return $.ajax({
		  url: "http://localhost:8080/blueprints/" + author + "/" + name,
		  type: "PUT",
		  data: JSON.stringify(blueprint),
		  contentType: "application/json",
		});
	  };

	var addNewBlueprint = function (blueprint) {
		return $.ajax({
			url: "http://localhost:8080/blueprints",
			type: "POST",
			data: JSON.stringify(blueprint),
			contentType: "application/json",
		});
	};
	
	var deleteBlueprint = function (author, name) {
		return $.ajax({
			url: "http://localhost:8080/blueprints/" + author + "/" + name,
			type: "DELETE",
		});
	};

	return {
		getBlueprintsByAuthor: getBlueprintsByAuthor,
		getBlueprintsByNameAndAuthor: getBlueprintsByNameAndAuthor,
		updateBlueprint: updateBlueprint,
    	addNewBlueprint: addNewBlueprint,
    	deleteBlueprint: deleteBlueprint,
	};

})();