import ServiceManager, { Service, apiConsts } from "utils/serviceManager";

export default {
  getNotifications: () => {
    // TODO => webIds
    const service = new Service(
      "v1/users/current/notifications",
      apiConsts.HTTP_METHOD_GET
    );

    service.setPrepareRequest((request) => {
      request.setHeader(
        "Authorization",
        `OAuth oauth_token=${ServiceManager.getAccessToken()}`
      );

      return request;
    });

    return service;
  },
};
