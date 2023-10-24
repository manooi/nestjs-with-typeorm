import { Transform } from "class-transformer";
import { IsNumber, IsOptional } from "class-validator";
import { toNumber } from "src/helper/cast.helper";

export class SearchClassRoomRequestDto {
    @IsOptional()
    @Transform((value) => toNumber(value.value))
    @IsNumber()
    school_id?: number | null;

    @IsOptional()
    @Transform((value) => toNumber(value.value))
    @IsNumber()
    academic_year_id?: number | null;
}

