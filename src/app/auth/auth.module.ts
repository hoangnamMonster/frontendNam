import { ModuleWithProviders, NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { UserComponent } from './user/user.component';
import { NoAuthGuard } from './no-auth-guard.service';
import { SharedModule } from '../shared';
const authRouting: ModuleWithProviders = RouterModule.forChild([
  {
    path: 'login',
    component: UserComponent,
    canActivate: [NoAuthGuard]
  },
  {
    path: 'register',
    component: UserComponent,
    canActivate: [NoAuthGuard]
  }
]);
@NgModule({
  imports: [
    authRouting,
    SharedModule
  ],
  declarations: [
    UserComponent
  ],

  providers:[
    NoAuthGuard
  ]
})
export class AuthModule { }
