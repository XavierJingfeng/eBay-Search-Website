import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { FormsModule,ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { registerLocaleData } from '@angular/common';
import {MatButtonModule, MatCheckboxModule, MatTooltipModule, MatAutocompleteModule} from '@angular/material';
import { DeviceDetectorModule } from 'ngx-device-detector';

import { LOCAL_STORAGE,WebStorageService,StorageServiceModule } from 'angular-webstorage-service';


import en from '@angular/common/locales/en';
// declaration
import { AppComponent } from './app.component';
import { SearchFormComponent } from './search-form/search-form.component';
import { ResContainerComponent } from './res-container/res-container.component';
import { ResTableComponent } from './res-table/res-table.component';
import { ResWishListComponent } from './res-wish-list/res-wish-list.component';
import { DetailComponent } from './detail/detail.component';
import { ProgressBarComponent } from './progress-bar/progress-bar.component';
import { ProductComponent } from './detail/product/product.component';
import { PhotosComponent } from './detail/photos/photos.component';
import { ShippingComponent } from './detail/shipping/shipping.component';
import { SellerComponent } from './detail/seller/seller.component';
import { SimilarComponent } from './detail/similar/similar.component';
import { GetDaysPipe } from './detail/similar/get-days.pipe';
import {RoundProgressModule} from 'angular-svg-round-progressbar';
import { LimitLengthPipe } from './res-table/limit-length.pipe';

registerLocaleData(en);

@NgModule({
  declarations: [
    AppComponent,
    SearchFormComponent,
    ResContainerComponent,
    ResTableComponent,
    ResWishListComponent,
    DetailComponent,
    ProgressBarComponent,
    ProductComponent,
    PhotosComponent,
    ShippingComponent,
    SellerComponent,
    SimilarComponent,
    GetDaysPipe,
    LimitLengthPipe,

  ],
  imports: [
    BrowserModule,
    RoundProgressModule,
    FormsModule,
    HttpClientModule,
    BrowserAnimationsModule,
    MatButtonModule, MatCheckboxModule, MatTooltipModule,MatAutocompleteModule,
    StorageServiceModule,
    ReactiveFormsModule,
    DeviceDetectorModule.forRoot()

    ],
  
  bootstrap: [AppComponent]
})
export class AppModule { }
