function apply(op,state){
	switch(op._type){
		case "add":{
			doc.insert({row: op._args[0], column:op._args[1]},op._args[2],true);
			break;
		}
		case "del":{
			var srow = op._args[0];
			var scolumn = op._args[1];
			var len = doc.$lines[srow].length;
			var delLen=op._args[2];
			var erow=srow;
			var ecolumn=scolumn;
			
			for(ecolumn=scolumn;delLen!=0;delLen--){
				if(ecolumn==len) {
					ecolumn=0;
					erow++;
					len=doc.lines[srow].lenght;
				}
				else ecolumn++;
			}
			
			doc.remove(doc.makeRange(srow,scolumn,erow,ecolumn),true);
			break;
		}
	}
}