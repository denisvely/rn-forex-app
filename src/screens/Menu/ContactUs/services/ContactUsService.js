import ServiceManager, { Service, apiConsts } from "utils/serviceManager";

export default {
  postContactUsMessage: () => {
    const service = new Service("v1/contact", apiConsts.HTTP_METHOD_POST);

    service.setPrepareRequest(
      (request, { name, phone, email, subject, message }) => {
        const options = {
          name: name,
          phone: phone,
          email: email,
          subject: subject,
          message: message,
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
