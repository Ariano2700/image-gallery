import { ownerEndpointI } from "../interfaces/ownerEndpointsInterface";

const ownerEndpoints: ownerEndpointI = {
  submitImageEndpoint: () => "/api/ownerUsers/all/post",
  editImageEndpoint: () => "/api/ownerUsers/all/patch",
  deleteImageEndpoint: (imageId) => `/api/ownerUsers/all/delete/${imageId}`,
  submitPersonalImageEndpoint: () => "/api/ownerUsers/personal/post",
  editPersonalImageEndpoint: () => "/api/ownerUsers/personal/patch",
  deletePersonalImageEndpoint: (imageId) => `/api/ownerUsers/personal/delete/${imageId}`,
  getUidCookieEndpoint: () => `/api/getUid`,
};
export default ownerEndpoints;
