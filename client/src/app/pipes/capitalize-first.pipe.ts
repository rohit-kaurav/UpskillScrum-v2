import { Pipe, PipeTransform } from "@angular/core";


@Pipe({
    name: 'capitalizeFirst'
})
export class CapitalizeFirstPipe implements PipeTransform {

    transform(val: string){
        if(val==null) return 'Not assigned'
        return val.charAt(0).toUpperCase() + val.slice(1);
    }
}