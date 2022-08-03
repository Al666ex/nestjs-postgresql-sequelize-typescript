import { Body, Controller, Delete, Get, Param, Post, Put, UseGuards } from '@nestjs/common';
import { ApiOperation, ApiProperty, ApiResponse, ApiTags } from '@nestjs/swagger';
import { emitWarning } from 'process';
import { IsEmail } from 'sequelize-typescript';
import { AuthGuard } from 'src/auth/auth.guard';
import { Roles } from 'src/auth/roles.decorator';
import { RolesGuard } from 'src/auth/roles.guard';
import { PostDto } from './dto/post.dto';
import { PosUpdateDto } from './dto/post.update.dto';
import { PostUpdateStatusDto } from './dto/post.update.status.dto';
import { PostsService } from './posts.service';


@ApiTags('Posts')
@Controller('posts')
export class PostsController {
    constructor(private postService : PostsService){}

    // @Roles('ADMIN','BLOGGER')
    // @UseGuards(AuthGuard)
    @ApiOperation({summary : 'Create Post'})
    @ApiResponse({status : 200})

    @Roles('ADMIN', 'BLOGGER')
    @UseGuards(RolesGuard)    
    @Post()
    async post(@Body() dto : PostDto){
         const post = await this.postService.post(dto)
         return post
    }
    
    @ApiOperation({summary : 'Update post'})
    @ApiResponse({status : 200})
    @Put('/:email/:idPost')
    async update(@Param('email') email : string, @Param('idPost') idPost : string, @Body() dto : PosUpdateDto){
        const update = await this.postService.update(email ,idPost, dto)
        return update;
    }

    @ApiOperation({summary : 'Update status of post'})
    @ApiResponse({status : 200})
    @Put('/status/:email/:idPost')
    async updateStatus(@Param('email') email : string, @Param('idPost') idPost : string, @Body() dto : PostUpdateStatusDto){
        const updateStat = await this.postService.updateStatus(email ,idPost, dto)
        return updateStat;
    }

    @ApiOperation({summary : 'The owner deletes his post'})
    @ApiResponse({status:200})
    @Delete('/:email/:idPost')
    async delete(@Param('email') email : string, @Param('idPost') idPost : string){
        const deletePost = await this.postService.delete(email ,idPost)
        return deletePost
    }

    @ApiOperation({summary : 'All public posts'})
    @ApiResponse({status:200, type : Array})    
    @Get()
    allPublicPost(){
        return this.postService.publicPosts()        
    }

    @ApiOperation({summary : 'Owner posts'})
    @ApiResponse({status:200})
    @Get('/:email')
    postsOwner(@Param('email') email : string){
        return this.postService.postsOwner(email)
    }

    @ApiOperation({summary : 'ADMIN delete public post'})
    @ApiResponse({status:200})
    @Roles('ADMIN')
    @UseGuards(RolesGuard)      
    @Delete('/:idPost')
    async deletePublicPost(@Param('idPost') idPost : string){
        const deletePublicPost = await this.postService.deletePublicPost(idPost)
        return deletePublicPost
    }    
}
