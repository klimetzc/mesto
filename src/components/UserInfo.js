export default class UserInfo {
  constructor(nameSelector, professionSelector, avatarSelector, userID) {
    this._name = document.querySelector(`${nameSelector}`);
    this._profession = document.querySelector(`${professionSelector}`);
    this._avatar = document.querySelector(`${avatarSelector}`);
    this._userId = userID;
  }

  getUserInfo() {
    return {
      name: this._name.textContent,
      profession: this._profession.textContent,
      avatar: this._avatar,
      userID: this._userId,
    };
  }

  setUserInfo({ name, profession, avatar }) {
    if (name) this._name.textContent = name;
    if (profession) this._profession.textContent = profession;
    if (avatar) this._avatar.src = avatar;
  }
}
