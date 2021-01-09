export default class UserInfo {
  constructor(nameSelector, jobSelector) {
    this._name = document.querySelector(nameSelector);
    this._job = document.querySelector(jobSelector);
  }

  getUserInfo() {
    const name = this._name.textContent;
    const job = this._job.textContent;
    return {
      profileName: name,
      profileSpec: job
    };
  }

  setUserInfo(newName, newJob) {
    this._name.textContent = newName;
    this._job.textContent = newJob;
  }
}