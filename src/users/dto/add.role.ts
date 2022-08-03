import { ApiProperty } from "@nestjs/swagger";

export class AddRoleDto{
    @ApiProperty({example : 'Уникальный ID пользователя', description : '1'})    
    readonly userId : number;
    @ApiProperty({example : 'Роль', description : 'BLOGGER'})    
    readonly value : string;
}