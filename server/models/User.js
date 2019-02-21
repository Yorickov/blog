export default class {
  constructor(nickname, passwordDigest) {
    this.nickname = nickname;
    this.passwordDigest = passwordDigest;
  }

  isGuest() { // eslint-disable-line
    return false;
  }
}
