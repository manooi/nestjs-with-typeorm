import { Type } from "class-transformer";
import { IsNotEmpty, IsNumber, IsOptional, IsString, ValidateIf, ValidateNested } from "class-validator";

export class UpsertStudentRequestDto {
    @IsNumber()
    school_id: number;

    @IsNumber()
    academic_year_id: number;

    @IsNotEmpty()
    @ValidateNested({ each: true })
    @Type(() => NewClassRoom)
    classrooms: NewClassRoom[];
}

export class NewClassRoom {
    @IsNumber()
    @IsOptional()
    @ValidateIf((object, value) => value !== null)
    classroom_id: number | null;

    @IsString()
    @IsNotEmpty()
    classroom_name: string;

    @IsNotEmpty()
    @ValidateNested({ each: true })
    @Type(() => NewStudent)
    students: NewStudent[];
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

    // @IsString()
    // @IsNotEmpty()
    // student_prefix: string;

    // @IsString()
    // student_class_room_id: number;
}