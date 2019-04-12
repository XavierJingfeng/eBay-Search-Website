import { Inject,Injectable} from '@angular/core';
import { ItemModel } from '../res-table/item-model';
import { Component, OnInit, Output, EventEmitter, Input} from '@angular/core';
import { ResTableComponent } from '../res-table/res-table.component';
import { Subject } from "rxjs";
import { LOCAL_STORAGE, StorageService } from 'angular-webstorage-service';
@Injectable({
  providedIn: 'root'
})
export class WishlistService {
	totalcost: number = 0;
	//@Output() wishListEmitter = new EventEmitter<any>();
	//@Output() totalcostEmiter = new EventEmitter<any>();
	@Output() deleteItemEmitter = new EventEmitter<any>();
	@Output() addItemEmitter = new EventEmitter<any>();
	//@Output() itemIdEmitter = new EventEmitter<any>();
	@Output() slide = new EventEmitter<any>();
	
	constructor(@Inject(LOCAL_STORAGE) private storage: StorageService) { 
		
	}
	//wishList: Map<string, ItemModel> = new Map();
	
	deleteItem(ebayId: string){
		
		//let item = this.wishList.get(itemId);
		
		//this.wishList.delete(itemId);
		//localStorage.removeItem(item.ebayId);
		//this.wishList.delete(item.ebayId);
		//if(this.totalcost>0) this.totalcost -= parseFloat(item.price);
		this.deleteItemEmitter.emit(ebayId);
		//this.totalcostEmiter.emit(this.totalcost);
		//this.itemIdEmitter.emit(item);
	}
	addItem(item: ItemModel){
		//localStorage.setItem(item.ebayId, JSON.stringify(item));
		//console.log("add an item", localStorage);
		//this.wishList.set(item.ebayId, item);
		//this.totalcost+= parseFloat(item.price);
		//this.wishListEmitter.emit(this.wishList);
		//this.totalcostEmiter.emit(this.totalcost);
		//this.itemIdEmitter.emit(item);
		this.addItemEmitter.emit(item);
	}
	

	// clearAll(){
	// 	this.totalcost = 0;
	// 	this.wishList = new Map();
	// 	this.wishListEmitter.emit(this.wishList);
	// 	this.totalcostEmiter.emit(this.totalcost);
	// }
	
  

}
