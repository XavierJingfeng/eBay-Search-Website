import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'getDays'
})
export class GetDaysPipe implements PipeTransform {

  transform(value: string): string {
  	var str  = '';
    for(var i = 0; i<value.length; ++i){
    	if(value.charAt(i) == 'D'){
    		str = value.slice(1, i);
    	}
    }
    return str;
  }

}
