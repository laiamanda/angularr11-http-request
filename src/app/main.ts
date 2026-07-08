import { bootstrapApplication } from '@angular/platform-browser';

import { AppComponent } from './app/app.component';
import { HttpEventType, HttpHandlerFn, HttpRequest, provideHttpClient, withInterceptors } from '@angular/common/http';
import { tap } from 'rxjs';


// @Injectable()
// class LoggingInterceptor implements HttpInterceptor {
//   intercept(req: HttpRequest<unknown>, handler: HttpHandler): Observable<HttpEvent<any>> {
//     console.log('Request URL: ' + req.url);
//     return handler.handle(req);
//   }
// }

function loggingInterceptor(request: HttpRequest<unknown>, next: HttpHandlerFn) {
//   const req = request.clone({
//     headers: request.headers.set('X-DEBUG', 'TESTING')
//   });
  console.log('[Outgoing Request]');
  console.log(request);
  return next(request).pipe(
    tap({
        next: event => {
            if(event.type === HttpEventType.Response) {
                console.log('[Incoming Response]');
                console.log(event.status);
                console.log(event.body);
            }
        }
    })
  );
}

bootstrapApplication(AppComponent, {
    providers: [provideHttpClient(
        withInterceptors([loggingInterceptor])
    )],
    //     providers: [
    //   provideHttpClient(
    //     withInterceptorsFromDi()
    //   ),
    //   { provide: HTTP_INTERCEPTORS, useClass: LoggingInterceptor, multi: true }
    // ]
}).catch((err) => console.error(err));
