import ServiceManager, {
  Service,
  apiConsts,
} from "../../../../utils/serviceManager";

export default {
  getMessages: () => {
    const service = new Service("v1/messages", apiConsts.HTTP_METHOD_GET);

    service.setPrepareRequest((request, { offset, rowsPerPage }) => {
      let options = {};

      options["offset"] = offset;
      options["limit"] = rowsPerPage;

      request.setHeader(
        "authorization",
        `oauth oauth_token=${ServiceManager.getAccessToken()}`
      );

      request.setQueryParameters(options);

      return request;
    });

    return service;
  },
  getMessageDetails: () => {
    const service = new Service("v1/messages/", apiConsts.HTTP_METHOD_GET);

    service.setPrepareRequest((request, { id }) => {
      request.setHeader(
        "authorization",
        `oauth oauth_token=${ServiceManager.getAccessToken()}`
      );

      request.addParamToTheUrl(id);

      return request;
    });

    return service;
  },
};
