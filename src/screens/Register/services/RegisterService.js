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
          currencyCode,
          isTosAccepted,
          phone,
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
        options["base64Photo"] = "";
        options["submit"] = "Sign up";
        options["error"] = "";
        options["countryCode"] = countryCode;
        options["birthDay"] = birthDay;
        options["birthMonth"] = birthMonth;
        options["birthYear"] = birthYear;
        options["currencyCode"] = currencyCode;
        options["tos"] = isTosAccepted ? "on" : "off";
        options["countryPhoneCode"] = "";
        options["phone"] = phone;

        // TODO

        options["subscribeToPromoEmail"] = false;
        options["subscribeToPromoSms"] = false;
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
      return request;
    });

    return service;
  },
};
