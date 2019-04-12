import { Component, OnInit, Input } from '@angular/core';
import { ItemModel } from '../../res-table/item-model';
import { DetailInfo} from '../detail-info';


@Component({
  selector: 'app-photos',
  templateUrl: './photos.component.html',
  styleUrls: ['./photos.component.css']
})
export class PhotosComponent implements OnInit {
@Input() col1:[];
@Input() col2:[];
@Input() col3:[];
@Input() photos:[];
  constructor() { }

  ngOnInit() {
  }

}
