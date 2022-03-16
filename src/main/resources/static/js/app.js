
app = (function (){
    var _author;
    var _blueprintName;
    var _blueprints = [];
    var _newPoints = [];
    var url = "js/apiclient.js";

    var _setTable = function(blueprints) {
        var lista = blueprints.map(function(blueprint){
            return{
                name: blueprint.name, points: blueprint.points.length
            }})
        $("#tb-body").empty();
        lista.map(bp => {
            $("#tb-body").append($('<tr><td id="nameAuthor">'+bp.name+'</td><td id="points">'+bp.points+'</td><td><button class="bt-bp">Open</button></td></tr>').on("click","button",() => drawBlueprint(_author,bp.name)));
        });

        var total = lista.reduce((vtotal, {points})=>vtotal.points + points);
        $("#puntosText").text("Total user points: "+total);
    };

    var generateListBp = function(author) {
        _author = author;        
        //apimock.getBlueprintsByAuthor(author,_setTable);        
        $.getScript(url, function () {
            $("#sb-author").text(author+"'s Blueprints:");
            apiclient.getBlueprintsByAuthor(author,_setTable);
        });
    };

    var _drawBP = function(blueprint){
        console.log(blueprint);
        $("#current").text("Current Blueprint: "+blueprint.name);
        var points = blueprint.points;
        var canvas = document.getElementById("canvasBp");
        var ctx = canvas.getContext("2d");          
        ctx.clearRect(0,0,canvas.width,canvas.height);
        ctx.beginPath();
        let initx = blueprint.points[0].x;
        let inity = blueprint.points[0].y;
        points.forEach(element => {            
            ctx.moveTo(initx.x, inity.y);
            ctx.lineTo(element.x,element.y);            
            ctx.stroke();
            initx = element.x;
            inity = element.y;
        });                        
    };

    var drawBlueprint = function(author,bpName){
        _blueprintName = bpName;
        //apimock.getBlueprintsByNameAndAuthor(author,bpName,_drawBP);
        $.getScript(url,function(){ 
            apiclient.getBlueprintsByNameAndAuthor(author,bpName,_drawBP);
        });
    };

    var addNewPoints = function (event) {
        var canvas = document.getElementById("canvasBp");
        user = canvas.getBoundingClientRect();
        if (_blueprintName != null) {
          _newPoints.push({
            x: Math.round(event.clientX - user.left),
            y: Math.round(event.clientY - user.top),
          });
        }
    };

    var updateBlueprint = function () {
        var oldBlueprint = mockdata.find((bp) => bp.name == _blueprintName); 
        _newPoints.forEach((element) => {
          oldBlueprint.points.push({ x: element.x, y: element.y });
        });
        apiclient.updateBlueprint(oldBlueprint, author, _blueprintName).then(
          function () {
            getBlueprintsByAuthor();
            getBlueprintsByNameAndAuthor(_blueprintName);
          },
          function () {
            alert("failed!");
          }
        );
    };

    var addNewBlueprint = function () {
        _blueprintName = $("#newBlueprintName").val();
        var newBlueprint = { author: author, name: _blueprintName, points: [] };
        apiclient.addNewBlueprint(newBlueprint, author).then(
          function () {
            getBlueprintsByAuthor();
          },
          function () {
            alert("failed!");
          }
        );
    };
    
    var deleteBlueprint = function () {
        let c = document.getElementById("canvasBp");
        let ctx = c.getContext("2d");
        ctx.clearRect(0, 0, c.width, c.height);
        ctx.beginPath();
        apiclient.deleteBlueprint(author, _blueprintName).then(
          function () {
            getBlueprintsByAuthor();
          },
          function () {
            alert("failed!");
          }
        );
    };

    return{        
        generateListBp: generateListBp,
        drawBlueprint: drawBlueprint,
        updateBlueprint: updateBlueprint,    
        addNewBlueprint: addNewBlueprint,
        deleteBlueprint: deleteBlueprint,
        init: function () {
            var canvas = document.getElementById("canvasBp");
        
            if (window.PointerEvent) {
                canvas.addEventListener(
                "pointerdown",
                addNewPoints,
                function (event) {}
                );
            } else {
                canvas.addEventListener("mousedown", addNewPoints, function (event) {});
            }
        },
    }
})();