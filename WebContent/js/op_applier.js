var updateQueue = new Array();

function apply(op){
	updateQueue.push(op);
	if(isTyping) update(updateQueue);
	//else alert("couldnt update");
}

function update(queue){
	jQuery.each(queue, function() {
		switch (this._type){
			case 'add':
				alert("Apply "+this._type);
			break
			case 'del':
				alert("Apply "+this._type);
			break
			default:
				alert("Unrecognized Operation.");
			break
		}
	});
}