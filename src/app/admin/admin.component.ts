import { Component, OnInit } from '@angular/core';
import { AfterViewInit } from '@angular/core';
import { Router } from '@angular/router';
import { TrackingService } from '../shared';
import { TrackingRequest, Tracking } from '../shared/models';
import { UserService } from '../shared';
import { LocalDataSource } from 'ng2-smart-table';
import { DatePipe } from '@angular/common';
import { CustomEditorComponent } from './custom-editor.component';

@Component({
    selector: 'admin-page',
    templateUrl: './admin.component.html',
    styleUrls: ['./admin.component.css',
    ],
    providers: [DatePipe]

})

export class AdminComponent implements OnInit {
    trackings : Tracking[];
    isAuthenticated: boolean;
    component : CustomEditorComponent;
    constructor(
        private userService : UserService,
        private trackingService: TrackingService,
        private router: Router,
        private datePipe: DatePipe
    ) {
    }
    ngOnInit() {
        this.userService.isAuthenticated.subscribe(
            (authenticated) => {
                this.isAuthenticated = authenticated;

                // set the article list accordingly
                if (!authenticated) {
                    this.router.navigateByUrl('/login');
                }
            }
        );
        this.trackingService.getAllTracking().subscribe(data => 
            this.trackings = data)
    }

    logout(){
        this.userService.purgeAuth();
    }


    settings = {
        delete: {
            confirmDelete: true,
        },
        add: {
            confirmCreate: true,
        },
        edit: {
            confirmSave: true,
        },
        columns: {
            created:{
                title:'Create Date',
                valuePrepareFunction: (date) => {
                    var raw = new Date(date);
                    var formatted = this.datePipe.transform(raw, 'dd/MM/yyyy');
                    return formatted;
                },
                type: 'html',
                editor: {
                    type: 'custom',
                    component: CustomEditorComponent,
                }
            },
            modified: {
                title: 'Modified Date',
                valuePrepareFunction: (date) => {
                    var raw = new Date(date);
                    var formatted = this.datePipe.transform(raw, 'dd/MM/yyyy');
                    return formatted;
                },
                type: 'html',
                editor: {
                    type: 'custom',
                    component: CustomEditorComponent,
                }
            },
            sale_agent: {
                title: 'Sale Agent'
            },
            customer: {
                title: 'Customer',
            },
            kdoc_pack: {
                title: 'Kdoc Pack'
            },
            to: {
                title: 'To'
            },
            kg_receive: {
                title: 'KG Receive'
            },
            kg_send: {
                title: 'KG Send'
            },
            bill_safa:{
                title: 'Bill Safa'
            },
            bill_sky:{
                title: 'Bill Sky'
            },
            tracking: {
                title: 'Tracking'
            },
            service: {
                title: 'Service'
            },
            pick_up_by: {
                title: 'Pickup By'
            },
            delivery_by:{
                title: 'Delivery By'
            },
            status: {
                title: 'Status'
            },
            delivery_date:{
                title : 'Delivery Date',
                valuePrepareFunction: (date) => {
                    var raw = new Date(date);

                    var formatted = this.datePipe.transform(raw, 'dd/MM/yyyy');
                    return formatted;
                },
                type: 'html',
                editor: {
                    type: 'custom',
                    component: CustomEditorComponent,
                }
            },
            department_receive:{
                title : 'Department Receive',
            },  
            price_buy : {
                title : 'Price By'
            },
            price_sale : {
                title : 'Price Sale'
            }, 
        },
    };

    source: LocalDataSource = new LocalDataSource();
    
    onDeleteConfirm(event) {
        if (window.confirm('Are you sure you want to delete?')) {
            this.trackingService.deleteTracking(event.data._id).subscribe(data => data)
            event.confirm.resolve();
        } else {
            event.confirm.reject();
        }
    }

    onSaveConfirm(event) {
        if (window.confirm('Are you sure you want to save?')) {
            this.trackingService.putUpdateTracking(event.newData).subscribe(data =>
                 data)
            event.confirm.resolve(event.newData);
        } else {
            event.confirm.reject();
        }
    }

    onCreateConfirm(event) {
        if (window.confirm('Are you sure you want to create?')) {
            this.trackingService.postCreateTracking(event.newData).subscribe(data => data)
            event.confirm.resolve(event.newData);
        } else {
            event.confirm.reject();
        }
    }
    // constructor(private service: SmartTableService) {
    //     const data = this.service.getData();
    //     this.source.load(data);
    // }

}