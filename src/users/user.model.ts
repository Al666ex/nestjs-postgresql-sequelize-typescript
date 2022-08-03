import { ApiProperty } from "@nestjs/swagger";
import { BelongsToMany, Column, DataType, HasMany, Model, Table } from "sequelize-typescript";
import { Post } from "src/posts/post.module";
import { Role } from "src/roles/role.module";
import { UsersRoles } from "src/roles/users-roles.model";

interface AtrrUser{
    email : string,
    password : string
}

@Table({tableName : 'users'})
export class User extends Model<User, AtrrUser>{
    @ApiProperty({example : 1, description : 'Уникальный идеттификатор'})
    @Column({type : DataType.INTEGER, unique : true, autoIncrement : true, primaryKey : true})
    id:number;

    @ApiProperty({example : 'user@gmail.com', description : 'Почтовый адрес'})
    @Column({type : DataType.STRING, unique : true, allowNull : false})
    email : string;

    @ApiProperty({example : 'password', description : 'Пароль пользователя'})
    @Column({type : DataType.STRING, allowNull : false})
    password : string;

    @ApiProperty({example : 'true/fasle', description : 'True - пользователь активен/False - пользователь заблокирован'})
    @Column({type : DataType.BOOLEAN, defaultValue : false})
    banned : boolean;

    @ApiProperty({example :'Хулиганство', description : 'Причина по которой пользователь заблокирован'})
    @Column({type : DataType.STRING, allowNull : true})
    bannReason : string;

    @BelongsToMany(() => Role, () => UsersRoles)
    roles : Role[]

    @HasMany(() => Post)
    posts : Post[]

    
}