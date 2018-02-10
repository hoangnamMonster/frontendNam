import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import { Observable } from 'rxjs/Rx';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { ReplaySubject } from 'rxjs/ReplaySubject';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';

import { ApiService } from './api.service';
import { Tracking,TrackingRequest } from '../models';


@Injectable()
export class TrackingService{
    constructor(
        private apiService: ApiService,
        private http: Http
    ){}

    getTrackingByNumber(TrackingRequest): Observable<Tracking> {
        return this.apiService.get('/api/tracking/findbytracking/'+ TrackingRequest.tracking)
        .map(
            data => {
                return data;
            }
        )
    }
}
