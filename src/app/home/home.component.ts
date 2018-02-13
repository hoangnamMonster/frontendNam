import { Component, OnInit } from '@angular/core';
import { AfterViewInit } from '@angular/core';
import { Router } from '@angular/router';
import {  TrackingService } from '../shared';
import { TrackingRequest, Tracking } from '../shared/models';
import { error } from 'util';


import { UserService } from '../shared';
@Component({
  selector: 'home-page',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css',
  ],

})
export class HomeComponent implements OnInit {

  isSubmitting = false;
  constructor(
    private trackingService: TrackingService,
    private router: Router,
  ) {
  }
  ngOnInit() {
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
