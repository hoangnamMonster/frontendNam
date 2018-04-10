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
    trackings: Tracking[];
    isAuthenticated: boolean;
    component: CustomEditorComponent;
    constructor(
        private userService: UserService,
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

    logout() {
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
            created: {
                title: 'Create Date',
                valuePrepareFunction: (date) => {
                    if (date == null || date == '') {
                        return null
                    } else {
                        var raw = new Date(date);
                        var formatted = this.datePipe.transform(raw, 'dd/MM/yyyy');
                        return formatted;
                    }
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
                    if (date == null || date == '') {
                        return null
                    } else {
                        var raw = new Date(date);
                        var formatted = this.datePipe.transform(raw, 'dd/MM/yyyy');
                        return formatted;
                    }
                },
                type: 'html',
                editor: {
                    type: 'custom',
                    component: CustomEditorComponent,
                }
            },
            to: {
                title: 'To'
            },
            bill_safa: {
                title: 'Bill Safa'
            },
            tracking: {
                title: 'Tracking'
            },
            service: {
                title: "Service",
                type: 'html',
                editor: {
                    type: 'list',
                    config: {
                        list: [{ value: 'DHL', title: 'DHL' }, { value: 'TNT', title: 'TNT' }, {
                            value: 'FEDEX',
                            title: 'FEDEX',
                        }, { value: 'UPS', title: 'UPS'}],
                    },
                },
            },
            delivery_date: {
                title: 'Delivery Date',
                valuePrepareFunction: (date) => {
                    if (date == null || date == '') {
                        return null
                    } else {
                        var raw = new Date(date);
                        var formatted = this.datePipe.transform(raw, 'dd/MM/yyyy');
                        return formatted;
                    }
                },
                type: 'html',
                editor: {
                    type: 'custom',
                    component: CustomEditorComponent,
                }
            },
            time_exspect: {
                title: 'Thoi Gian Du Kien',
                valuePrepareFunction: (date) => {
                    if (date == null || date == '') {
                        return null
                    } else {
                        var raw = new Date(date);
                        var formatted = this.datePipe.transform(raw, 'dd/MM/yyyy');
                        return formatted;
                    }
                },
                type: 'html',
                editor: {
                    type: 'custom',
                    component: CustomEditorComponent,
                }
            },
            cau1: {
                title: 'Dong 1'
            },
            time_cau1: {
                title: "Thoi Gian Dong 1"
            },
            diadiem1: {
                title: "Dia Diem Dong 1"
            },
            cau2: {
                title: 'Dong 2'
            },
            time_cau2: {
                title: "Thoi Gian Dong 2"
            },
            diadiem2: {
                title: "Dia Diem Dong 2"
            },
            cau3: {
                title: 'Dong 3'
            },
            time_cau3: {
                title: "Thoi Gian Dong 3"
            },
            diadiem3: {
                title: "Dia Diem Dong 3"
            },
            cau4: {
                title: 'Dong 4'
            },
            time_cau4: {
                title: "Thoi Gian Dong 4"
            },
            diadiem4: {
                title: "Dia Diem Dong 4"
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