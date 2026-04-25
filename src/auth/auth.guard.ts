import { Injectable, CanActivate, ExecutionContext } from "@nestjs/common";
import { Observable } from "rxjs";
import { AuthService } from "./auth.service";
import { Request } from "express";

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(private authService: AuthService) {}

  canActivate(context: ExecutionContext): boolean | Promise<boolean> | Observable<boolean> {
    const request = context.switchToHttp().getRequest<Request>();
    const { originalUrl } = request;
    if (originalUrl !== "/api/v1/auth/refresh") return true;
     
    const token = request.headers.authorization?.split(" ")[1];
    if (!token) return false;

    return this.authService.checkedToken(token);
  }
}
 