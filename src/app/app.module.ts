import { BrowserModule } from '@angular/platform-browser';
import { ModuleWithProviders,NgModule } from '@angular/core';
import { AuthModule} from './auth/auth.module';
import { HomeModule} from './home/home.module';
import { TrackingModule} from './tracking/tracking.module';
import { AdminModule} from './admin/admin.module'
import { RouterModule } from '@angular/router';
import { AppComponent } from './app.component';
import { FormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {
  ApiService,
  JwtService,
  SharedModule,
  UserService,
  TrackingService
} from './shared';
const rootRouting: ModuleWithProviders = RouterModule.forRoot([], { useHash: true });

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    BrowserAnimationsModule,
    AuthModule,
    rootRouting,
    SharedModule,
    HomeModule,
    TrackingModule,
    AdminModule
  ],
  providers: [
    ApiService,
    JwtService,
    UserService,
    TrackingService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
