import { CanActivate, ExecutionContext, HttpException, HttpStatus, Injectable, UnauthorizedException } from "@nestjs/common";
import { Reflector } from "@nestjs/core";
import { JwtService } from "@nestjs/jwt";
import { Observable } from "rxjs";
import { ROLES_KEY } from "./roles.decorator";


@Injectable()
export class RolesGuard implements CanActivate {
    constructor(private jwsService : JwtService, private reflector : Reflector){}
  canActivate(  context: ExecutionContext,  ): boolean | Promise<boolean> | Observable<boolean> {
    try {
        const roles = this.reflector.getAllAndOverride<string[]>(ROLES_KEY, [
            context.getHandler(),
            context.getClass()
        ])

        console.log(roles)

        if(!roles){
            return true
        }

        const request = context.switchToHttp().getRequest();
        const headerAuth = request.headers.authorization;
        const bearer = headerAuth.split(' ')[0]
        const token = headerAuth.split(' ')[1]

        if(bearer !== 'Bearer' || !token){
            throw new UnauthorizedException('Unauthorized user')            
        }

        const user = this.jwsService.verify(token)
        request.user = user
        return user.roles.some(role => roles.includes(role.value));            
    } catch (error) {
        console.log(error)
        throw new HttpException('Access denied ', HttpStatus.FORBIDDEN)    
    }
  }
}


