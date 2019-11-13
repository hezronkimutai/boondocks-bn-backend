import bcrypt from 'bcrypt';
import config from '../config/env/default';

const Hash = {
  generateSync(plainPassword) {
    return bcrypt.hashSync(plainPassword, config.HASH_SALT_ROUNDS);
  },

  compareSync(plainPassword, hash) {
    return bcrypt.compareSync(plainPassword, hash);
  }
};

export default Hash;
