import { Component, OnInit, Output, EventEmitter, Input} from '@angular/core';
import { trigger, state, style, transition, animate } from '@angular/animations';
import { SubmitFormService } from '../search-form/submit-form.service';
import { DetailServiceService } from '../detail/detail-service.service';
import { ItemModel } from '../res-table/item-model';
import { WishlistService } from '../res-wish-list/wishlist.service';

@Component({
  selector: 'app-res-container',
  templateUrl: './res-container.component.html',
  styleUrls: ['./res-container.component.css'],
  animations: [
  	trigger("slide_panel", [
  		transition("left=>*", [
  			animate('.3s ease-out', style({transform: 'translateX(-100%)'}))
  			]),
  		transition("right=>*", [
  			animate('.3s ease-out', style({transform: 'translateX(100%)'}))

  			]),
  		])
  	]
})
export class ResContainerComponent implements OnInit {

	constructor(private _sService : SubmitFormService, private detailService : DetailServiceService, private wishListService: WishlistService) { 
		// setup callback function to receive message from the server
		_sService.itemListEmitter.subscribe(
			data=>{
				this.showProgressbar = true;
				this.clear = true;
				setTimeout(()=>{
					this.showProgressbar = false;
					console.log("search", this.showProgressbar);
		      	}, 1000);
			},
			error=> console.error(error)
		)
		_sService.clearEmitter.subscribe(
			data=>{
				this.clear = !data;
				this.showItemList();
			}
		)
		wishListService.slide.subscribe(
			data=>{
				this.showProgressbar =true;
				this.active = data;
				this.clear = true;
				console.log("slide", this.active);
				setTimeout(()=>{
		        	this.showProgressbar = false;
		        	console.log("wish", this.showProgressbar);
		      	}, 1000);
			}
		)
	}
	active = 'right';
	clear = false;
	isShowItemList = true;
	itemListClass = "btn-dark btn btn-lg px-4";
	wishListClass = "btn-light btn btn-lg px-3";
	showProgressbar = true;
	
	showItemList(){
		this.isShowItemList = true;
		this.active = 'right';
		this.itemListClass = "btn-dark btn btn-lg px-4";
		this.wishListClass = "btn-light btn btn-lg px-3";

	}
	showWishList(){
		this.isShowItemList = false;
		this.active = 'right';
		this.itemListClass = "btn-light btn btn-lg px-4";
		this.wishListClass = "btn-dark btn btn-lg px-3";
		
	}

	ngOnInit() {
}

}
