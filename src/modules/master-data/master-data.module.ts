import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { MasterDataController } from './master-data.controller';
import { School } from "./school/school.entity";
import { SchoolService } from './school/school.service';


@Module({
    imports: [
        TypeOrmModule.forFeature([School]),
    ],
    controllers: [MasterDataController],
    providers: [SchoolService],
    exports: []
})
export class MasterDataModule {

}