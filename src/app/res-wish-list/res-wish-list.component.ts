import { Component, OnInit, Output, EventEmitter, Input} from '@angular/core';
import { ItemModel } from '../res-table/item-model';
import { DetailComponent } from '../detail/detail.component';
import { WishlistService } from './wishlist.service';
import { DetailServiceService } from '../detail/detail-service.service';
import { SubmitFormService } from '../search-form/submit-form.service';

@Component({
  selector: 'app-res-wish-list',
  templateUrl: './res-wish-list.component.html',
  styleUrls: ['./res-wish-list.component.css']
})
export class ResWishListComponent implements OnInit {
  
  wishMap: Map<string, ItemModel> = new Map();
  wishList: ItemModel[] = [];
  totalcost : number = 0;
  hasItem: boolean;
  isChosen:number = -1;
  constructor(private wishService : WishlistService,
              private _dService : DetailServiceService) {
        //  localStorage.setItem("1", 'one');
        console.log(localStorage);
        this.load();
        //localStorage.clear();
        this.hasItem = false;
        this.isChosen = -1;
      
      wishService.addItemEmitter.subscribe(
        item=>{
            this.wishMap.set(item.ebayId, item);
            this.wishList.push(item);
            this.totalcost += parseFloat(item.price);
            console.log(this.wishMap);
        },
        error => console.error(error)
        );
      wishService.deleteItemEmitter.subscribe(
        ebayId=>{
          console.log("get: ",this.wishMap.get(ebayId));
          // detete item from list!!!!
          for(var i = 0; i<this.wishList.length; ++i){
            if(this.wishList[i].ebayId == ebayId) this.wishList.splice(i,1);
          }
          let cost = parseFloat(this.wishMap.get(ebayId).price); 
          this.wishMap.delete(ebayId);
          this.totalcost -= cost;
          console.log(this.totalcost);
        },
        error => console.error(error)
        );
      _dService.itemEmitter.subscribe(
      item=>{
        if(item != undefined){
          this.hasItem = true;
          this.isChosen = item.ebayId;
         
        }
      }
    )
     
  }
  showDetails(){
		this.wishService.slide.emit('left');
	}
  removeItem(ebayId: string){
    localStorage.removeItem(ebayId);
    //this.wishList.delete(ebayId);
    this.wishService.deleteItem(ebayId);

  }
  getKeys():any[]{
    console.log("get keys", Array.from(this.wishMap));
    return Array.from(this.wishMap);
  }
  searchItemDetail(itemId: string){
    let item = this.wishMap.get(itemId);
    console.log("wishList search", item);
    this._dService.searchItemDetail(item);
    this.showDetails();
  }
  // clearAll(){
  //   this.wishService.clearAll();
  // }
  load(){
    if(localStorage.length == 0) return;
    for(var key in localStorage){
        var item = JSON.parse(localStorage.getItem(key));
        if(item === null) continue;
        console.log(item);
        console.log(item.id);
        var id = item.id;
        var imageURL =  item.imageURL;
        var title = item.title;
        var price  = item.price;
        var shippingCost = item.shippingCost;
        var zip = item.zip;
        var seller = item.seller;
        var ebayId = item.ebayId;
        var subtitle = item.subtitle;
        var shippingLocation = item.shippingLocation;
        var handlingTime = item.handlingTime;
        var onedayShipping = item.onedayShipping;
        var expeditedShipping = item.expeditedShipping;
        var returnAccepted = item.returnAccepted;
        var viewItemURL = item.viewItemURL;
        var model = new ItemModel(id,imageURL, title, price, shippingCost, 
                                                zip, seller, ebayId, subtitle, shippingLocation, handlingTime,
                                                onedayShipping, expeditedShipping, returnAccepted, viewItemURL);
        this.wishMap.set(ebayId, model);
        this.wishService.addItem(model);
        this.totalcost+=parseFloat(item.price);
        this.wishList.push(model); 
    }
  }
  ngOnInit() {
  }

}
