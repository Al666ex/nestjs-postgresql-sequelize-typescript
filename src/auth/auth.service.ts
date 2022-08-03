import { HttpException, HttpStatus, Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UserDto } from 'src/users/dto/user.dto';
import { UsersService } from 'src/users/users.service';
import * as bcrypt from 'bcryptjs'
import { User } from 'src/users/user.model';

@Injectable()
export class AuthService {
    constructor(private userService : UsersService,
                private jwtService : JwtService){}

    async login(dto: UserDto) {
        const user = await this.validator(dto)
        return await this.generateToken(user)
    }

    private async validator(dto : UserDto){
        const user = await this.userService.getUserByEmail(dto.email)
        const comparePsw = await bcrypt.compare(dto.password, user.password)        
        const acceptRole = user.roles.some(role => process.env.ACCEPT_ROLES.includes(role.value))
        if(user && comparePsw && acceptRole){
            return user
        }
        throw new UnauthorizedException('Unauthorized user or wrong user/password')
    }

    async registration(dto : UserDto) {
        let candidate = await this.userService.getUserByEmail(dto.email) 
        console.log(dto)
        if(candidate){
            throw new HttpException('User already exists ', HttpStatus.BAD_REQUEST)
        }

        const hashPsw = await bcrypt.hash(dto.password, 5)
        const user = await this.userService.createUser({...dto, password : hashPsw})
        return this.generateToken(user)

    }
    private generateToken(user: User) {
        const payload = {email : user.email, id: user.id, roles : user.roles}
        return {
            token : this.jwtService.sign(payload)
        }
    }
}
