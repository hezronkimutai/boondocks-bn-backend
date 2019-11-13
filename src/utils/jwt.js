/* eslint-disable require-jsdoc */
import JWT from 'jsonwebtoken';
import config from '../config';

export default class tokenizer {
  static async signToken(user) {
    return JWT.sign({
      email: user.email,
      userId: user.id,
      verified: user.isVerified
    }, config.secret, { expiresIn: '24h' });
  }

  static async decodeToken(token) {
    const data = JWT.verify(token, config.secret, (err, decoded) => {
      if (err) return { error: err.message };
      return decoded;
    });
    return data;
  }
}
