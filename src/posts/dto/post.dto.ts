import { ApiProperty } from "@nestjs/swagger";

export class PostDto{
    @ApiProperty({example : 'Post', description : 'Заголовок поста'})
    readonly title : string;    
    @ApiProperty({example : 'Content', description : 'Содержание поста'})
    readonly context : string;
    @ApiProperty({example : 1, description : 'Уникальный идеттификатор пользователя'})        
    readonly userId : number
}