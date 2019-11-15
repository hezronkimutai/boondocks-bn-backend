import bcrypt from 'bcrypt';
import config from '../config/env/default';

const Hash = {
  async generate(plainPassword) {
    return bcrypt.hash(plainPassword, config.HASH_SALT_ROUNDS);
  },

  async verify(plainPassword, hash) {
    return bcrypt.compare(plainPassword, hash);
  },

  generateSync(plainPassword) {
    return bcrypt.hashSync(plainPassword, config.HASH_SALT_ROUNDS);
  },

  compareSync(plainPassword, hash) {
    return bcrypt.compareSync(plainPassword, hash);
  }
};

export default Hash;
