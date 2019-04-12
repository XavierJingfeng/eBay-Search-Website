import { Component, OnInit, Output, EventEmitter, Input} from '@angular/core';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { SearchItem } from './search-item';
import { HttpHeaders } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { map } from "rxjs/operators";

@Injectable({
  providedIn: 'root'
})
export class SubmitFormService {
	_url = "http://localhost:4600/";

	constructor(private _http: HttpClient) { }

	httpOptions = {
		headers: new HttpHeaders({
			'Content-Type':  'application/json',
			'Authorization': 'my-auth-token'
		})
	};

	itemListEmitter : EventEmitter<any> = new EventEmitter();
	zipcodeEmitter : EventEmitter<any> = new EventEmitter();
	clearEmitter : EventEmitter<any> = new EventEmitter();

  submitForm(searchitem: SearchItem, zip: string){
  	searchitem.zip_code = zip;
  	this._http.post(this._url, searchitem, this.httpOptions).subscribe(
  		data => {
  			console.log('service!', data);
  			if(data["findItemsAdvancedResponse"][0].searchResult && data["findItemsAdvancedResponse"][0].searchResult[0].item){
				this.itemListEmitter.emit(data["findItemsAdvancedResponse"][0].searchResult[0].item);  				
  			}else{
  				this.itemListEmitter.emit([]);
  			}

  		},
  		error => console.error(error)
  	)
  	 
	}
	getZipcode(starter: string){
		let starterJSON = {'startwith': starter};
		this._http.post(this._url+'autocomplete', starterJSON, this.httpOptions).subscribe(
			data=>{
				this.zipcodeEmitter.emit(data["postalCodes"]);	
			},
			error => console.error(error)
		)
	}
	getLocalZipcode(){
		let url = 'http://ip-api.com/json';
		return this._http.get(url);
	}
	clear(){
		this.clearEmitter.emit(true);
	}
}
