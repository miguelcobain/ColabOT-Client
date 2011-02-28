var editor;
var doc;
var socket;

var myMsgs;
var otherMsgs;
var notAcknowleged;

window.onload = function() {
	//Initialize editor
    editor = ace.edit("editor");
    editor.setTheme("ace/theme/twilight");
	editor.setShowMargin(false);

	var C_CppMode = require("ace/mode/c_cpp").Mode;
    editor.getSession().setMode(new C_CppMode());
	
	doc = editor.getSession().getDocument();
	
	//Register callback
	doc.on('detect', detector);
	
	//initialize state
	myMsgs=0;
	otherMsgs=0;
	notAcknowleged=new Array();

	socket = new WebS("ws://localhost:18608");
	socket.connect();
	
	/*$('#slidebottom').draggable({
		axis: 'y',
		handle: '#tab',
		scroll:false,
		containment:'parent',
		disabled: true,
		//delay: 300,
		start: function start (e, ui)
		{
		    var draggable = ui.helper.data('draggable');
		    draggable.helperProportions = { height: 250, width: 60 };
		    ui.helper.data('draggable', draggable);
		    ui.helper.data('draggable')._setContainment();
		
			$("#tab").addClass('noclick');
		},
		drag: function(event, ui) {
			//console.log("fired");
		}
	});*/

    $("#tab").click(function(){
	
	    if ($(this).hasClass('noclick')) {
	        $(this).removeClass('noclick');
	    }
	    else {
	        // actual click event code
			var value,value2;
			if(visible) {value=440;value2=0}
			else {value=175;value2=264}
			visible=!visible;
			//$( "#slidebottom" ).draggable( "option", "disabled", !visible );
		
			$("#slidebottom").animate({
				top:value,
			}, 1500 );
			/*$("#chat").animate({
				height:value2,
			}, 1500 );*/
		}
    });
	//setTimeout("timedCount()",1000);
	
};

var visible=false;


function timedCount(){
	$("#slidebottom").slideToggle();
	
	//doc.insert({row: 0, column:0},"sdhjbadsads");
	//doc.insertLines(0, ["dsaads","adsads"]);
	//doc.remove({start:{column:10,row:2},end:{column:15,row:2}});
	var start = {
        row: 2,
        column: 10
    };
    var end = {
        row: 2,
        column: 15
    };
	
	var range = doc.makeRange(2,10,2,15);
	//doc.remove(range);
	
	t=setTimeout("timedCount()",3000);
}