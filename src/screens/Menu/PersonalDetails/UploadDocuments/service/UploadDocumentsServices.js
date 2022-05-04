import { Service, apiConsts } from "../../../../../utils/serviceManager";

export default {
  getUploadedDocumentsStatus: () => {
    const service = new Service(
      "v1/compliance/uploadedDocuments",
      apiConsts.HTTP_METHOD_GET
    );

    service.setPrepareRequest((request) => {
      return request;
    });

    return service;
  },
  getComplianceAllowedDocuments: () => {
    const service = new Service(
      "v1/compliance/GetAllowedDocuments",
      apiConsts.HTTP_METHOD_GET
    );

    service.setPrepareRequest((request) => {
      return request;
    });

    return service;
  },
};
