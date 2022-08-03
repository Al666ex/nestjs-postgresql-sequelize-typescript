import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { PosUpdateDto } from 'src/posts/dto/post.update.dto';
import { RolesService } from 'src/roles/roles.service';
import { AddRoleDto } from './dto/add.role';
import { UserDto } from './dto/user.dto';
import { User } from './user.model';

@Injectable()
export class UsersService {

    constructor(@InjectModel(User) private userModel : typeof User,
                                   private roleService : RolesService){}
    async createUser(dto : UserDto){
        try {
            const user = await this.userModel.create(dto)
            const role = await this.roleService.getRoleByValue('BLOGGER')
            //const role = await this.roleService.getRoleByValue('ADMIN')                                     
            await user.$set('roles', [role.id])
            user.roles = [role]
            return user
                
        } catch (error) {
            throw new HttpException('Ошибка создания пользователя ', HttpStatus.BAD_REQUEST)            
        }
    }

    async getAllUsers(){
        //const users = await this.userModel.findAll({include : {all : true}})
        const users = await this.userModel.findAll({include : {all : true}})
        return users
    }

    async getUserByEmail(email : string){
        const user = await this.userModel.findOne({where : {email}, include : {all : true}})
        return user
    }

    async addRoleToUser(dto: AddRoleDto) {
        let user = await this.userModel.findByPk(dto.userId)
        let role = await this.roleService.getRoleByValue(dto.value)
        if(user && role) {
            await user.$add('roles', role.id)
            return dto
        }
        throw new HttpException('USER or ROLE not found', HttpStatus.NOT_FOUND)            
    }


}
