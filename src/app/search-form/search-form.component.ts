import { Component, OnInit, Output, EventEmitter, Input} from '@angular/core';
import { FormControl,Validators} from '@angular/forms';
import { SearchItem } from './search-item';
import { SubmitFormService } from './submit-form.service';
import { HttpClient } from '@angular/common/http';
import { HttpHeaders } from '@angular/common/http';
import { Observable, throwError, of} from 'rxjs';
import { map, startWith } from "rxjs/operators";


@Component({
  selector: 'app-search-form',
  templateUrl: './search-form.component.html',
  styleUrls: ['./search-form.component.css']
})
export class SearchFormComponent implements OnInit {

  constructor(private _http: HttpClient,
              private _sService: SubmitFormService)
  { 
      this.SearchItem = new SearchItem('', 0, false, false, false, false, false, 10, "1", '');
      this._sService.getLocalZipcode().subscribe(
        data=>{
          console.log(data["zip"]);
          this.curZip = data["zip"];
        }
      )
  }
  zipControl = new FormControl({value:'', disabled: true},Validators.required);
  keywordControl = new FormControl('', Validators.required);
  zipcodeList: Observable<string[]>;
  category_types = [{name:'All Categories', value:0},
  					{name:'Art', value:550},
  					{name:'Baby', value:2984},
  					{name:'Books', value:267},
  					{name:'Clothing, Shoes & Accessories', value:11450},
  					{name:'Computers/Tablets & Networking', value:58058},
  					{name:'Health & Beauty', value:26395},
  					{name:'Music', value:11233},
  					{name:'Video Games & Consoles', value:1249}];
  
    _url = "http://localhost:4600/";
    httpOptions = {
      headers: new HttpHeaders({
      'Content-Type':  'application/json',
      'Authorization': 'my-auth-token'
    })};
    curZip = '';
  	SearchItem : SearchItem;   
    itemList : any[];
    itemListEmitter : EventEmitter<any> = new EventEmitter();
    isZipDisable = true;
    newSearch(){
      this.SearchItem = new SearchItem('', 0, false, false, false, false, false, 10, "1", '');
      this.zipControl.reset();
      this.zipControl.setValue("");
      this.keywordControl.reset();
      this.keywordControl.setValue("");
      this._sService.clear();
    }
  	onSubmit() : any{

      this.SearchItem.keyword = String(this.keywordControl.value);
      if(this.SearchItem.distance_option == '1') {
        console.log(this.SearchItem.distance_option);
        return this._sService.submitForm(this.SearchItem, this.curZip);  
      }else{
        console.log(this.SearchItem.distance_option);
        return this._sService.submitForm(this.SearchItem, this.validZip());  
      }
  	}
    resetzip(){
      this.zipControl.reset();
      this.zipControl.setValue("");
      this.zipControl.disable();
    }
    enableZip(){
      this.zipControl.enable();
    }
    validZip():string{
      if(this.SearchItem.distance_option == '1'){
        return '';
      }else if(this.SearchItem.distance_option == '2'){
        var regex = /^\d{5}$/;
        if(regex.test(String(this.zipControl.value))){
          return String(this.zipControl.value);
        }else{
          
          return '';
        }
      }
      return '';
    }
    isEmptyZip(){
      
      var s = String(this.zipControl.value);
      return s.trim() == '';
    }
    
    isEmptyKeyword(){
      var s = String(this.keywordControl.value);
      
      return s.trim() == '';
    }

    validForm(){
      if(this.SearchItem.distance_option == '1'){
        return !this.isEmptyKeyword() && this.curZip!='';
      }else{
        return (this.validZip() !='') && !this.isEmptyKeyword() && this.curZip!='';
      }
    }

	ngOnInit() {
    this.zipcodeList =  this.zipControl.valueChanges
    .pipe(
          startWith(''), 
          map(zip=> this._getZip(zip))
        );
	}
  private _getZip(zip: string): string[]{
      console.log(this.zipControl);
      var zipcode = String(zip);
      var List = [];
      if(zipcode.trim() != ''){
        this._sService.getZipcode(zipcode);
      this._sService.zipcodeEmitter.subscribe(
        data=>{
          for(var i = 0; i<data.length; ++i){
            List[i] = (data[i]["postalCode"]);
          }
        },
        error => console.error(error)
        )
      }
      return List;
  }
	
}
