import { Component, OnInit, Input, NgModule } from '@angular/core';
import { ItemModel } from '../../res-table/item-model';
import { DetailInfo} from '../detail-info';

import {RoundProgressModule} from 'angular-svg-round-progressbar';
@Component({
  selector: 'app-seller',
  templateUrl: './seller.component.html',
  styleUrls: ['./seller.component.css']
})
@NgModule({
  imports: [RoundProgressModule]
})
export class SellerComponent implements OnInit {
	@Input() item: ItemModel;
	@Input() detail: DetailInfo;
  current : number = 0;
  max : number = 100;
  color : string = '#228B22';
  radius:number = 15;
  stroke:number = 1;
  constructor() { }

  ngOnInit() {
  }
  getStarColor(rating: number){
  	if(rating>=10 && rating <50){
  		return '#FFFF00';
  	}else if(rating>=50 && rating <100){
  		return '#0000FF';
  	}else if(rating>=100 && rating <500){
  		return '#40E0D0';
  	}else if(rating>=500 && rating <1000){
  		return '#800080';
  	}else if(rating>=1000 && rating <5000){
  		return '#FF0000';
  	}else if(rating>=5000 && rating <10000){
  		return '#008000';
  	}else if(rating>=10000 && rating <25000){
  		return '#FFFF00';
  	}else if(rating>=25000 && rating <50000){
  		return '#40E0D0';
  	}else if(rating>=50000 && rating <100000){
  		return '#800080';
  	}else if(rating>=100000 && rating <500000){
  		return '#FF0000';
  	}else if(rating>=500000 && rating <1000000){
  		return '#008000';
  	}else if(rating>=1000000){
  		return '#C0C0C0';
  	}
  }
  goStore(url: string){
  	window.open(url);
    return false;
  }
}
