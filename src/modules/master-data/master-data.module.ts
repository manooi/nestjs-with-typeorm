import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { AcademicYear } from "./academic-year/academic-year.entity";
import { MasterDataController } from './master-data.controller';

@Module({
    imports: [
        TypeOrmModule.forFeature([AcademicYear]),
    ],
    controllers: [MasterDataController],
    providers: [],
})
export class MasterDataModule {

}