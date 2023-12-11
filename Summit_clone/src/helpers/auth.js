import bcrypt from 'react-native-bcrypt';

export const hashPassword = (password) => {
  var salt = bcrypt.genSaltSync(10);
  return bcrypt.hashSync(password, salt);
};

export const comparePassword = (password, hash) => {
  return bcrypt.compareSync(password, hash);
};
