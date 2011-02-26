var localType;
var isTyping = false;

function detector(ev)  {
		typeWatch(ev);
		switch(ev.data.action){
			case "insertText":{
				var op = new OP('add',[ev.data.range.start.column,ev.data.range.start.row,ev.data.text]);
				socket.sendOP([op],0,0);
				break;
			}
			case "removeText":
				var op = new OP('del',[ev.data.range.start.column,ev.data.range.start.row,ev.data.text.length]);
				socket.sendOP([op],0,0);
				break;
		}
}

function typeWatch(e) {
	if(!isTyping){
		isTyping=true;
		started(e);
	}

	if (localType) {
		clearTimeout(localType);
	}

	localType = setTimeout(function() {
		finished(e);
		isTyping=false;
	}, 600);
}



// Event fired when the user starts typing
function started(ev) {
	
}

// Event fired after a timeout since the user stops typing
function finished(ev) {
}