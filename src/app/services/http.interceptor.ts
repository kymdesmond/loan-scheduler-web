import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";

@Injectable({
    providedIn: 'root'
  })
export class AuthInterceptorService  implements HttpInterceptor {

intercept(request: HttpRequest<any>, next: HttpHandler):
    Observable<HttpEvent<any>> {
    
    request = request.clone({ headers: request.headers.set( 'Authorization', 'Bearer ')});
    return next.handle(request);
    }
}