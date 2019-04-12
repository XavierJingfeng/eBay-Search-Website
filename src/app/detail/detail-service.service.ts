import { Injectable } from '@angular/core';
import { Component, OnInit, Output, EventEmitter, Input} from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { HttpHeaders } from '@angular/common/http';
import { ItemModel } from '../res-table/item-model';
@Injectable({
  providedIn: 'root'
})
export class DetailServiceService {
	_urlSearchDetail = "http://localhost:4600/itemdetail";
	_urlSearchSimilar = "http://localhost:4600/similar";
  _urlSearchPhotos = "http://localhost:4600/photos";

	httpOptions = {
		headers: new HttpHeaders({
		'Content-Type':  'application/json',
		'Authorization': 'my-auth-token'
	})
	};
  constructor(private _http : HttpClient) { 

  }
  @Output() itemDetailEmitter = new EventEmitter<any>();
  @Output() itemEmitter = new EventEmitter<any>();
  @Output() wishEmitter = new EventEmitter<ItemModel>();
  @Output() similarListEmitter = new EventEmitter<any>();
  @Output() photosEmitter = new EventEmitter<any>();

  searchItemDetail(item: ItemModel){
  	console.log(item.ebayId);
  	let itemIdJSON = {"itemId" : item.ebayId};
  	this._http.post(this._urlSearchDetail, itemIdJSON, this.httpOptions).subscribe(
  		itemDetail=>{
  			this.itemDetailEmitter.emit(itemDetail["Item"]);
        if( itemDetail["Item"] != undefined) this.itemEmitter.emit(item);
  		},
  		error=> console.error(error)
  	)
  }
  searchSimilarItem(item: ItemModel){
    let itemIdJSON = {"itemId" : item.ebayId};
  	this._http.post(this._urlSearchSimilar, itemIdJSON, this.httpOptions).subscribe(
      similarList=>{
        // check if there is similar items
         console.log(similarList);
        let similarItems = (similarList["getSimilarItemsResponse"] 
                            && similarList["getSimilarItemsResponse"]["itemRecommendations"] 
                            && similarList["getSimilarItemsResponse"]["itemRecommendations"]["item"]) ? 
                             similarList["getSimilarItemsResponse"]["itemRecommendations"]["item"] : 
                             [];
        this.similarListEmitter.emit(similarItems);
      },
      error=> console.error(error)
      )
  }
  searchPhotos(item: ItemModel){
    let itemTitleJSON = {"itemTitle" : item.title};
    this._http.post(this._urlSearchPhotos, itemTitleJSON, this.httpOptions).subscribe(
      photos=>{
        this.photosEmitter.emit(photos["items"]);
      },
      error=> console.error(error)
      )
  }
}
