import { IsBoolean, IsNumber, IsOptional, IsString, MaxLength } from "class-validator";

export class AddOrEditAcademicYearRequestDto {
    @IsString()
    @MaxLength(10)
    academic_year_name: string;

    @IsString()
    @IsOptional()
    @MaxLength(255)
    description: string;

    @IsBoolean()
    is_active: boolean;

    @IsNumber()
    school_id: number;
}
