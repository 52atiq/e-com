// import jwt, { Secret, SignOptions } from "jsonwebtoken";

// export const generateToken = (payload: object,secret: Secret,expiresIn: SignOptions["expiresIn"],) => {
//   return jwt.sign(payload, secret, {expiresIn,});
// };

// export const verifyToken = (token: string, secret: Secret) => {
//   return jwt.verify(token, secret);
// };

import jwt, { JwtPayload, Secret, SignOptions } from "jsonwebtoken";

export const createToken = (
  payload: object,
  secret: Secret,
  expiresIn: SignOptions["expiresIn"],
): string => {
  return jwt.sign(payload, secret, {
    expiresIn,
  });
};

export const verifyToken = (token: string, secret: Secret): JwtPayload => {
  return jwt.verify(token, secret) as JwtPayload;
};