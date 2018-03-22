import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import { Observable } from 'rxjs/Rx';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { ReplaySubject } from 'rxjs/ReplaySubject';
import { map } from 'rxjs/operators';
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
        return this.apiService.get('/api/tracking/findbytracking/'+ TrackingRequest.bill)
        .map(
            data => {return data},
            err => {return err}
        )
    }

    getAllTracking(): Observable<Tracking[]>{
        return this.apiService.get('/api/tracking')
        .pipe(map(data => 
            data));
    }

    putUpdateTracking(Tracking): Observable<Tracking>{
        return this.apiService.put('/api/tracking/updatetracking/'+ Tracking._id,{tracking : Tracking})
        .pipe(map(data => data));
    }

    postCreateTracking(Tracking): Observable<Tracking>{
        return this.apiService.post('/api/tracking',{tracking : Tracking})
        .pipe(map(data => data));
    }

    deleteTracking(id): Observable<Tracking>{
        return this.apiService.delete('/api/tracking/'+ id)
        .pipe(map(data => data));
    }
}
