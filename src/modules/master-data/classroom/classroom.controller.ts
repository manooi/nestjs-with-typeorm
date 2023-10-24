import { Body, Controller, Delete, Get, Param, Patch, Post, Query } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { ClassRoomService } from './classroom.service';
import { SearchClassRoomRequestDto } from './dtos/search-classroom.request.dto';

@ApiTags('master-data/classroom')
@Controller('master-data')
export class ClassRoomController {
    constructor(
        private classRoomService: ClassRoomService
        
    ) { }

    @Get('classroom')
    getAllSchool(@Query() req: SearchClassRoomRequestDto) {
       return this.classRoomService.getAll(req); 
    }
}