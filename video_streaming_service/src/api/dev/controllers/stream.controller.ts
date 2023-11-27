import { Request, Response } from "express";
import log from "../../../config/Logger";

class StreamController {
    public async getVideoStreamHandler(req: Request, res: Response) {
        try {
            return res.status(200).send({stream: "stream"});
        } catch (e: any) {
            log.error(e.message)
            return res.status(409).send(e.message)
        }
    }
}

export default StreamController;