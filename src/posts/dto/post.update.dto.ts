import { ApiProperty } from "@nestjs/swagger";

export class PosUpdateDto{
    @ApiProperty({example : 'Title', description : 'Update post title'})
    readonly title : string;
    @ApiProperty({example: 'Tra-la-la', description : 'Update content'})    
    readonly context : string;    
}