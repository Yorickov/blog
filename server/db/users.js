import encrypt from '../lib/encrypt';
import User from '../models/User';
import Guest from '../models/Guest';

let users = [new User('admin', encrypt('pass'))]; //eslint-disable-line

export default {
  addUser(nickname, password) {
    const user = new User(nickname, encrypt(password));
    users.push(user);
    return user;
  },
  getUsers() {
    return users;
  },
  addGuest() {
    return new Guest();
  },
};
