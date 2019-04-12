import { Component, OnInit, Input } from '@angular/core';
import { ItemModel } from '../../res-table/item-model';
import { DetailInfo} from '../detail-info';
import { Itemspec } from '../itemspecs';
import { DetailServiceService } from '../detail-service.service';

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.css']
})
export class ProductComponent implements OnInit {
  @Input() item: ItemModel;
  @Input() detail: DetailInfo;
  @Input() ItemSpecifics: Itemspec;
  pictureArray : any[] = [];
  
  active = "carousel-item active";
  disactive = "carousel-item";

  constructor() {
  }
  cursor = 0;
  


  ngOnInit() {

  }

}
