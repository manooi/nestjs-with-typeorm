import { IsNumber, IsString } from "class-validator";

export class EditTeacherRequestDto {
    @IsString()
    first_name: string;
    
    @IsString()
    last_name: string;

    @IsNumber()
    school_id: number;
}
