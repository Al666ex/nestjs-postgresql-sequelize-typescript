import { Column, DataType, ForeignKey, Model, Table } from "sequelize-typescript";
import { User } from "src/users/user.model";
import { Role } from "./role.module";

@Table({tableName : 'users-roles', createdAt : false, updatedAt : false})

export class UsersRoles extends Model<UsersRoles>{
    @Column({type : DataType.INTEGER, unique : true, autoIncrement : true, primaryKey : true})
    id : number;

    @Column({type : DataType.INTEGER, allowNull : false})
    @ForeignKey(() => User)
    userId : number;

    @Column({type : DataType.INTEGER, allowNull : false})
    @ForeignKey(() => Role)
    roleId : number;
}

