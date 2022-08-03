import { forwardRef, Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { SequelizeModule } from '@nestjs/sequelize';
import { AuthModule } from 'src/auth/auth.module';
import { User } from 'src/users/user.model';
import { UsersModule } from 'src/users/users.module';
//import { UsersService } from 'src/users/users.service';
import { Post } from './post.module';
import { PostsController } from './posts.controller';
import { PostsService } from './posts.service';

@Module({
  controllers: [PostsController],
  providers: [PostsService],
  imports : [
    SequelizeModule.forFeature([Post , User]), 
    JwtModule, forwardRef(() => UsersModule), forwardRef(() => AuthModule) 
  ],
  exports : [PostsService]
})
export class PostsModule {}
