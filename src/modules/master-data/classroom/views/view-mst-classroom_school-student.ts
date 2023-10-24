import { ViewEntity, ViewColumn } from "typeorm"

@ViewEntity({ schema: 'public', name: 'view_classroom_school_student' })
export class ViewClassRoomSchoolStudent {
    @ViewColumn()
    classroom_id: number;

    @ViewColumn()
    classroom_name: string;

    @ViewColumn()
    academic_year_id: number;

    @ViewColumn()
    academic_year_name: string;

    @ViewColumn()
    school_id: number;

    @ViewColumn()
    school_name: string;

    @ViewColumn()
    student_count: number;
}