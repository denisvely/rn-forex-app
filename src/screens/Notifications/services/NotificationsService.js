import ServiceManager, { Service, apiConsts } from "utils/serviceManager";

export default {
  getNotifications: () => {
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
  deleteNotification: () => {
    const service = new Service(
      "v1/users/tradeNotification/delete/",
      apiConsts.HTTP_METHOD_DELETE
    );

    service.setPrepareRequest((request, { id, optionType }) => {
      const options = { id, optionType };
      request.setHeader(
        "Authorization",
        `OAuth oauth_token=${ServiceManager.getAccessToken()}`
      );

      request.addParamsToTheUrl(options);

      return request;
    });

    return service;
  },
  delAllForexNotifications: () => {
    const service = new Service(
      "v1/users/tradeNotification/deleteAll/",
      apiConsts.HTTP_METHOD_DELETE
    );

    service.setPrepareRequest((request, { optionType }) => {
      const options = { optionType };
      request.setHeader(
        "Authorization",
        `OAuth oauth_token=${ServiceManager.getAccessToken()}`
      );

      request.addParamsToTheUrl(options);

      return request;
    });

    return service;
  },
};
