import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { User } from 'src/users/user.model';
import { UsersService } from 'src/users/users.service';
import { PostDto } from './dto/post.dto';
import { PosUpdateDto } from './dto/post.update.dto';
import { PostUpdateStatusDto } from './dto/post.update.status.dto';
import { Post } from './post.module';

@Injectable()
export class PostsService {

    constructor(@InjectModel(Post) private postRepository : typeof Post,
                                   private userService : UsersService
    ){}

    async post(dto : PostDto){
        const addPost = await this.postRepository.create(dto)
        return addPost
    }

    private async validator(email:string ,idPost:string){
        const idPst = Number(idPost)
        let user = await this.userService.getUserByEmail(email)
        let objInd = user.posts.findIndex(obj => obj.id == idPst)

        if(!user || objInd === -1){
            throw new HttpException('User or Post not found', HttpStatus.BAD_REQUEST)
        }
        return {user, idPst, objInd}        

    }

    async update(email:string ,idPost:string , dto : PosUpdateDto){      
        const valid = await this.validator(email,idPost)
        const updatePost = await this.postRepository.update({title : dto.title, context : dto.context},  {where : {id : valid.idPst}})            
        let user = await this.userService.getUserByEmail(email)        
        return user.posts[valid.objInd]
    }

    async delete(email: string, idPost: string) {
        const valid = await this.validator(email,idPost)
        const deletePost = await this.postRepository.destroy({where : {id : valid.idPst}})
        let user = await this.userService.getUserByEmail(email)        
        return user
    }

    async updateStatus(email: string, idPost: string, dto : PostUpdateStatusDto) {
        const valid = await this.validator(email,idPost)
        const updatePost = await this.postRepository.update({status : dto.status},  {where : {id : valid.idPst}})            
        let user = await this.userService.getUserByEmail(email)        
        return user.posts[valid.objInd]
    }    

    async publicPosts() {
        const user = await this.userService.getAllUsers()
        if(!user.length){
            throw new HttpException('No users or posts', HttpStatus.NOT_FOUND)
        }
        return this.generatePublicPosts(user)       
    }

    async postsOwner(email: string) {
        const user = await this.userService.getUserByEmail(email);        
        return user.posts
    }

    async deletePublicPost(idPost: string) {        
        const post = await this.postRepository.findByPk(idPost)
        if(!post){
            throw new HttpException('Post not found', HttpStatus.NOT_FOUND)
        }

        if(post.status === 'private'){
            throw new HttpException(`Post has status ${post.status}. This post can only be deleted by the owner`, HttpStatus.BAD_REQUEST)
        }

        await this.postRepository.destroy({where : {id : idPost}})
        return post
    }    

    private generatePublicPosts(user){
        let arr = []    

        for(let i = 0; i < user.length; i++){
            let email = user[i].email
            let posts = user[i].posts

            if(!posts.length){continue}
            
            for(let j = 0; j < posts.length; j++){
                let item = posts[j]
                let status = posts[j].status
                if(status === 'public'){                    
                    let obj = {
                        email : email,
                        posts: posts[j]
                    }    
                    arr.push(obj)
                }
            }                     
        }
        return arr 
    }
}
