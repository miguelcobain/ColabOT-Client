//MAIN

var WS;
var myMsgs;
var otherMsgs;
var notAcknowleged;

$(document).ready(function() {

	//Run binders
	$("#editable").bind("keydown", detector);
	
	//initialize state
	myMsgs=0;
	otherMsgs=0;
	notAcknowleged=new Array();

	WS = new WebS("ws://localhost:8000");
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

