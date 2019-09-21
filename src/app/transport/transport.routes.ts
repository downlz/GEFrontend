import { FindTransportComponent } from './find-transport/find-transport.component';
import { DispatchOrderComponent } from './dispatch-order/dispatch-order.component';
import { DispatchHistoryComponent } from './dispatch-history/dispatch-history.component';
import { DispatchDetailComponent } from './dispatch-detail/dispatch-detail.component';
import { TransportRateComponent } from './transport-rate/transport-rate.component';
import { ListTransportRateComponent } from './list-transport-rate/list-transport-rate.component';
import { TransportComponent } from './transport.component';
import { AuthGuard } from './../_guards/auth.guard';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

const routes: Routes = [
    {
        path : '',
        component: TransportComponent,
        canActivate: [AuthGuard],
            children: [
            {
            path: 'add',
            component: ListTransportRateComponent,
            data: {
            roles: ['admin', 'seller', 'buyer' , 'transporter','agent']
            }
          },
          {
            path: 'edit/:id',
            component: ListTransportRateComponent,
            data: {
              roles: ['admin', 'seller', 'buyer', 'transporter','agent']
            }
          },
          {
            path: 'user',
            component: TransportRateComponent,
            data: {
              roles: ['admin', 'seller', 'buyer', 'transporter','agent']
            }
          },
          {
            path: 'dispatch',
            component: DispatchDetailComponent,
            data : {
              roles: ['admin', 'seller', 'buyer', 'transporter','agent']
            }
          },
          {
            path: 'dispatchhistory',
            component: DispatchHistoryComponent,
            data :{
              roles: ['admin', 'seller', 'buyer', 'transporter','agent']
            }
          },
          {
            path: 'dispatchorder',
            component: DispatchOrderComponent,
            data: {
              roles: ['admin', 'seller', 'buyer', 'transporter','agent']
            }
          },
          {
            path: 'findtransport',
            component: FindTransportComponent,
            data: {
              roles: ['admin', 'seller', 'buyer', 'transporter','agent']
            }
      }]
    }
];


@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})

export class TransportRouteModule { }

// export const HomeRoutes: Route[] = [
//   {
//     path: '',
//     component: HomeComponent,
//     canActivate: [AuthGuard],
//     children: [
//       { path: '', component: DashboardComponent },
//       { path: 'settings', component: SettingsComponent },
//       { path: 'products', component: ProductsComponent },
//       { path: 'user/:username', component: UserComponent },
//       { path: 'user/:username/:id', component: UserComponent }
//     ]
//   }
// ];