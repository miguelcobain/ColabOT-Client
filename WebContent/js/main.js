var editor;
var doc;
var socket;

var myMsgs;
var otherMsgs;
var notAcknowleged;

window.onload = function() {
    editor = ace.edit("editor");
    editor.setTheme("ace/theme/twilight");
    
    /*var JavaScriptMode = require("ace/mode/javascript").Mode;
    editor.getSession().setMode(new JavaScriptMode());*/

	var CMode = require("ace/mode/c_cpp").Mode;
    editor.getSession().setMode(new CMode());

	//editor.getSession().on('change', detector);
	
	doc = editor.getSession().getDocument();
	doc.on('detect', detector);
	
	//initialize state
	myMsgs=0;
	otherMsgs=0;
	notAcknowleged=new Array();
	

	socket = new WebS("ws://localhost:18608");
	socket.connect();
	//setTimeout("timedCount()",1000);
	
};

function timedCount(){
	doc.insert({row: 0, column:0},"sdhjbadsads");
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
	
	//t=setTimeout("timedCount()",1000);
}