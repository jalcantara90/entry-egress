import { Routes } from '@angular/router';
import { StatisticsComponent } from '../entry-egress/statistics/statistics.component';
import { EntryEgressComponent } from '../entry-egress/entry-egress.component';
import { DetailComponent } from '../entry-egress/detail/detail.component';

export const dashboardRoutes: Routes = [
    { path: '', component: StatisticsComponent },
    { path: 'entry-egress', component: EntryEgressComponent },
    { path: 'detail', component: DetailComponent }
];