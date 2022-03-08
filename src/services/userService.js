import ServiceManager, { Service, apiConsts } from "utils/serviceManager";

export default {
  getUser: () => {
    const service = new Service("v1/users/current", apiConsts.HTTP_METHOD_GET);

    service.setPrepareRequest((request) => {
      return request;
    });

    return service;
  },
};
