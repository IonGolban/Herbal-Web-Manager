import Jwt  from "jsonwebtoken";



class TokenUtils {
    static generateToken(payload) {
        return Jwt.sign(payload, process.env.JWT_KEY, { expiresIn: process.env.JWT_EXPIRE });
    }

    static verifyToken(token) {
        return Jwt.verify(token, process.env.JWT_KEY);
    }
}

export default TokenUtils;