import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'shortbrief'
})
export class ShortbriefPipe implements PipeTransform {

  transform(value: string, limit?:number): any {
    if (!value) {
      return null;
    }
    let val = 100
    if(limit) val=limit

    if(value.length>val){
    return value.substr(0,val-3)+'...'
    }else{
      return value
    }
  }
}
