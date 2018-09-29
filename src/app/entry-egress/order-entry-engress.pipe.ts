import { EntryEgress } from './entry-egress.model';
import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'orderEntryEngress'
})
export class OrderEntryEngressPipe implements PipeTransform {

  transform( items: EntryEgress[] ): EntryEgress[] {

    return items.sort( ( a, b ) => {
      if (a.type === 'entry') {
        return -1;
      } else {
        return 1;
      }
    });
  }

}
