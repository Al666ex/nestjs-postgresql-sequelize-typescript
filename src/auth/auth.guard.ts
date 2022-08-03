import { CanActivate, ExecutionContext, Injectable, UnauthorizedException } from "@nestjs/common";
import { JwtService } from "@nestjs/jwt";
import { Observable } from "rxjs";


@Injectable()
export class AuthGuard implements CanActivate {
    constructor(private jwsService : JwtService){}
  canActivate(  context: ExecutionContext,  ): boolean | Promise<boolean> | Observable<boolean> {
    try {
        const request = context.switchToHttp().getRequest();
        const headerAuth = request.headers.authorization;
        const bearer = headerAuth.split(' ')[0]
        const token = headerAuth.split(' ')[1]

        if(bearer !== 'Bearer' || !token){
            throw new UnauthorizedException('Unauthorized user')            
        }

        const user = this.jwsService.verify(token)
        request.user = user
        return true;            
    } catch (error) {
        throw new UnauthorizedException('Unauthorized user')        
    }
  }
}