//@author hcadavid

apimock=(function(){

	var mockdata=[];

	mockdata["johnconnor"]=	[{author:"johnconnor","points":[{"x":150,"y":150},{"x":150,"y":300},{"x":300,"y":300},{"x":300,"y":150}],"name":"house"},
	 {author:"johnconnor","points":[{"x":340,"y":240},{"x":15,"y":215}],"name":"gear"}];
	mockdata["maryweyland"]=[{author:"maryweyland","points":[{"x":140,"y":140},{"x":115,"y":115}],"name":"house2"},
	 {author:"maryweyland","points":[{"x":140,"y":140},{"x":115,"y":115}],"name":"gear2"}];
    mockdata["Nicolas"]=[{author:"Nicolas","points":[{"x":10,"y":10},{"x":25,"y":25}],"name":"paint1"},
   	 {author:"Nicolas","points":[{"x":100,"y":100},{"x":250,"y":250}],"name":"paint2"}];
   	mockdata["Juan"]=[{author:"Juan","points":[{"x":200,"y":200},{"x":54,"y":135}],"name":"test1"},
     {author:"Juan","points":[{"x":250,"y":250},{"x":354,"y":105}],"name":"test2"}];



	return {
		getBlueprintsByAuthor:function(authname,callback){
			callback(
				null,mockdata[authname]
			);
		},

		getBlueprintsByNameAndAuthor:function(authname,bpname,callback){

			callback(
				mockdata[authname].find(function(e){return e.name===bpname})
			);
			callback(null, e)
		},

	}

})();

/*
Example of use:
var fun=function(list){
	console.info(list);
}

apimock.getBlueprintsByAuthor("johnconnor",fun);
apimock.getBlueprintsByNameAndAuthor("johnconnor","house",fun);*/