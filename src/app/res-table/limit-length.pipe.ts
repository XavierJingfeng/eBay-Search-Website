import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'limitLength'
})
export class LimitLengthPipe implements PipeTransform {

  transform(value: string): string{
   	if(value.length >= 35){
   		return value.slice(0,35).trim() + '...';
   	}else{
   		return value;
   	}
   	
  }

}
