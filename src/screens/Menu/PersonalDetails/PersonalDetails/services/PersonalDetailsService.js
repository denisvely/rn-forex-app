import ServiceManager, { Service, apiConsts } from "utils/serviceManager";

export default {
  updateUser: () => {
    const service = new Service("v1/users/current", apiConsts.HTTP_METHOD_PUT);

    service.setPrepareRequest(
      (request, { sessionId, params, socialNetworkType }) => {
        let options = {};
        options["error"] = "";
        options["email"] = params.email;
        options["title"] = params.title;
        options["firstName"] = params.firstName;
        options["lastName"] = params.lastName;
        options["countryCode"] = params.countryCode;
        options["birthDay"] = params.birthDay;
        options["birthMonth"] = params.birthMonth;
        options["birthYear"] = params.birthYear;
        options["addressLine1"] = params.addressLine1;
        options["addressLine2"] = params.addressLine2;
        options["city"] = params.city;
        options["countryPhoneCode"] = "";
        options["areaPhoneCode"] = "";
        options["phone"] = params.phone;
        options["secondaryPhone"] = params.secondaryPhone;
        options["IDExpiryDate"] = "";
        options["doesNotExpire"] = false;
        options["NonExpiringID"] = false;
        options["idIssuer"] = "";
        options["fbLoginBtn"] = "";
        options["fbLoginErrorMessage"] = "";
        options["googleLoginBtn"] = "";
        options["googleLoginErrorMessage"] = "";
        options["submit"] = "Submit";
        options["dataType"] = "json";
        options["base64Photo"] = "";

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
