import { Transform } from "class-transformer";
import { IsNumber, IsOptional, IsString } from "class-validator";
import { toNumber } from "src/helper/cast.helper";

export class GetTeacherRequestDto {
    @Transform((value) => toNumber(value.value))
    @IsNumber()
    @IsOptional()
    school_id?: number;

    @IsString()
    @IsOptional()
    student_name?: string;
}
