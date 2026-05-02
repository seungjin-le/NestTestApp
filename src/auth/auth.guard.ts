import { CanActivate, ExecutionContext, Injectable, UnauthorizedException } from "@nestjs/common";
import { AuthService } from "./auth.service";
import { Request } from "express";

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(private readonly authService: AuthService) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest<Request>();
    const token = request.headers.authorization?.split(" ")[1];
    if (!token) throw new UnauthorizedException({ status: 401, message: "권한 없음" });

    const isValid = await this.authService.checkedToken(token);
    if (!isValid) throw new UnauthorizedException({ status: 401, message: "권한 없음" });

    return true;
  }
}
