import ServiceManager, { Service, apiConsts } from "utils/serviceManager";

export default {
  changePassword: () => {
    const service = new Service("v1/users/password", apiConsts.HTTP_METHOD_PUT);

    service.setPrepareRequest(
      (request, { sessionId, oldPassword, newPassword }) => {
        const options = {
          oldPassword: oldPassword,
          newPassword: newPassword,
          dataType: "json",
          format: "json",
        };

        request.setHeader(
          "authorization",
          `oauth oauth_token=${ServiceManager.getAccessToken()}`
        );
        request.convertToQueryParamsWithoutToken(options);

        return request;
      }
    );

    return service;
  },
};
