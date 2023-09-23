import { Transform } from "class-transformer";
import { IsNumber, IsOptional, IsString } from "class-validator";
import { toNumber } from "src/helper/cast.helper";

export class SearchStudentRequestDto {
    @Transform((value) => toNumber(value.value))
    @IsNumber()
    school_id: number;

    @Transform((value) => toNumber(value.value))
    @IsNumber()
    academic_year_id: number;

    @Transform((value) => toNumber(value.value))
    @IsNumber()
    @IsOptional()
    classroom_id: number;

    @IsString()
    @IsOptional()
    student_name?: string;
}