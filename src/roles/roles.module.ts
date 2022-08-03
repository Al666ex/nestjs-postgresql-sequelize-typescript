import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { User } from 'src/users/user.model';
import { Role } from './role.module';
import { RolesController } from './roles.controller';
import { RolesService } from './roles.service';
import { UsersRoles } from './users-roles.model';

@Module({
  controllers: [RolesController],
  providers: [RolesService],
  imports : [
    SequelizeModule.forFeature([Role, User, UsersRoles])
  ],
  exports : [RolesService]
})
export class RolesModule {}
