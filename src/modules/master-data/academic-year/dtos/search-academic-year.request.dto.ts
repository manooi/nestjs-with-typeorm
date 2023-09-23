import { Transform } from "class-transformer";
import { IsNumber, IsOptional } from "class-validator";
import { toNumber } from "src/helper/cast.helper";

export class SearchAcademicYearRequestDto {
    @Transform((value) => toNumber(value.value))
    @IsNumber()
    @IsOptional()
    school_id?: number;
}
