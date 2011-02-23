//MAIN

var WS;
var myMsgs;
var otherMsgs;
var notAcknowleged;

$(document).ready(function() {

	//Run binders
	$("#editable").bind("keydown", detector);
	
	$("#editable").bind("focus", function () {
		$("#editable").css("border-style", "solid");
	});
	
	$("#editable").bind("blur", function () {
		$("#editable").css("border-style", "dotted");
	});
	
	//don't delete the beyond p
	$("#editable").keydown(function(ev){
		
		//don't delete the beyond p
		if(ev.keyCode == 8 || ev.keyCode == 46){
	    var editing_lines = $("#editable").children("div").children("p");
			
		if(editing_lines.length == 1 && $(editing_lines[0]).html() == "<br>"){
			$(editing_lines[0]).html("&nbsp;");
		}
	}
});
	
	//initialize state
	myMsgs=1;
	otherMsgs=1;
	notAcknowleged=new Array();

	WS = new WebS("ws://localhost:18608");
	WS.connect();
});

function generate(ops) {
	//TODO apply(ops);

	WS.sendOP(ops, myMsgs, otherMsgs);
	
	jQuery.each(ops, function() {
		notAcknowleged.push(this);
		myMsgs++;
	});
}

function receive(ops,state){
	
	/* Discard acknowledged messages. */
	jQuery.each(notAcknowleged, function() {
	});
}


//Receive(msg) { 
//	/* Discard acknowledged messages. */
//	for m in (notAcknowleged){
//		if (m.myMsgs < msg.otherMsgs)
//			remove m from outgoing
//	} 
//	/* ASSERT msg.myMsgs == otherMsgs. */
//	for i in [1..length(outgoing)]	{
//		/* Transform new message and the ones in the queue. */
//		{msg, outgoing[i]} = xform(msg, outgoing[i]);
//	
//	}
//	apply msg.op locally;
//	otherMsgs	= otherMsgs	+ 1;
//}

function inspectLineChanges(){
	//get all lines inside editable area
	var editable_lines = $("#editable").children("div").children("p");

	//iterate throught all lines in the editable area
	editable_lines.each(function(i){
		//give it a new id
		$(this).attr('id', "line" + i);
	});
}

function getContent(){
	var txt="";
	var editable_lines = $("#editable").children("div").children("p");
	editable_lines.each(function(i){
		txt=txt+$(this).text()+"\n";
	});
	
	return txt;
	
}
