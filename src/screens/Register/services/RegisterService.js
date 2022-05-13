import { Service, apiConsts } from "../../../utils/serviceManager";

export default {
  register: () => {
    const service = new Service("v2/users", apiConsts.HTTP_METHOD_POST);

    service.setPrepareRequest(
      (request, { email, password, confirmPassword, firstName, lastName }) => {
        let options = {};

        options["email"] = email;
        options["password"] = password;
        options["confirmPassword"] = confirmPassword;
        options["firstName"] = firstName;
        options["lastName"] = lastName;
        options["title"] = "";
        options["NonExpiringID"] = false;
        options["base64Photo"] = null;
        options["submit"] = "Sign up";
        options["error"] = "";

        // TODO
        options["birthDay"] = "";
        options["birthMonth"] = "";
        options["birthYear"] = "";
        options["countryCode"] = "DK";
        options["countryPhoneCode"] = "";
        options["currencyCode"] = "";

        options["phone"] = "";
        options["subscribeToPromoEmail"] = false;
        options["subscribeToPromoSms"] = false;
        options["tos"] = "on";
        options["wantContact"] = "";

        request.convertToQueryParamsWithoutToken(options);

        return request;
      }
    );

    return service;
  },
};
