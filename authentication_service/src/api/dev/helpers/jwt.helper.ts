import jwt from "jsonwebtoken";
import config from 'config'
import log from "../../../config/Logger";

class JWTHelper {
    static publicRefreshToken: publicTokens = "refreshTokenPublicKey";
    static publicAccessToken: publicTokens = "accessTokenPublicKey"

    public signJwt(
        object: Object,
        keyName: "accessTokenPrivateKey" | "refreshTokenPrivateKey",
        options?: jwt.SignOptions | undefined
      ) {
        const signingKey = Buffer.from(
          config.get<string>(keyName),
          "base64"
        ).toString("ascii");
      
        return jwt.sign(object, signingKey, {
          ...(options && options),
          algorithm: "RS256",
        });
    }
    public verifyJwt(
        token: string,
        keyName: "accessTokenPublicKey" | "refreshTokenPublicKey"
      ): IVerifyToken {
        const publicKey = Buffer.from(config.get<string>(keyName), "base64").toString("ascii");
      
        try {
          const decoded: string | jwt.JwtPayload = jwt.verify(token, publicKey);
          return {
            valid: true,
            expired: false,
            decoded,
          };
        } catch (e: any) {
          log.error(e.message);
          return {
            valid: false,
            expired: e.message === "jwt expired",
            decoded: null,
          };
        }
    }
}

export default JWTHelper;