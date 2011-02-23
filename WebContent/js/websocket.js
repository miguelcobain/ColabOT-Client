function WebS(_url){
	this.url=_url;
	this.socket=null;
	this.connect=_connect;
	this.sendOP=_sendOP;
	this.close=_close;
	//this.toString=_toString;
}

function _connect(){
	if ("WebSocket" in window){
		// Google example code
	    this.socket = new WebSocket(this.url);
		this.socket.onopen = function(){
			// Web Socket is connected. You can send data by send() method
		};
		this.socket.onmessage = function (evt) {
			var msg = jQuery.parseJSON(evt.data);
			var ops = msg.msg[0].operation;
			var state = msg.msg[1].state;
			
			jQuery.each(ops, function() {
				var op = new OP(this._type,this._args);
				logReceived(op);
			});
			
			receive(ops,state);
		};
		this.socket.onclose = function() {
			// websocket is closed.
		};
	    //alert("WebSockets supported here!rnrnBrowser: " + navigator.appName + " " + navigator.appVersion + "rnrntest by jimbergman.net (based on Google sample code)");
	}
	else{
		// the browser doesn't support WebSockets
	    alert("WebSockets NOT supported here!rnrnBrowser: " + navigator.appName + " " + navigator.appVersion + "rnrntest by jimbergman.net (based on Google sample code)");
	}
}

function _close(){
	this.socket.disconnect();
}

function _sendOP(ops, myMsgs, otherMsgs){
	jQuery.each(ops, function() {
		logSent(this);
	});
	

	var state= new Array()
	state[0]=myMsgs;
	state[1]=otherMsgs;


	//alert(JSON.stringify({msg: [{"operation": ops}, {"state": state}]}));
	this.socket.send(JSON.stringify({msg: [{"operation": ops}, {"state": state}]}));
}

function _toString(){
	return "";
}



// -----

function OP(type,args){
	this._type=type;
	this._args=args;
	this.toString=_toString;
}

function _toString(){
	return this._type+"("+this._args.join(',')+")";
}

function logSent(op){
	$("#sent").append("<p>"+op.toString()+"</p>");
	$("#sent").attr({ scrollTop: $("#sent").attr("scrollHeight") });
}

function logReceived(op){
	$("#received").append("<p>"+op.toString()+"</p>");
	$("#received").attr({ scrollTop: $("#received").attr("scrollHeight") });
}

