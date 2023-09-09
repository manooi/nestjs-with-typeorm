import { Type } from "class-transformer";
import { IsNotEmpty, IsNumber, IsOptional, IsString, ValidateIf, ValidateNested } from "class-validator";

export class UpsertStudentRequestDto {
    @IsNotEmpty()
    @ValidateNested({ each: true })
    @Type(() => NewStudent)
    students: NewStudent[];

    @IsNumber()
    school_id: number;
}

export class NewStudent {
    @IsNumber()
    @IsOptional()
    @ValidateIf((object, value) => value !== null)
    student_id: number | null;

    @IsString()
    @IsNotEmpty()
    student_first_name: string;

    @IsString()
    @IsNotEmpty()
    student_last_name: string;

    @IsString()
    student_unique_id: string;
}