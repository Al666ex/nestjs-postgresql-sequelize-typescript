import { ApiProperty } from "@nestjs/swagger";
import { BelongsTo, Column, DataType, ForeignKey, Model, Table } from "sequelize-typescript";
import { User } from "src/users/user.model";

interface AttrPost{
    title : string;    
    context : string;    
    userId : number
}

@Table({tableName : 'posts'})
export class Post extends Model<Post , AttrPost>{
    @ApiProperty({example : 1, description : 'Уникальный идентификатор'})
    @Column({type : DataType.INTEGER, unique:true, autoIncrement : true, primaryKey : true})
    id:number;

    @ApiProperty({example : 'Post', description : 'Заголовок поста'})
    @Column({type : DataType.STRING, unique : true, allowNull : false})
    title : string;

    @ApiProperty({example : 'Content', description : 'Содержание поста'})
    @Column({type : DataType.STRING, allowNull : false})
    context : string;

    @ApiProperty({example : 'Status', description : 'Статус поста'})
    @Column({type : DataType.STRING, defaultValue : 'public'})
    status : string;

    @ForeignKey(() => User)
    @Column({type : DataType.INTEGER})
    userId : number;

    @BelongsTo(() => User)
    author : User
}