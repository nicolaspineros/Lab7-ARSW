
app = (function (){
    var _author;
    var _blueprints = [];

    var _setTable = function(blueprints) {
        var lista = blueprints.map(function(blueprint){
            return{
                name: blueprint.name, points: blueprint.points.length
            }})
        $("#tb-body").empty();
        lista.map(function(bp) {
            $("#tb-body").append('<tr><td id="nameAuthor">'+bp.name+'</td><td id="points">'+bp.points+'</td><td type="button" onclick="app.drawBlueprint(\''+_author+'","'+bp.name+'\')">Open</td></tr>');
        });

        var total = lista.reduce((vtotal, {points})=>vtotal.points + points);
        $("#puntosText").text("Total user points: "+total);
    };

    var generateListBp = function(author) {
        _author = author;
        $("#sb-author").text(author+"'s Blueprints:");
        apimock.getBlueprintsByAuthor(author,_setTable);        
    };

    var _drawBP = function(blueprint){
        $("#current").text("Current Blueprint: "+blueprint.name);
        var points = blueprint.points;
        var canvas = document.getElementById("canvasBp");
        var ctx = c.getContext("2d");

        ctx.clearRect(0,0,canvas.wigth,canvas.height);
        ctx.beginPath();
        ctx.moveTo(points[0].x, points[0].y);
        points.forEach(
			function(item, index) {
				if (index > 0) {
					ctx.lineTo(item.x, item.y);
				}
			}
		);
		ctx.stroke();
    };

    var drawBlueprint = function(author,bpName){
        apimock.getBlueprintsByNameAndAuthor(author,bpName,_drawBP);
    };

    
    return{        
        generateListBp: generateListBp,
        drawBlueprint: drawBlueprint
    }
})();