import mongoose from 'mongoose';
import bcrypt from 'bcrypt-nodejs';

const Schema = mongoose.Schema;

const userSchema = new Schema({
  username: { type: 'String', required: true },
  password: { type: 'String', required: true },
  slug: { type: 'String', required: true },
  cuid: { type: 'String', required: true },
  email: { type: 'String', required: true },
  registrationDate: { type: 'Date', default: Date.now, required: true },
});

userSchema.methods.generateHash = password => bcrypt.hashSync(password, bcrypt.genSaltSync(8), null);

userSchema.methods.validatePassword = function (password) {
  return bcrypt.compareSync(password, this.password);
}

export default mongoose.model('User', userSchema);
