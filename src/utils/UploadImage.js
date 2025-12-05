import axios from "axios";

export const imageUpload = async (imageData) => {
  const formData = new FormData();
  formData.append("image", imageData);
  const imageBBRes = await axios.post(
    `https://api.imgbb.com/1/upload?key=${
      import.meta.env.VITE_imagebb_api_key
    }`,
    formData
  );
  return imageBBRes.data.data.display_url;
};
