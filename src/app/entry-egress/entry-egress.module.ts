import { DashboardRoutingModule } from './../dashboard/dashboard-routing.module';
import { OrderEntryEngressPipe } from './order-entry-engress.pipe';
import { DashboardComponent } from './../dashboard/dashboard.component';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { EntryEgressComponent } from './entry-egress.component';
import { StatisticsComponent } from './statistics/statistics.component';
import { DetailComponent } from './detail/detail.component';
import {  ReactiveFormsModule } from '@angular/forms';
import { ChartsModule } from 'ng2-charts';
import { SharedModule } from '../shared/shared.module';
import { entryEgressReducer } from './entry-egress.reducer';
import { StoreModule } from '@ngrx/store';

@NgModule({
  imports: [
    CommonModule,
    ReactiveFormsModule,
    ChartsModule,
    SharedModule,
    DashboardRoutingModule,
    StoreModule.forFeature('entryEgress', entryEgressReducer)
  ],
  declarations: [
    DashboardComponent,
    EntryEgressComponent,
    StatisticsComponent,
    DetailComponent,
    OrderEntryEngressPipe
  ]
})
export class EntryEgressModule { }
