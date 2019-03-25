function storageList(listName){
	this.name = listName;
	this.storageOK=(typeof(Storage) !== "undefined");
	this.listArr = [];
	this.init = function(){
		if (localStorage.getItem(listName)== null)
			localStorage[listName]= JSON.stringify(this.listArr);
		else {
			var vList = localStorage[listName];
			if(vList!=""){
				this.listArr = JSON.parse(vList);
			}
		}
	},
	this.changeOrders=function(data,srcProp,destProp){
		//{id:sourceId,order:destOrder,id:targetId,order:srcOrder}
		if(this.storageOK){
			let todos = null;
			if (localStorage.getItem(this.name)!= null){
				var vList = localStorage[listName];
				if(vList!=""){
					todos = JSON.parse(vList);
				}
			}
			if(todos!=null){
				data.forEach(function(x,i){
					todos.forEach(function(y,j){
						if(x[srcProp] == y[srcProp]){
							y[destProp] = x[destProp];
						}
					});
				});
				localStorage[this.name] = JSON.stringify(todos);	
			}			
		}
	}
	this.add=function(data,key){
		if(this.storageOK){
			if (localStorage.getItem(this.name)!= null){
				var vList = localStorage[listName];
				if(vList!=""){
					this.listArr = JSON.parse(vList);
				}
			}
			let offset = -1;
			this.listArr.forEach(function(x,i){
				if(x[key] == data[key]){
					offset = i;
				}
			});
			if(offset !=-1){
				this.listArr.splice(offset, 1,data);
			}else{
				this.listArr.push(data);
			}
			localStorage[this.name] = JSON.stringify(this.listArr);				
		}
	}
	this.remove=function(data,key){
		if(this.storageOK){
			if (localStorage.getItem(this.name)!= null){
				this.listArr = JSON.parse(localStorage[this.name]);
			}
			let offset = -1;
			this.listArr.forEach(function(x,i){
				if(x[key] == data[key]){
					offset = i;
				}
			});
			if(offset !=-1){
				this.listArr.splice(offset, 1);
				localStorage[this.name] = JSON.stringify(this.listArr);				
			}
		}
	}
	this.addall=function(arr){
		this.removeall();
		this.listArr = arr;
		localStorage[this.name] = JSON.stringify(this.listArr);				

	}
	this.removeall=function(){
		 localStorage.removeItem(this.name);
	}
	this.count=function(){
		if (localStorage.getItem(this.name)!= null){
			this.listArr= JSON.parse(localStorage[this.name]);
		}
		return this.listArr.length;
		
	}
	this.getList=function(){
		this.listArr = [];
		if (localStorage.getItem(this.name)!= null){
			this.listArr= JSON.parse(localStorage[this.name]);
		
			this.listArr.forEach(function(x){
				if(x.childrenNr == undefined){
					x.childrenNr =0;
				}
				if(x.childrenList== undefined){
					x.childrenList = [];
				}
				if(x.parentId == undefined){
					x.parentId =0;
				}
				x.editModeTitle=false;
				x.editModeSummary=false;
			});
			let list = this.listArr.filter(function(x){
				return x.parentId == 0;	
			});
			let secondList = this.listArr.filter(function(x){
				return x.parentId != 0;	
			});
			list.sort(function(a,b){
				return a.order < b.order ? 1:-1;	
			});
			
			list.forEach(function(x){
				x.childrenList = [];
				x.childrenNr = 0;	
				if(secondList.length>0){
					secondList.forEach(function(y){
						if(y.parentId == x.id){
							x.childrenNr +=1;
							x.childrenList.push(y);
						}
					});
				}
			});
			this.listArr = list;
		}
			return this.listArr;
	  }
	this.init();
}