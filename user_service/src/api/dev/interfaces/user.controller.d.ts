interface IUserController {
    public async createUserHandler(...args): Promise<Any>;
    public async updateUserHandler(...args): Promise<Any>;
    public async deleteUserHandler(...args): Promise<Any>;
    public async getUserHandler(...args): Promise<Any>;
}