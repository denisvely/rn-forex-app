import ServiceManager, {
  Service,
  apiConsts,
} from "../../../../../utils/serviceManager";

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
  complianceAddDocument: () => {
    const token = ServiceManager.getAccessToken();
    const service = new Service(
      `v1/compliance/documents/add?token=${token}`,
      apiConsts.HTTP_METHOD_POST
    );

    service.setPrepareRequest((request, { image, documentTypeId, expDate }) => {
      request.addUrlencodedParam("UploadedImage", image);
      request.addUrlencodedParam("DocumentTypeID", documentTypeId);
      request.addUrlencodedParam("DocumentExpirationDate", expDate);

      return request;
    });
    return service;
  },
};
