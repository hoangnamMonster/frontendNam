import { BrowserModule } from '@angular/platform-browser';
import { ModuleWithProviders,NgModule } from '@angular/core';
import { AuthModule} from './auth/auth.module';
import { HomeModule} from './home/home.module';
import { RouterModule } from '@angular/router';
import { AppComponent } from './app.component';
import {
  ApiService,
  FooterComponent,
  HeaderComponent,
  JwtService,
  SharedModule,
  UserService
} from './shared';
const rootRouting: ModuleWithProviders = RouterModule.forRoot([], { useHash: true });

@NgModule({
  declarations: [
    AppComponent,
    FooterComponent,
    HeaderComponent
  ],
  imports: [
    BrowserModule,
    AuthModule,
    rootRouting,
    SharedModule,
    HomeModule
  ],
  providers: [
    ApiService,
    JwtService,
    UserService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
