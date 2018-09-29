import { Component, OnInit } from '@angular/core';
import { EntryEgressService } from '../entry-egress/entry-egress.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styles: []
})
export class DashboardComponent implements OnInit {

  constructor(public entryEgressService: EntryEgressService) { }

  ngOnInit() {
    this.entryEgressService.initEntryEgressListener();
  }

}
