import AuthService from "./authService";
import { imagePost, post } from "./baseRequest";

const API_URL = "image/";

const saveImage = (file:string ) => {
  let currentUser = AuthService.getCurrentUser();
  if(!currentUser) return null;  
  var formData = new FormData();
  formData.append("file",file);
  return imagePost(API_URL + "SaveImage", formData, currentUser.token)
    .then((response) => {          
    return response;
  });
};
const deleteImage = (fileName:string) => {
  let currentUser = AuthService.getCurrentUser();
  if(!currentUser) return null;
    return post(API_URL + "DeleteImage", {
        fileName
    }, currentUser.token);
  };


const ImageService = {
   saveImage,
   deleteImage
  };
  export default ImageService;