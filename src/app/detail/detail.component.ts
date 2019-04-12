import { Component, OnInit, EventEmitter, Output} from '@angular/core';
import { ItemModel } from '../res-table/item-model';
import { DetailServiceService} from './detail-service.service';
import { DetailInfo} from './detail-info';
import { Itemspec } from './itemspecs';
import { SubmitFormService }  from '../search-form/submit-form.service';
import { WishlistService } from '../res-wish-list/wishlist.service';
import { DeviceDetectorService } from 'ngx-device-detector';

import { ProductComponent } from './product/product.component';
import { PhotosComponent } from './photos/photos.component';
import { SellerComponent } from './seller/seller.component';
import { ShippingComponent } from './shipping/shipping.component';
import { SimilarComponent } from './similar/similar.component';


@Component({
  selector: 'app-detail',
  templateUrl: './detail.component.html',
  styleUrls: ['./detail.component.css']
})


export class DetailComponent implements OnInit {
    detail : DetailInfo = new DetailInfo([], '', '', -1, -1, false,'', '');
    deviceInfo: any;
    similarTag = 'Similar Products';
    item = new ItemModel(-1 ,'', '', '', '', '', '',  "", "", "", "", "", "", "", "");  
    ItemSpecifics: Itemspec[] = [];
    photos = [];
    col1 = this.photos.slice(0, 2);
    col2 = this.photos.slice(3, 5);
    col3 = this.photos.slice(6, 8);
    Loading = true;
    isWished:boolean;
    currTag = "product";
    isMobile = false;
  	constructor(private _dService : DetailServiceService,
                private _sService : SubmitFormService,
                private _wService : WishlistService,
                private deviceService : DeviceDetectorService) { 
        console.log(deviceService.getDeviceInfo());
        const isMobile = deviceService.isMobile();
        this.isMobile = isMobile;
        if(isMobile){
           this.similarTag = 'Related';        }
      this._dService.itemDetailEmitter.subscribe(
          detail=>{
            console.log("receive", detail);
            if(detail == undefined) {
              this.Loading = false;
              return ; 
            }
            this.ItemSpecifics = [];
            var PictureURL = [];
            for(var i = 0; i<detail.PictureURL.length; ++i){
              PictureURL.push(detail.PictureURL[i]);
            }
            var location = (detail.Location) ? detail.Location : "";
            var returnPolicy = (detail.ReturnPolicy && detail.ReturnPolicy.ReturnsAccepted) ? detail.ReturnPolicy.ReturnsAccepted : "";
            returnPolicy +=  (detail.ReturnPolicy && detail.ReturnPolicy.ReturnsWithin) ? detail.ReturnPolicy.ReturnsWithin : "";
            //var ItemSpecifics = [];
            if(detail.ItemSpecifics && detail.ItemSpecifics.NameValueList){
              for(var j = 0; j<detail.ItemSpecifics.NameValueList.length; ++j){
                var name = detail.ItemSpecifics.NameValueList[j].Name;
                var value = detail.ItemSpecifics.NameValueList[j].Value[0];
                var itemspec = new Itemspec(name, value);
                this.ItemSpecifics.push(itemspec);
              }  
            }
            
            var feedbackScore = (detail.Seller && detail.Seller.FeedbackScore) ? detail.Seller.FeedbackScore : -1;
            var PositiveFeedbackPercent = (detail.Seller && detail.Seller.FeedbackScore) ? detail.Seller.PositiveFeedbackPercent : -1;
            var TopRatedSeller = (detail.Seller &&  detail.Seller.TopRatedSeller) ? detail.Seller.TopRatedSeller : undefined;
            var StoreName = (detail.Storefront && detail.Storefront.StoreName)? detail.Storefront.StoreName : "";
            var StoreURL = (detail.Storefront && detail.Storefront.StoreURL)? detail.Storefront.StoreURL : "";
            this.detail = new DetailInfo(PictureURL, location, returnPolicy, feedbackScore, PositiveFeedbackPercent, TopRatedSeller, StoreName, StoreURL);
            console.log(this.detail);
            this.Loading = false;
          },
          error=> console.error(error)
        )
      this._dService.itemEmitter.subscribe(
          item=>{
             this.item = item;
             console.log(this.item);
             this.isWished = localStorage.getItem(this.item.ebayId) ? true : false;
          },
          error=> console.error(error)
        )

      this._dService.photosEmitter.subscribe(
        photos=>{
          this.photos = [];
          for(var i = 0; i<photos.length; ++i){
            this.photos.push(photos[i]);
          }
          console.log(this.photos);
          console.log("col1: ",this.col1);
          console.log("col2: ",this.col2);
          console.log("col3: ",this.col3);
        },
        error=> console.error(error)
      )
      this._sService.clearEmitter.subscribe(
        data=>{
          this.detail =  new DetailInfo([], '', '', -1, -1, false,'', '');
          this.item = new ItemModel(-1 ,'', '', '', '', '', '', "", "", "", "", "", "", "", "");  
          this.ItemSpecifics = [];
          this.photos = [];
          this.col1 = this.photos.slice(0, 2);
          this.col2 = this.photos.slice(3, 5);
          this.col3 = this.photos.slice(6, 8);
          this.currTag = "product";
        }
        )
      this._wService.addItemEmitter.subscribe(
        item=>{
          if(item.ebayId == this.item.ebayId){
            this.isWished = true;
          }
        }
      )
      this._wService.deleteItemEmitter.subscribe(
        ebayId=>{
          if(ebayId == this.item.ebayId){
            this.isWished = false;
          }
        }
      )
    }
  	@Output() slide = new EventEmitter<string>();
    
  	slideDetail(){
  		this._wService.slide.emit("right");
  	}

    addToWishList(){
      localStorage.setItem(this.item.ebayId, JSON.stringify(this.item));
      this._wService.addItem(this.item);
      //this._dService.addToWishList(this.item);
    }
    deleteFromWishList(){
      localStorage.removeItem(this.item.ebayId);
      this._wService.deleteItem(this.item.ebayId);
      //this._dService.deleteFromWishList(this.item);
    }
    setCurrTag(tag: string){
      this.currTag = tag;
      if(tag == 'photos'){
        this._dService.searchPhotos(this.item);
      }else if(tag == 'similar'){
        this._dService.searchSimilarItem(this.item);
      }
      console.log("currTag:", this.currTag);
      console.log("photos", this.photos);
    }

    facebook(){
       let _url = 'https://www.facebook.com/sharer/sharer.php?u='+this.item.viewItemURL+'&quote=Buy '+this.item.title+' at'+' $'+this.item.price+' from link below';
      window.open(_url);
      return false;
    }
    // isWished():boolean{
    //   let item = JSON.parse(localStorage.getItem(this.item.ebayId)); 

    //   return item && (this.item.ebayId == item.ebayId);
    // }
	ngOnInit() {
    
	}

}
