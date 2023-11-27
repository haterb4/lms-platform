
import StreamService from "./stream.service";

class ServiceFactory {
    public static create(type: string){
        let service;
        switch (type){
            case 'streaming':
                service = new StreamService();
                break;
        }
        return service;
    }
}

export default ServiceFactory;