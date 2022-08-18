import AuthService from "./authService";
import { imagePost, post, remove } from "../baseRequest";

const API_URL = "image/";

const saveImage = async (file: File) => {
  const buff = await file.arrayBuffer();
  const currentUser = AuthService.getCurrentUser();
  if (!currentUser) return null;
  let formData = new FormData();
  formData.append("file", file);
  return imagePost(API_URL + "SaveImage", formData, currentUser.token).then(
    (response) => {
      const baseUrl = process.env.REACT_APP_IMAGEURL;
      return baseUrl + response;
    }
  );
};

const deleteImage = (fileName: string) => {
  const currentUser = AuthService.getCurrentUser();
  if (!currentUser) return null;
  return remove(
    API_URL + "DeleteImage?fileName=" + fileName,
    currentUser.token
  );
};

const ImageService = {
  saveImage,
  deleteImage,
};
export default ImageService;
