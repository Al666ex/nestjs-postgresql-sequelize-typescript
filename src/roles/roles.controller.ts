import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { RoleDto } from './dto/role.dto';
import { Role } from './role.module';
import { RolesService } from './roles.service';

@ApiTags('Roles')
@Controller('roles')
export class RolesController {
    constructor(private roleService: RolesService){}

    @ApiOperation({summary : 'Создание роли'})
    @ApiResponse({status : 200, type : Role})
    @Post()
    async createRole(@Body() dto : RoleDto){
        const role = await this.roleService.createRole(dto)
        return role
    }

    @ApiOperation({summary : 'Получение роли'})
    @ApiResponse({status : 200, type : Role})    
    @Get('/:value')    
    async getByValue(@Param('value') value : string){
        const role = this.roleService.getRoleByValue(value)
        return role
    }



}


