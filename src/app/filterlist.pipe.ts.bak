import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'filterlist'
})
export class FilterlistPipe implements PipeTransform {

  transform(value: any, args?: any): any {
    if(!args)
     return value;
    return value.filter(
      item => item.origin.toLowerCase().indexOf(args.toLowerCase()) > -1
   );
  }
}