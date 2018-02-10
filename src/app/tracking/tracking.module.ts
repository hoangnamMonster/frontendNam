import { ModuleWithProviders, NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { NgxCarouselModule } from 'ngx-carousel';
import { TrackingComponent } from './tracking.component';
import { TrackingAuthResolver } from './tracking-auth-resolver.service';
import { SharedModule } from '../shared';
import { MaterialModule } from '../material/material.module';
import { NgwWowModule } from 'ngx-wow';
import { FormsModule }   from '@angular/forms';

const trackingRouting: ModuleWithProviders = RouterModule.forChild([
  {
    path: 'tracking',
    component: TrackingComponent,
  }
]);

@NgModule({
  imports: [
    trackingRouting,
    SharedModule,
    MaterialModule,
    FormsModule,
    NgwWowModule.forRoot()
  ],
  declarations: [
    TrackingComponent
  ]
})
export class TrackingModule {}
