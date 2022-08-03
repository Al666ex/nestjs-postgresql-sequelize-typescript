import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { RoleDto } from './dto/role.dto';
import { Role } from './role.module';

@Injectable()
export class RolesService {

    constructor(@InjectModel(Role) private roleRepository : typeof Role){}

    async createRole(dto : RoleDto){
        const role = await this.roleRepository.create(dto)        
        return role
    }

    async getRoleByValue(value: string) {
        const role = await this.roleRepository.findOne({where : {value}})       
        return role
    }    
}
