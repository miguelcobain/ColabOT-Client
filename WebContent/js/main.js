//MAIN

var WS;
var myMsgs;
var otherMsgs;
var notAcknowleged;

var stored_lines = {};

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

		if(ev.keyCode == 8 || ev.keyCode == 46){
	    var editing_lines = $("#editable").children("div").children("p");
			
		if(editing_lines.length == 1 && $(editing_lines[0]).html() == "<br>"){
			$(editing_lines[0]).html("&nbsp;");
		}
	}
});
	
	//initialize state
	myMsgs=0;
	otherMsgs=0;
	notAcknowleged=new Array();
	

	WS = new WebS("ws://localhost:18608");
	WS.connect();
	
	//debugging
	logState(myMsgs,otherMsgs);
});

function generate(ops) {
	//TODO apply(ops);

	WS.sendOP(ops, myMsgs, otherMsgs);
	
	notAcknowleged.push(new Msg([myMsgs, otherMsgs],ops));
	
	myMsgs+=ops.length;
	
	logState(myMsgs,otherMsgs);

}

function receive(op,state){
	/* Discard acknowledged messages. */
	while(notAcknowleged.length != 0 && notAcknowleged[0].state[0] < state[1]){
		notAcknowleged.shift();
	}
	
	jQuery.each(notAcknowleged, function() {
		//{op, this} = xform(op, this);
	});
	
	apply(op)
	otherMsgs++;
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
	
	var changedLines = new Array();
	var deletedLines = new Array();
	var newLines = new Array();
	
    for(var lineid in stored_lines){
		deletedLines.push(lineid); 
    }
	
	editable_lines.each(function(i){
		var prev_id = prev_id = $(this).prev('p').attr('id') || '';
		var next_id = $(this).next('p').attr('id') || '';
		var id = $(this).attr('id');
		var content = $(this).text();
		
      	//is this a newly added line?
	    //all previously stored lines will have a unique uuid 
	    //when a new line is added browser copies the attributes of the previous line as is
	    //also a new line could be without a uuid (first line & pasted lines)
		if(id == undefined || id == '' || id == prev_id){
			//this is a newly added line
			//give it a new id
			//$(this).attr('line', "line" + editable_lines.length);

			//give it a new id
			new_id = generateID();
			$(this).attr('id', new_id);

        	//store it in the hash
        	stored_lines[new_id] = content;
			newLines.push({id:new_id, text:content});
		}
		else {
			//check whether this exisiting line was updated 
			if(stored_lines[id].length != $(this).text().length ||
				stored_lines[id] != $(this).text()){

	          //send off to diff worker to take the diff and update the server
	          //diff_worker.postMessage([uuid, stored_lines[uuid].content, $(this).text()]);
	
				changedLines.push({'id':id, former:stored_lines[id],text:content});
				//update the stored line in hash
				stored_lines[this.id] = this.text;
			}

	        //uncheck this lines uuid from removed lines array
	        deletedLines.splice(deletedLines.indexOf(id), 1);
	      }
		
	});
	
	//work with deleted lines
	if(deletedLines.length > 0){
		//iterate through the stale uuids
		$.each(deletedLines, function(){
			//remove the line from hash
			delete stored_lines[this];
		});
	}
	
	//alert("|"+changedLines+"|"+newLines+"|"+deletedLines+"|");
	showSL();
	return [changedLines, newLines, deletedLines];
}

function getContent(){
	var txt="";
	var editable_lines = $("#editable").children("div").children("p");
	editable_lines.each(function(i){
		txt=txt+$(this).text()+"\n";
	});
	
	return txt;	
}

function getCursorNode() {
    var cursorPos;
    if (window.getSelection) {
      var selObj = window.getSelection();
      //var selRange = selObj.getRangeAt(0);
      //cursorPos =  findNode(selObj.anchorNode.parentNode.childNodes, selObj.anchorNode) + selObj.anchorOffset;
      /* FIXME the following works wrong in Opera when the document is longer than 32767 chars */
      if(selObj.anchorNode)
        if(selObj.anchorNode.nodeName == "li")
          return selObj.anchorNode;
        else
          return selObj.anchorNode.parentNode;
      else
        return false;
    }
    // else if (document.selection) {
    //   var range = document.selection.createRange();
    //   var bookmark = range.getBookmark();
    //   /* FIXME the following works wrong when the document is longer than 65535 chars */
    //   //cursorPos = bookmark.charCodeAt(2) - 11; /* Undocumented function [3] */
    //   //alert(cursorPos);
    // }
  }

function logState(a,b){
	$("#state").html(a+","+b);
}

function snapshot(){
	var editable_lines = $("#editable").children("div").children("p");

	//iterate throught all lines in the editable area
	editable_lines.each(function(i){
		stored_lines[$(this).attr('id')]=$(this).text();
	});
	showSL();
}

var globalId=-1;
var generateID = function(){
  //get the pad id
  var padid = "1";
  
  //get the user id
  var userid = "1";

  //get the current timestamp (in UTC)
  var d = new Date();
  var timestamp = $.map([d.getUTCFullYear(), d.getUTCMonth(), d.getUTCDate(),
                   d.getUTCHours(), d.getUTCMinutes(), d.getUTCSeconds(), d.getUTCMilliseconds()], 
                   function(n, i){
                    return (n < 10) ? "0"+n : n; 
                   }).join("");

  //combine them and generate the UUID
  //format: padid_userid_timestamp
	globalId++;
  return padid + "_" + userid + "_" + timestamp + "_" + globalId;
};
function showSL(){
	var s='';
	$.each( stored_lines, function(k, v){
		s+=k+' '+v+'\n';
	 });
	$("#text").text(s);
}