import { Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/sequelize";
import { ApiProperty } from "@nestjs/swagger";
import { BelongsToMany, Column, DataType, Model, Table } from "sequelize-typescript";
import { User } from "src/users/user.model";
import { UsersRoles } from "./users-roles.model";


interface AtrrRole{
    value : string,
    description : string
}

@Table({tableName : 'roles'})
export class Role extends Model<Role, AtrrRole>{
    @ApiProperty({example : 1, description : 'Уникальный идентификатор'})
    @Column({type : DataType.INTEGER, unique : true, autoIncrement : true, primaryKey : true})
    id : number;

    @ApiProperty({example : 'BLOGGER', description : 'Наименование роли'})
    @Column({type : DataType.STRING, unique : true, allowNull : false})
    value : string;

    @ApiProperty({example : 'Роль имеет ограниченные права ', description : 'Описание роли'})
    @Column({type : DataType.STRING, unique : true, allowNull : false})    
    description : string;

    @BelongsToMany(() => User, () => UsersRoles)
    users : User[]
    
}
