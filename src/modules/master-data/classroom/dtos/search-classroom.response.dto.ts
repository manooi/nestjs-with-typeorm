export class SearchClassRoomResponseDto {
    classrooms: ClassRoomResponse[]
}

export class ClassRoomResponse {
    school_id: number;

    school_name: string;

    academic_year_id: number;

    academic_year_name: string;

    classroom_id: number;

    classroom_name: string;

    student_count: number;
}