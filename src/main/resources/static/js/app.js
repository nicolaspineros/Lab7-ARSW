
app = (function (){
    var _author;
    var _blueprints = [];

    var _setTable = function(blueprints) {
        var lista = blueprints.map(function(blueprint){
            return{
                name: blueprint.name, nPoints: blueprint.points.length
            }});
        $("#tb-body").empty();
        lista.map(function(bp) {
            $("#tb-body").append('<tr><td id="nameAuthor">'+bp.key+'</td><td id="points">'+bp.nPoints+'</td><td>')
        });

        var total = lista.reduce((vtotal, valor)=>{return vtotal + nPoints});
        $("#puntosText").text("Total user points: "+total);
    };

    var generateListBp = function(author) {
        _author = author;
        $("#sb-author").text(author+"'s Blueprints:");
        apimock.getBlueprintsByAuthor(_author,_setTable);        
    };

    var _drawBP = function(blueprint){
        $("#current").text("Current Blueprint: "+blueprint.name);
        var canvas = document.getElementById("canvasBp");
        var ctx = c.getContext("2d");
    };

    var drawBlueprint = function(author,bpName){
        apimock.getBlueprintsByNameAndAuthor(author,bpName,_drawBP);
    };

    
    return{        
        generateListBp: generateListBp,
        drawBlueprint: drawBlueprint
    }
})();