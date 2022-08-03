import { Body, Controller, Get, Post, UseGuards } from '@nestjs/common';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
//import { AuthGuard } from 'src/auth/auth.guard';
import { Roles } from 'src/auth/roles.decorator';
import { RolesGuard } from 'src/auth/roles.guard';
import { AddRoleDto } from './dto/add.role';
import { UserDto } from './dto/user.dto';
import { User } from './user.model';
import { UsersService } from './users.service';

@ApiTags('Users')
@Controller('users')
export class UsersController {
    constructor(private userService : UsersService){}

    @ApiOperation({summary : 'Создание пользователя'})
    @ApiResponse({status : 200, type : User})
    @Post()
    async createUser(@Body() dto : UserDto){        
        const user = await this.userService.createUser(dto)
        return user
    }

    @ApiOperation({summary : 'Все пользователи'})
    @ApiResponse({status : 200, type : User})    
    @Roles('ADMIN')
    @UseGuards(RolesGuard)
    @Get()    
    async getAllUsers(){
        const users = await this.userService.getAllUsers()
        return users;
    }

    
    @ApiOperation({summary : 'БОНУС !!! Добавление роли пользователю'})
    //@ApiResponse({status : 200, type : User})        
    @ApiResponse({status : 200, type : AddRoleDto})        
    @Roles('ADMIN')
    @UseGuards(RolesGuard)
    @Post('/roles')
    addRoleToUser(@Body() dto : AddRoleDto){
        return this.userService.addRoleToUser(dto)
    }
    



}
