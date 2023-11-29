interface IService {
    public async create(...args?): Promise<any>;
    public async findOne(...args?): Promise<any>;
    public async update(...args?): aPromise<ny>
    public async delete(...args?): Promise<any>;
    public async find(...args?): Promise<any>;
    public info(): void;
}

interface IDRIBVE {
    GOOGLE_DRIVE_CLIENT_ID: string;
    GOOGLE_DRIVE_CLIENT_SECRET: string;
    GOOGLE_DRIVE_REDIRECT_URI: string;
    GOOGLE_DRIVE_REFRESH_TOKEN: string;
    GOOGLE_DRIVE_CLIENT_KEY: string;
    GOOGLE_DRIVE_ACCESS_TOKEN: string;
}