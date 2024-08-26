import { Injectable, CanActivate, ExecutionContext } from "@nestjs/common";
import { Observable } from "rxjs";
import { AuthService } from "./auth.service";

@Injectable()
export class AuthGuard implements CanActivate {
  constructor( private authService: AuthService ) {
  }

  canActivate( context: ExecutionContext ): boolean | Promise<boolean> | Observable<boolean> {

    const request = context.switchToHttp().getRequest();
    const { originalUrl } = request;
    if ( originalUrl !== "/api/vi/auth/login" || originalUrl !== "/api/vi/auth/refresh" ) {
      const token = request.headers.authorization?.split( " " )[ 1 ];

      return this.authService.checkedToken( token );
    }

    return true;
  }
}
