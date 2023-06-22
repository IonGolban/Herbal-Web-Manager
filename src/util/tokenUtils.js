import Jwt from "jsonwebtoken";
import dotenv from "dotenv";
dotenv.config();
const time = '1h';

class TokenUtils {
    static generateToken(payload) {
        return Jwt.sign({id: payload}, process.env.JWT_KEY, { expiresIn: time});
    }

    static verifyToken(token) {
        return Jwt.verify(token, process.env.JWT_KEY, (err, decoded) => {
            if (err) {
                return null;
            }
            return decoded;
        });
    }
}

export default TokenUtils;