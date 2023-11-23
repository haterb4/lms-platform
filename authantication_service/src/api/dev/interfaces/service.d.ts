interface IService {
    public async create(...args?): Promise<any>;
    public async findOne(...args?): Promise<any>;
    public async update(...args?): aPromise<ny>
    public async delete(...args?): Promise<any>;
    public async find(...args?): Promise<any>;
    public info(): void;
}