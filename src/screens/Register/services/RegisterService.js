import ServiceManager, { Service, apiConsts } from "utils/serviceManager";

export default {
  register: () => {
    // TODO => webIds
    const service = new Service(
      "/v2/users/login?webId=97AA047C-D004-4F58-AABA-169C54A8D0AB",
      apiConsts.HTTP_METHOD_POST
    );

    service.setPrepareRequest((request, { username, password }) => {
      let options = {};

      options["username"] = username;
      options["password"] = password;
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
