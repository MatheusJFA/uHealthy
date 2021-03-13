import bcrypt from 'bcryptjs';

export default {
  checkPassword(loginPassword, passwordSalva) {
    return bcrypt.compare(loginPassword, passwordSalva);
  }
}