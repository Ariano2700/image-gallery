import { paramsEndpointsI } from "./paramsEndpointsInterface";

export interface ownerEndpointI extends paramsEndpointsI<string> {
  submitImageEndpoint: () => string;
  editImageEndpoint: () => string;
  deleteImageEndpoint: (imageId: string) => string;
  submitPersonalImageEndpoint: () => string;
  editPersonalImageEndpoint: () => string;
  deletePersonalImageEndpoint: (imageId: string) => string;
  getUidCookieEndpoint: () => string;
}
