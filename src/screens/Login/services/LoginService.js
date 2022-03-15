import ServiceManager, { Service, apiConsts } from "utils/serviceManager";
import { Storage } from "../../../utils";
const token = Storage.get("token")

export default {
  login: () => {
    // TODO => webIds
    const service = new Service(
      "v2/users/login",
      apiConsts.HTTP_METHOD_POST
    );

    service.setPrepareRequest((request, { username, password }) => {
      let options = {};

      options["username"] = username;
      options["password"] = password;
      // TODO get language code
      options["lcid"] = 1033;
      options["dataType"] = "json";
      options["format"] = "json";
      options["loginHistory"] = 0; // TODO
      options["ServerTimeMinutesOffset"] = Math.abs(
        new Date().getTimezoneOffset()
      );

      request.setHeader('authorization', `oauth oauth_token=${ServiceManager.getAccessToken()}`)
      request.convertToQueryParamsWithoutToken(options);

      return request;
    });

    return service;
  },
};
