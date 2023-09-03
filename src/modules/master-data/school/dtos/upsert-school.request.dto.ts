import { Type } from "class-transformer";
import { Allow, IsEmpty, IsNotEmpty, IsNumber, IsString, ValidateIf, ValidateNested } from "class-validator";

export class UpsertSchoolRequestDto {
    @IsNotEmpty()
    @ValidateNested({ each: true })
    @Type(() => NewSchool)
    schools: NewSchool[];
}

export class NewSchool {
    @IsNumber()
    @ValidateIf((object, value) => value !== null)
    school_id: number | null;

    @IsString()
    @IsNotEmpty()
    school_name: string;

    @IsString()
    description: string;
}