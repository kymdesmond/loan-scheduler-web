import {HttpClient} from '@angular/common/http'
import {Injectable} from '@angular/core'
import { Observable } from 'rxjs';
import { Request } from '../models/request';

@Injectable({
    providedIn: 'root'
  })
export class DataService {
    constructor(private http: HttpClient) {
        this.http = http;
    }

    prepareLoanSchedule(request: Request): Observable<any> {
        return this.http.post('/api/calculate', request);
    }
}