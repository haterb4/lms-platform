import SessionService from "./session.service";
import UserService from "./user.service";

class ServiceFactory {
    public static create(type: string){
        let service;
        switch (type){
            case 'user':
                service = new UserService();
                break;
            case 'session':
                service = new SessionService();
                break;
        }
        return service;
    }
}

export default ServiceFactory;