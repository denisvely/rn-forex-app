import { Service, apiConsts } from "../../../utils/serviceManager";

export default {
  register: () => {
    const service = new Service("v2/users", apiConsts.HTTP_METHOD_POST);

    service.setPrepareRequest(
      (
        request,
        {
          email,
          password,
          confirmPassword,
          firstName,
          lastName,
          countryCode,
          birthDay,
          birthMonth,
          birthYear,
        }
      ) => {
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
        options["countryCode"] = countryCode;
        options["birthDay"] = birthDay;
        options["birthMonth"] = birthMonth;
        options["birthYear"] = birthYear;

        // TODO
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
  getResources: () => {
    const service = new Service("v2/users", apiConsts.HTTP_METHOD_POST);

    service.setPrepareRequest((request) => {
      // request.convertToQueryParamsWithoutToken(options);

      return request;
    });

    return service;
  },
};
