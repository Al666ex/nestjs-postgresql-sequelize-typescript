import { Body, Controller, Post, UseGuards } from '@nestjs/common';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { UserDto } from 'src/users/dto/user.dto';
import { AuthService } from './auth.service';
import { Roles } from './roles.decorator';
import { RolesGuard } from './roles.guard';

@ApiTags('Authentication / Authorization')
@Controller('auth')
export class AuthController {
    constructor(private authService : AuthService){}
    @ApiOperation({summary : 'Registration'})
    @ApiResponse({status : 200})
    @Post('/registration')
    async registration(@Body() dto : UserDto){    
        return await this.authService.registration(dto)
    }

    //@Roles('ADMIN')
    //@UseGuards(RolesGuard)
    @ApiOperation({summary : 'Login'})
    @ApiResponse({status : 200})
    @Post('/login')
    login(@Body() dto : UserDto){
        return this.authService.login(dto)
    }
}
