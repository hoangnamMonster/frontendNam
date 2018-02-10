import { Component, OnInit, OnDestroy } from '@angular/core';
import { AfterViewInit } from '@angular/core';
import { Router, NavigationEnd, ActivatedRoute } from '@angular/router';
import { WOW } from 'wowjs';
import { UserService, TrackingService } from '../shared';
import { TrackingRequest , Tracking } from '../shared/models';
import { error } from 'util';
const wow = new WOW({
    boxClass: 'wow',
    animateClass: 'animated',
    offset: 0,
    live: true
});
@Component({
    selector: 'tracking-page',
    templateUrl: './tracking.component.html',
    styleUrls: ['./tracking.component.css',
    ],

})
export class TrackingComponent implements OnInit {
    isSubmitting = false;
    constructor(
        private trackingService: TrackingService,
        private route: ActivatedRoute,
        private router: Router,
    ) {
        wow.init();
    }
    ngOnInit() {
        wow.sync();
    }

    model = new TrackingRequest();
    trackingModel = new Tracking();
    mapTracking(values: Object) {
        (<any>Object).assign(this.trackingModel, values);
    }

    onSubmit() {
        this.isSubmitting = true;

        this.trackingService.getTrackingByNumber(this.model).subscribe(
            response => this.mapTracking(response)
        );
    }


}
