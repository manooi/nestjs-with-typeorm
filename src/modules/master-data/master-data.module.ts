import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { MstAcademicYear } from "./academic-year/academic-year.entity";
import { MasterDataController } from './master-data.controller';

@Module({
    imports: [
        TypeOrmModule.forFeature([MstAcademicYear]),
    ],
    controllers: [MasterDataController],
    providers: [],
})
export class MasterDataModule {

}