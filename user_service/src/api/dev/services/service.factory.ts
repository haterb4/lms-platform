import StudentService from "./student.service";
import TeacherService from "./teacher.service";

class ServiceFactory {
    public static create(type: string){
        let service;
        switch (type){
            case 'student':
                service = new StudentService();
                break;
            case 'teacher':
                service = new TeacherService();
        }
        return service;
    }
}

export default ServiceFactory;