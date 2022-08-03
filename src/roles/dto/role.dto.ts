import { ApiProperty } from "@nestjs/swagger";

export class RoleDto{
    @ApiProperty({example : 'BLOGGER', description : 'Наименование роли'})
    readonly value : string;    
    @ApiProperty({example : 'Роль имеет ограниченные права ', description : 'Описание роли'})    
    readonly description : string
}