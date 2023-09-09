import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { MasterDataModule } from './modules/master-data/master-data.module';
import { School } from './modules/master-data/school/school.entity';
import { Teacher } from './modules/master-data/teacher/teacher.entity';
import { Subject } from './modules/master-data/subject/subject.entity';
import { AcademicYear } from './modules/master-data/academic-year/academic-year.entity';
import { ClassRoom } from './modules/master-data/classroom/classroom.entity';
import { ThrottlerGuard, ThrottlerModule } from '@nestjs/throttler';
import { APP_GUARD } from '@nestjs/core';
import { Student } from './modules/master-data/student/student.entity';


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
      entities: [School, Teacher, Subject, AcademicYear, ClassRoom, Student], // specify the path to your TypeORM entities
      migrationsRun: false,
      schema: 'public'
    }),
    MasterDataModule,
    ThrottlerModule.forRoot({
      ttl: 60,
      limit: 60,
    }),
  ],
  controllers: [],
  providers: [{
    provide: APP_GUARD,
    useClass: ThrottlerGuard
  }
  ],
})
export class AppModule { }
