export default class UserInfo {
  constructor(nameSelector, jobSelector, avatarSelector) {
    this._name = document.querySelector(nameSelector);
    this._job = document.querySelector(jobSelector);
    this._avatarSelector = document.querySelector(avatarSelector);
  }

  getUserInfo() {
    const name = this._name.textContent;
    const job = this._job.textContent;
    return {
      profileName: name,
      profileJob: job
    };
  }

  setUserInfo(newName, newJob) {
    this._name.textContent = newName;
    this._job.textContent = newJob;
  }

  setUserAvatar(linkAvatar) {
    this._avatarSelector.src = linkAvatar;
  }
}