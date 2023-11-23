interface IVerifyToken {
    valid: boolean;
    expired: boolean;
    decoded: string | jwt.JwtPayload;
}