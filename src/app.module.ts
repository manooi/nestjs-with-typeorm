import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { MasterDataModule } from './modules/master-data/master-data.module';
import { MstAcademicYear } from './modules/master-data/academic-year/academic-year.entity';


@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: '.env',
      isGlobal: true
    }),
    TypeOrmModule.forRoot({
      type: 'postgres', // specify the database type
      host: process.env.DB_HOST,
      port: +process.env.DB_PORT,
      username: process.env.DB_USERNAME,
      password: process.env.DB_PASSWORD,
      database: process.env.DB_DATABASENAME,
      synchronize: false, // set to true to automatically synchronize database schema with TypeORM entities during development (use with caution in production)
      logging: true, // set to true to enable logging of database queries and other TypeORM-related messages
      entities: [MstAcademicYear], // specify the path to your TypeORM entities
      migrationsRun: false,
      schema: 'public'
    }),
    MasterDataModule
  ],
  controllers: [],
  providers: [],
})
export class AppModule { }
