import AsyncStorage from "@react-native-async-storage/async-storage";

class Storage {
  constructor() {
    this.storage = AsyncStorage;
  }

  get(name) {
    return this.storage.getItem(name);
  }

  set(name, value) {
    return this.storage.setItem(name, value);
  }

  remove(name) {
    return this.storage.removeItem(name);
  }

  getToken = () => {
    return new Promise((res, rej) => {
      this.get("token")
        .then((value) => {
          res(value);
        })
        .catch(() => {
          res(null);
          rej;
        });
    });
  };

  /**
   * GetAllEssentialToServiceData
   *
   * extracts all flags stored into AsyncStorage
   *
   * return {Promise}
   */
  getAllEssentialToServiceData() {
    return Promise.all([this.getToken(), this.get("sessionId")]);
  }

  removeToken = () => {
    return this.remove("token");
  };
}

export default new Storage();
