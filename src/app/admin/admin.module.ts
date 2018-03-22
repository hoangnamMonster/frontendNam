import { ModuleWithProviders, NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { AdminComponent } from './admin.component';
import { AdminAuthResolver } from './admin-auth-resolver.service';
import { Ng2SmartTableModule } from 'ng2-smart-table';
import { SharedModule } from '../shared';
import { MaterialModule } from '../material/material.module';
import { FormsModule } from '@angular/forms';

import {
    NbActionsModule,
    NbCardModule,
    NbLayoutModule,
    NbMenuModule,
    NbRouteTabsetModule,
    NbSearchModule,
    NbSidebarModule,
    NbTabsetModule,
    NbThemeModule,
    NbUserModule,
    NbCheckboxModule,
} from '@nebular/theme';
import { CustomEditorComponent } from './custom-editor.component';

const adminRouting: ModuleWithProviders = RouterModule.forChild([
    {
        path: 'admin',
        component: AdminComponent,
        resolve: {
            isAuthenticated: AdminAuthResolver
        }
    }
]);

@NgModule({
    imports: [
        adminRouting,
        SharedModule,
        MaterialModule,
        FormsModule,
        NbCardModule,
        Ng2SmartTableModule
    ],
    entryComponents: [
        CustomEditorComponent
    ],
    declarations: [
        AdminComponent,
        CustomEditorComponent
    ],
    providers: [
        AdminAuthResolver
    ]
})
export class AdminModule { }
