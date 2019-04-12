import { Component, OnInit, Input } from '@angular/core';
import { ItemModel } from '../../res-table/item-model';
import { DetailInfo} from '../detail-info';
import {DetailServiceService } from '../detail-service.service';
import {SimilarItem} from './similar-item';
import { DeviceDetectorService } from 'ngx-device-detector';



@Component({
  selector: 'app-similar',
  templateUrl: './similar.component.html',
  styleUrls: ['./similar.component.css']
})
export class SimilarComponent implements OnInit {
	similarList:SimilarItem[] =[];
  listDup: SimilarItem[] = [];
  len:number = -1;
	sortBy:number = 0;
	order:number = 1;
  displayNum:number = 5;
  isMobile:boolean = false;
  constructor(private _dService: DetailServiceService,
              private deviceService : DeviceDetectorService) {
       const isMobile = deviceService.isMobile();
       console.log("device: ", isMobile);
       this.isMobile = isMobile;
      this._dService.similarListEmitter.subscribe(
        similarList=>{
          this.similarList = [];
          for(var i = 0; i<similarList.length; ++i){
            var imageURL = similarList[i].imageURL ? similarList[i].imageURL : '';
            var title = similarList[i].title ? similarList[i].title : '';
            var buyItNowPrice = (similarList[i].buyItNowPrice && similarList[i].buyItNowPrice.__value__) ? parseFloat(similarList[i].buyItNowPrice.__value__) : -1;
            var shippingCost = (similarList[i].shippingCost && similarList[i].shippingCost.__value__) ? parseFloat(similarList[i].shippingCost.__value__) : -1;
            var timeLeft = similarList[i].timeLeft ? parseInt(this.getDays(similarList[i].timeLeft)) : -1;
            var viewItemURL = similarList[i].viewItemURL ?  similarList[i].viewItemURL : '';
            this.similarList.push(new SimilarItem(imageURL, title, viewItemURL, buyItNowPrice, shippingCost, timeLeft));
          }
          console.log(this.similarList); 
          this.len = this.similarList.length; 
        },
        error=> console.error(error)
      )
   }

  ngOnInit() {
  }
  SortArray(similarList: any[], sortBy: number, order: number){
  	if(sortBy == 1){
        if(order>0){
          similarList.sort((a,b)=> a.title.localeCompare(b.title));  
        }else{
          similarList.sort((a,b)=> b.title.localeCompare(a.title));  
        }
    		
    	}else if(sortBy == 2){
    		if(order>0){
          similarList.sort((a,b)=> a.timeLeft-b.timeLeft);
        }else{
          similarList.sort((a,b)=> b.timeLeft-a.timeLeft);
        }
        
    	}else if(sortBy == 3){
    		if(order>0){
          similarList.sort((a,b)=> a.buyItNowPrice - b.buyItNowPrice);
        }else{
          similarList.sort((a,b)=> b.buyItNowPrice - a.buyItNowPrice);
        }
        
    	}else if(sortBy == 4){
    		if(order>0){
          similarList.sort((a,b)=> a.shippingCost - b.shippingCost);
        }else{
          similarList.sort((a,b)=> b.shippingCost - a.shippingCost);
        }
    	}else if(sortBy == 0){
          if(this.listDup.length == 0){
            // initialization
            for(var i = 0; i<similarList.length;++i){
              this.listDup.push(similarList[i]);
            }
          }
          if(this.listDup.length<=this.displayNum) return this.listDup;
          return this.listDup.slice(0, this.displayNum);
      }
    if(similarList.length<= this.displayNum) return similarList;
    return similarList.slice(0,this.displayNum);
  }
  showmore = false;
  showMore(){
    this.displayNum = this.similarList.length;
    this.showmore = true;
  }
  showLess(){
    this.displayNum = 5;
    this.showmore = false;
  }

  getDays(value: string): string {
    var str  = '';
    for(var i = 0; i<value.length; ++i){
      if(value.charAt(i) == 'D'){
        str = value.slice(1, i);
      }
    }
    return str;
  }

}
