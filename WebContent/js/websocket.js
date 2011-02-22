function WebS(_url){
	this.url=_url;
	this.socket=null;
	this.connect=_connect;
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
			//var received_msg = evt.data;
		};
		this.socket.onclose = function() {
			// websocket is closed.
		};
	    alert("WebSockets supported here!rnrnBrowser: " + navigator.appName + " " + navigator.appVersion + "rnrntest by jimbergman.net (based on Google sample code)");
	}
	else{
		// the browser doesn't support WebSockets
	    alert("WebSockets NOT supported here!rnrnBrowser: " + navigator.appName + " " + navigator.appVersion + "rnrntest by jimbergman.net (based on Google sample code)");
	}
}

function _close(){
	this.socket.disconnect();
}

function _sendOP(op){
	this.socket.postMessage(JSON.stringify({operation: [obj,obj]}));
}

function _toString(){
	return "hahahaha";
}



// -----

function OP(type,args){
	this._type=type;
	this._args=args;
}
var obj = new OP("add",[1,"asdf"]);

var WS = new WebS("ws://localhost");
//WS.connect();
//WS.sendOP(obj);
var ops = new Array();
ops[0]=obj;
ops[1]=obj;

var state= new Array()
state[0]=11;
state[1]=2;


alert(JSON.stringify({msg: [{operation: ops}, {status: state}]}));