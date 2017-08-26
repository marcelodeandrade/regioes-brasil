import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'sortBy',
  pure: false
})

export class SortPipe implements PipeTransform{
  transform(array: Array<any>, args: string): Array<any> {

      const comparator = (args) =>
      (a, b) => typeof(a[args]) === 'undefined' ? 1 : typeof(b[args]) === 'undefined' ? 0 : a[args] === b[args] ? 0 : a[args] < b[args] ? -1 : 1;

      array.sort(comparator(args));

    return array;
  }
}
