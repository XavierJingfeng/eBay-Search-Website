import { Component, OnInit, Output, EventEmitter, Input} from '@angular/core';
import { SearchItem } from '../search-form/search-item';
import { ItemModel } from './item-model';
import { SubmitFormService } from '../search-form/submit-form.service';
import { Observable, throwError, of} from 'rxjs';
import { WishlistService } from '../res-wish-list/wishlist.service';
import { DetailServiceService } from '../detail/detail-service.service';


@Component({
  selector: 'app-res-table',
  templateUrl: './res-table.component.html',
  styleUrls: ['./res-table.component.css']
})
export class ResTableComponent implements OnInit {
	
	@Output() wishEmitter = new EventEmitter<any>();
	@Output() itemEmitter = new EventEmitter<any>();

	itemList : ItemModel[] = [];

	pager:number[] = [];
	currPageList: ItemModel[] = [];
	currPage = 0;
	wishList: Set<string>; 
	hasItem: boolean;
	isChosen: number = -1;
	constructor(private _sService : SubmitFormService,
				private _wService: WishlistService,
				private _dService : DetailServiceService) {
			this.hasItem = false;
			this.wishList =  new Set<string>();
		_sService.itemListEmitter.subscribe(
			data =>{
				console.log("in restable",data);
				this.itemList = [];
				this.pager = [];
				this.currPageList = [];
				for(var i = 0; i<data.length; ++i){
					var id = i+1;
					var img = (data[i].galleryURL && data[i].galleryURL[0]) ? data[i].galleryURL[0] : "";
					var title = (data[i].title && data[i].title[0]) ? data[i].title[0]: "N/A";
					var price = (data[i].sellingStatus && data[i].sellingStatus[0]) ? data[i].sellingStatus[0].convertedCurrentPrice[0].__value__ : "N/A";
					

					var shippingCost = (data[i].shippingInfo && 
									data[i].shippingInfo[0] && 
									data[i].shippingInfo[0].shippingServiceCost && 
									data[i].shippingInfo[0].shippingServiceCost[0].__value__) 
									? (data[i].shippingInfo[0].shippingServiceCost[0].__value__ == 0 
											? 'Free Shipping' 
											: '$'+data[i].shippingInfo[0].shippingServiceCost[0].__value__) 
									: "N/A";

					var zip = (data[i].postalCode && data[i].postalCode[0]) ? data[i].postalCode[0]: "N/A";
					var seller = (data[i].sellerInfo && data[i].sellerInfo[0] && data[i].sellerInfo[0].sellerUserName)?data[i].sellerInfo[0].sellerUserName[0] : "N/A";
					var ebayId = data[i].itemId[0];
					var subtitle = (data[i].subtitle && data[i].subtitle[0]) ? data[i].subtitle[0] : "";
					// shipping info;
					var shippingLocation = (data[i].shippingInfo && data[i].shippingInfo[0] && data[i].shippingInfo[0].shipToLocations) ? data[i].shippingInfo[0].shipToLocations[0]: "";
					var handlingTime = (data[i].shippingInfo && data[i].shippingInfo[0] && data[i].shippingInfo[0].handlingTime)? data[i].shippingInfo[0].handlingTime[0] : "";
					var expeditedShipping = (data[i].shippingInfo && data[i].shippingInfo[0].expeditedShipping) ? data[i].shippingInfo[0].expeditedShipping[0]: "";
					var onedayShipping = (data[i].shippingInfo && data[i].shippingInfo[0].oneDayShippingAvailable)?data[i].shippingInfo[0].oneDayShippingAvailable[0] : "";
					var returnAccepted = (data[i].returnsAccepted) ? data[i].returnsAccepted[0] : "";
					var viewItemURL = (data[i].viewItemURL && data[i].viewItemURL[0]) ? data[i].viewItemURL[0] : ''; 
					
					this.itemList.push(new ItemModel(id ,img, title, price, shippingCost, zip, seller, ebayId, subtitle,
						shippingLocation, handlingTime, expeditedShipping, onedayShipping, returnAccepted, viewItemURL));
				}
				for(var i = 0; i<data.length; i+=10){
					this.pager.push(i/10);
				}

				
				this.currPage = 0;
				this.isChosen = -1;
				this.setPage(this.currPage);
				console.log("items",this.itemList);
				
			},
			error => {
				console.error(error);
			}
		)
		_sService.clearEmitter.subscribe(
			data=>{
				if(data){
					this.currPage = 0;
					this.currPageList = [];
					this.pager = [];
					this.itemList = [];
					//this.wishList = new Set;
					this.hasItem = false;
					this.isChosen = -1;
				}
			}
		)
		// wishService.itemIdEmitter.subscribe(
		// 	item=>{
				
		// 		this.setPage(this.currPage);
		// 	}
		// )
		_dService.itemEmitter.subscribe(
			item=>{
				if(item != undefined){
					
					this.hasItem = true;
					this.isChosen = item.ebayId;
				}
			}
		)
		_wService.deleteItemEmitter.subscribe(
			ebayId=>{
				this.wishList.delete(ebayId);
			}
		)
		_wService.addItemEmitter.subscribe(
			item=>{
				this.wishList.add(item.ebayId);
			}
		)

	}


	showDetails(){
		this._wService.slide.emit('left');
	}

	setPage(page: number){
		this.currPageList = this.itemList.slice(page*10, (page+1)*10);
		this.currPage = page;
		console.log(this.currPage);
	}

	addToWishList(item: ItemModel){
		//console.log("this", item);
		//this.itemList[itemNum-1].isWished=true;
		//this.wishEmitter.emit(this.itemList[itemNum-1]);
		//this.wishService.addItem(item);
		localStorage.setItem(item.ebayId, JSON.stringify(item));
		this.wishList.add(item.ebayId);
		this._wService.addItem(item);
	}

	deleteFromWishList(item: ItemModel){
		//this.itemList[itemNum-1].isWished=false;
		//this.wishEmitter.emit(this.itemList[itemNum-1]);
		//this.wishService.deleteItem(item);
		localStorage.removeItem(item.ebayId);
		this.wishList.delete(item.ebayId);
		this._wService.deleteItem(item.ebayId);
	}

	searchItemDetail(item: ItemModel){
		this._dService.searchItemDetail(item);
		this.showDetails();
	}

	// isWished(ebayId: string):any{
	// 	let item =  JSON.parse(localStorage.getItem(ebayId));
	// 	return item && (item.ebayId == ebayId);
	// }

	
	ngOnInit() {

	}	

}
