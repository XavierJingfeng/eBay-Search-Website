import { Component, OnInit, Input } from '@angular/core';
import { ItemModel } from '../../res-table/item-model';
import { DetailInfo} from '../detail-info';


@Component({
  selector: 'app-shipping',
  templateUrl: './shipping.component.html',
  styleUrls: ['./shipping.component.css']
})
export class ShippingComponent implements OnInit {
	@Input() item: ItemModel;
	@Input() detail: DetailInfo;
  constructor() { }
  getDays(handlingTime:string):string{
  	var days = parseInt(handlingTime);
  	if(days == NaN) return '';
  	if(days>1){
  		return handlingTime+" Days";
  	}else{
  		return handlingTime+" Day";
  	}
  }

  ngOnInit() {
  }

}
