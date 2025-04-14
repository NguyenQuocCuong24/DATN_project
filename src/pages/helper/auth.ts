import { NextApiRequest } from "next";
import jwt, { JwtPayload } from "jsonwebtoken";
import { parse } from 'cookie';

interface UserPayload extends JwtPayload {
    id: number;
    email: string;
    role: string;
}

interface AuthResult {
    valid: boolean;
    payload?: UserPayload;
    message?: string;
    statusCode: number;
}

export const verifyToken = (req: NextApiRequest, allowedRoles: string[] = []) : AuthResult => {
    try {
      const cookies = parse(req.headers.cookie || '');      
      const token = cookies.token;
  
      if (!token) {
        return {
            valid: false,
            message: 'Token not found',
            statusCode: 401,
        };
      }
  
      const payload = jwt.verify(token, "SECRET_KEY") as UserPayload;

      const currentTime = Math.floor(Date.now() / 1000);
        if (payload.exp && payload.exp < currentTime) {
            return {
                valid: false,
                message: 'Token has expired',
                statusCode: 401,
            };
        }

      if (allowedRoles.length > 0 && !allowedRoles.includes(payload.role)) {
        return {
          valid: false,
          message: 'Forbidden',
          statusCode: 403,
        };
      }
  
      return {
        valid: true,
        payload,
        statusCode: 200,
      };
    } catch (error: any) {
        return {
            valid: false,
            message: 'Invalid or expired token',
            statusCode: 401,
          };
    }
};
