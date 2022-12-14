import { Service, apiConsts } from "../utils/serviceManager";

export default {
  getToken: () => {
    const service = new Service("v1/token", apiConsts.HTTP_METHOD_POST);

    service.setPrepareRequest((request) => {
      let options = {};
      options["webId"] = "9A1D49B1-63D1-4791-AE00-084FE5762A1A";

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
