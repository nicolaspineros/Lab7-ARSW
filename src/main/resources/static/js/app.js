
app = (function (){
    var _author;
    var _blueprintName;
    var _blueprints;
    var _newPoints = [];
    var url = "js/apiclient.js";

    var _setTable = function(author,blueprints) {
        _blueprints = [];
        blueprints.map(function(blueprint){
            _blueprints.push({name: blueprint.name, points: blueprint.points.length});
        }); 
        $("#tb-body").empty();
        _blueprints.map(bp => {
            $("table").append($('<tr><td id="nameAuthor">'+bp.name+'</td><td id="points">'+bp.points+'</td><td><button class="bt-bp">Open</button></td></tr>').on("click","button",() => drawBlueprint(bp.name)));
        });

        var total = _blueprints.reduce((vtotal, {points})=>vtotal.points + points);
        $("#puntosText").text("Total user points: "+total);
    };

    var generateListBp = function() {                
        $.getScript(url, function () {
            _author = $("#author").val();
            $("#sb-author").text(_author+"'s Blueprints:");
            apiclient.getBlueprintsByAuthor(_author,_setTable);
        });
    };

    var cleanCanvas = function () {
        let c = document.getElementById("canvasBp");
        let ctx = c.getContext("2d");
        ctx.clearRect(0, 0, c.width, c.height);
        ctx.beginPath();
    };

    var _drawBP = function(name,blueprint){
        console.log("entra a drawBP"); 
        console.log(blueprint);
        $("#current").text("Current Blueprint: "+blueprint.name);        
        var points = blueprint.points;
        var canvas = document.getElementById("canvasBp");
        var ctx = canvas.getContext("2d");   
        cleanCanvas();       
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
    
    var drawBlueprint = function(bpName){
        _blueprintName = bpName;                
        $.getScript(url,function(){             
            apiclient.getBlueprintsByNameAndAuthor(_author,bpName,_drawBP);
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
        var oldBlueprint = _blueprints.find((bp) => bp.name == _blueprintName); 
        _newPoints.forEach((element) => {
          oldBlueprint.points.push({ x: element.x, y: element.y });
        });
        apiclient.updateBlueprint(oldBlueprint, _author, _blueprintName).then(
          function () {
            generateListBp();
            drawBlueprint(_blueprintName);
          },
          function () {
            alert("failed!");
          }
        );
    };

    var addNewBlueprint = function () {
        _blueprintName = $("#newBlueprintName").val();
        var newBlueprint = { author: _author, name: _blueprintName, points: [] };
        apiclient.addNewBlueprint(newBlueprint, author).then(
          function () {
            generateListBp();
          },
          function () {
            alert("failed!");
          }
        );
    };
    
    var deleteBlueprint = function () {
        cleanCanvas();
        apiclient.deleteBlueprint(_author, _blueprintName).then(
          function () {
            generateListBp();
          },
          function () {
            alert("failed!");
          }
        );
    };

    return{        
        generateListBp: generateListBp,
        drawBlueprint: drawBlueprint,
        cleanCanvas: cleanCanvas,
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