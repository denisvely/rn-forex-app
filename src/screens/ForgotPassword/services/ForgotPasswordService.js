import ServiceManager, { Service, apiConsts } from "utils/serviceManager";

export default {
  login: () => {
    const service = new Service(
      "v1/users/password/reset",
      apiConsts.HTTP_METHOD_PUT
    );

    service.setPrepareRequest((request, { email }) => {
      const options = {
        email: email,
        dataType: "json",
      };

      request.setHeader(
        "authorization",
        `oauth oauth_token=${ServiceManager.getAccessToken()}`
      );
      request.convertToQueryParamsWithoutToken(options);

      return request;
    });

    return service;
  },
};
