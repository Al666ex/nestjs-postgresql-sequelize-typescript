import { Module } from "@nestjs/common";
import { ConfigModule } from "@nestjs/config";
import { SequelizeModule } from "@nestjs/sequelize";
import { AuthModule } from "./auth/auth.module";
import { FilesModule } from "./files/files.module";
import { Post } from "./posts/post.module";
import { PostsModule } from "./posts/posts.module";
import { Role } from "./roles/role.module";
import { RolesModule } from "./roles/roles.module";
import { UsersRoles } from "./roles/users-roles.model";
import { User } from "./users/user.model";
import { UsersModule } from "./users/users.module";

@Module({
    controllers : [], 
    providers : [],
    imports: [
        ConfigModule.forRoot({
          envFilePath: `.${process.env.NODE_ENV}.env`,
        }),
        SequelizeModule.forRoot({
          dialect: 'postgres',
          host: process.env.HOST,
          port: Number(process.env.DB_PORT),
          username: process.env.DB_USER,
          password: process.env.DB_PASSWORD,
          database: process.env.DB_NAME,
          models: [User, Role, UsersRoles, Post],
          autoLoadModels : true
        }),
        UsersModule, RolesModule, PostsModule, AuthModule
      ],
    
})

export class AppModule{}