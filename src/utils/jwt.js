import JWT from 'jsonwebtoken';
import config from '../config';

/**
 * Class tokenizer used to encode and decoded tokens
 */
export default class tokenizer {
  /**
   *
   * @param {object} user - its an object with users data
   * @returns {string} token
   */
  static async signToken(user) {
    return JWT.sign({
      email: user.email,
      userId: user.id,
      verified: user.isVerified
    }, config.secret, { expiresIn: '24h' });
  }

  /**
   *
   * @param {string} token
   * @returns {object} users data decoded from token
   */
  static async decodeToken(token) {
    const data = JWT.verify(token, config.secret, (err, decoded) => {
      if (err) return { error: err.message };
      return decoded;
    });
    return data;
  }
}
