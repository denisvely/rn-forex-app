import ServiceManager, {
  Service,
  apiConsts,
} from "../../../../../utils/serviceManager";
import { Storage } from "../../../../../utils";

export default {
  changeForexMode: () => {
    const service = new Service(
      "v1/user/setUserForexMode?forexModeId=",
      apiConsts.HTTP_METHOD_POST
    );
    service.setPrepareRequest((request, { modeId }) => {
      request.setHeader(
        "Authorization",
        `OAuth oauth_token=${ServiceManager.getAccessToken()}`
      );
      request.addParamToTheUrl(modeId);
      return request;
    });
    return service;
  },
  changeHedgingForexMode: () => {
    const service = new Service(
      "v1/user/setMarginMode?marginModeId=",
      apiConsts.HTTP_METHOD_POST
    );
    service.setPrepareRequest((request, { mode }) => {
      request.setHeader(
        "Authorization",
        `OAuth oauth_token=${ServiceManager.getAccessToken()}`
      );
      request.addParamToTheUrl(mode);
      return request;
    });
    return service;
  },
};
