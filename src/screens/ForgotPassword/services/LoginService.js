import ServiceManager, { Service, apiConsts } from "utils/serviceManager";

export default {
  login: () => {
    // TODO => webIds
    const service = new Service(
      "v2/users/login?webId=9A1D49B1-63D1-4791-AE00-084FE5762A1A",
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

      request.convertToQueryParamsWithoutToken(options);

      return request;
    });

    return service;
  },
};
