import ServiceManager, { Service, apiConsts } from "../utils/serviceManager";

export default {
  getResources: () => {
    const service = new Service("v1/merge", apiConsts.HTTP_METHOD_GET);

    service.setPrepareRequest((request) => {
      const resources = {
        countries: {},
        currencies: {},
        languages: {},
        location: {},
      };

      var options = {
        resources: JSON.stringify(resources),
      };

      console.log(options);

      request.setHeader(
        "Authorization",
        `OAuth oauth_token=${ServiceManager.getAccessToken()}`
      );

      request.setQueryParameters(options);

      return request;
    });

    return service;
  },
};
