import { HttpEvent, HttpHandlerFn, HttpInterceptorFn, HttpRequest } from "@angular/common/http";
import { inject } from "@angular/core";
import { Observable } from "rxjs";
import { TokenService } from "../../service/tokens/tokens.service";
import { loginResponse } from "../../models/Login/LoginData.mode";


export const UserTokenInterceptor: HttpInterceptorFn = (
    request: HttpRequest<any>,
    next: HttpHandlerFn
): Observable<HttpEvent<any>> => {
    const tokenService = inject(TokenService);
    // const accessToken = tokenService.getToken('access_token')
    const accessToken = tokenService.getAllToken<loginResponse>();
    
    let assign_access_token = request;
    if(accessToken) {
        assign_access_token = addToken(request, accessToken.access_token);
    }
    return next(assign_access_token);
}

function addToken(request: HttpRequest<any>, token: string):HttpRequest<any> {

    return request.clone({
        setHeaders: {
            Authorization: `Bearer ${token}`
        }
    })
}