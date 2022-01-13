import { Service, apiConsts } from "utils/serviceManager";

export default {
  getToken: () => {
    const service = new Service("/v1/token", apiConsts.HTTP_METHOD_POST);

    service.setPrepareRequest((request) => {
      let options = {};
      // TODO => webIds consts file
      options["webId"] = "086CA44B-2841-415B-98D3-9499915F3953";

      request.convertToQueryParamsWithoutToken(options);

      return request;
    });

    return service;
  },
  updateRefreshToken: () => {
    const service = new Service(
      "v1/tokens/refresh",
      apiConsts.HTTP_METHOD_POST
    );
    // Not Finished - should be tested
    service.setPrepareRequest((request, { refreshToken }) => {
      let options = {};

      options["refreshToken"] = refreshToken;

      request.convertToQueryParamsWithoutToken(options);

      return request;
    });

    return service;
  },
};
