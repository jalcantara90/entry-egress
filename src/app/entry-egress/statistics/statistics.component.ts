import { EntryEgress } from './../entry-egress.model';
import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
// import { AppState } from '../../app.reducer';
import { Subscription } from 'rxjs';
import * as entryEgressReducer from '../entry-egress.reducer';

@Component({
  selector: 'app-statistics',
  templateUrl: './statistics.component.html',
  styleUrls: ['./statistics.component.css']
})
export class StatisticsComponent implements OnInit {
  entrys: number;
  egress: number;
  howManyEntry: number;
  howManyEgress: number;

  subscription: Subscription = new Subscription();
  
  public doughnutChartLabels:string[] = ['Entrys', 'Egress'];
  public doughnutChartData:number[] = [];
  public doughnutColors: string[] = ['fafafa', '#de287c']

  constructor(private store: Store<entryEgressReducer.AppState>) { }

  ngOnInit() {
    this.subscription = this.store.select('entryEgress')
      .subscribe(
        entryEgress => {
          this.countEntryEgress(entryEgress.items);
        }
      )
  }

  countEntryEgress( items: EntryEgress[]) {
    this.entrys = 0;
    this.egress = 0;
    this.howManyEntry = 0;
    this.howManyEgress = 0;
    
    items.forEach( item => {
      if( item.type === 'entry') {
        this.howManyEntry++;
        this.entrys += item.mount;
      } else {
        this.howManyEgress++;
        this.egress += item.mount;
      }
    });

    this.doughnutChartData = [ this.entrys, this.egress ];
  }

}
