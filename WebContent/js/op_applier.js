function apply(op,state){
	switch(op._type){
		case "add":{
			
			doc.insert({row: op._args[1], column:op._args[0]},op._args[2],true);
			break;
		}
		case "del":{
			var srow = op._args[1];
			var scolumn = op._args[0];
			var len = doc.$lines[srow].length;
			var delLen=op._args[2];
			var erow=srow;
			var ecolumn=scolumn;
			
			for(ecolumn=scolumn;delLen==0;delLen--){
				if(erow==len) {
					erow=0;
					ecolumn++;
					len=doc.lines[srow].lenght;
				}
				else erow++;
			}
			
			doc.remove({start:{column:scolumn,row:srow},end:{column:ecolumn,row:erow}});
			break;
		}
	}
}