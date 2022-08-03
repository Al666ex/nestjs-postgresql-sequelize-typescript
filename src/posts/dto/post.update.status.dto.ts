import { ApiProperty } from "@nestjs/swagger";

export class PostUpdateStatusDto{
    @ApiProperty({example : 'public/private', description:'Put new status'})
    readonly status : string
}