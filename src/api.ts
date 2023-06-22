import axios from "axios";
import Cookies from "js-cookie";
import {
  ILoginFormValues,
  IPostValues,
  IReportValues,
  ISingupFormValues,
  IUpdateMeFormValues,
  IUploadImageValues,
} from "./type";

const axiosInstance = axios.create({
  baseURL: process.env.REACT_APP_API_BASE_URL,
  withCredentials: true,
});

export const apiGetMe = async () => {
  const response = await axiosInstance.get("users/me/", {
    headers: {
      "X-CSRFToken": Cookies.get("csrftoken") || "",
      Authorization: `Bearer ${Cookies.get("access")}`,
    },
  });

  return response.data;
};

export const apiGetCount = async () => {
  const response = await axiosInstance.get("chat/rooms/1/", {
    headers: {
      "X-CSRFToken": Cookies.get("csrftoken") || "",
      Authorization: `Bearer ${Cookies.get("access")}`,
    },
  });

  return response.data;
};

export const apiGetBoardList = async () => {
  try {
    const response = await axiosInstance.get("community/board/", {
      headers: {
        "X-CSRFToken": Cookies.get("csrftoken") || "",
      },
      withCredentials: true,
    });
    return response.data;
  } catch (err) {
    console.error("Error:", err);
  }
};

export const apiGetPost = async (postPk: string) => {
  try {
    const response = await axiosInstance.get(`community/post/${postPk}/`, {
      headers: {
        "X-CSRFToken": Cookies.get("csrftoken") || "",
      },
    });
    return response.data;
  } catch (err) {
    console.error("Error:", err);
  }
};

export const apiGetPostList = async (channel: string) => {
  try {
    const response = await axiosInstance.get(
      `community/board/${channel}/posts/`,
      {
        headers: {
          "X-CSRFToken": Cookies.get("csrftoken") || "",
        },
      }
    );
    return response.data;
  } catch (err) {
    console.error("Error:", err);
  }
};

export const apiGetSimilarChannels = async (channel: string) => {
  try {
    const response = await axiosInstance.post(
      `youtube/find/${channel}/`,
      null,
      {
        headers: {
          "X-CSRFToken": Cookies.get("csrftoken") || "",
          Authorization: `Bearer ${Cookies.get("access")}`,
        },
      }
    );
    return response.data;
  } catch (err) {
    console.error("Error:", err);
  }
};

export const apiPostChannel = async (channel_id: string) => {
  try {
    const response = await axiosInstance.post(`youtube/${channel_id}/`, null, {
      headers: {
        "X-CSRFToken": Cookies.get("csrftoken") || "",
        Authorization: `Bearer ${Cookies.get("access")}`,
      },
    });
    return response.status;
  } catch (err) {
    console.error("Error:", err);
  }
};

export const apiGetUploadURL = async () => {
  try {
    const response = await axiosInstance.post(`medias/upload-image/`, null, {
      headers: {
        "X-CSRFToken": Cookies.get("csrftoken") || "",
        Authorization: `Bearer ${Cookies.get("access")}`,
      },
    });
    return response.data;
  } catch (err) {
    console.error("Error:", err);
  }
};

export const apiUploadImage = async ({
  file,
  uploadURL,
}: IUploadImageValues) => {
  const form = new FormData();
  form.append("file", file);
  const response = await axios.post(uploadURL, form, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });
  return response.data;
};

export const apiPostPost = async ({ board, title, content }: IPostValues) => {
  const response = await axiosInstance.post(
    `community/post/`,
    {
      board,
      title,
      content,
    },
    {
      headers: {
        "X-CSRFToken": Cookies.get("csrftoken") || "",
        Authorization: `Bearer ${Cookies.get("access")}`,
      },
    }
  );
  return response.status;
};

// Report API

export const apiGetReportList = async () => {
  const response = await axiosInstance.get("medias/report/", {
    headers: {
      "X-CSRFToken": Cookies.get("csrftoken") || "",
    },
  });
  return response.data;
};

export const apiPostReport = async ({
  title,
  content,
  image_title,
  image_url,
  cloudflare_image_id,
}: IReportValues) => {
  const response = await axiosInstance.post(
    "medias/report/",
    {
      title,
      content,
      image_title,
      image_url,
      cloudflare_image_id,
    },
    {
      headers: {
        "X-CSRFToken": Cookies.get("csrftoken") || "",
        Authorization: `Bearer ${Cookies.get("access")}`,
      },
    }
  );
  return response.status;
};

export const apiGetReport = async (pk: number) => {
  const response = await axiosInstance.get(`medias/report/${pk}/`, {
    headers: {
      "X-CSRFToken": Cookies.get("csrftoken") || "",
    },
  });
  return response.data;
};

export const apiPutReport = async ({
  pk,
  title,
  content,
  image_title,
  image_url,
  cloudflare_image_id,
}: IReportValues) => {
  const response = await axiosInstance.put(
    `medias/report/${pk}/`,
    {
      title,
      content,
      image_title,
      image_url,
      cloudflare_image_id,
    },
    {
      headers: {
        "X-CSRFToken": Cookies.get("csrftoken") || "",
        Authorization: `Bearer ${Cookies.get("access")}`,
      },
    }
  );
  return response.status;
};

export const apiDeleteReport = async (pk: number) => {
  const response = await axiosInstance.delete(`medias/report/${pk}/`, {
    headers: {
      "X-CSRFToken": Cookies.get("csrftoken") || "",
      Authorization: `Bearer ${Cookies.get("access")}`,
    },
  });
  return response.data;
};

// User API
export const apiPostLogin = async ({ email, password }: ILoginFormValues) => {
  const response = await axiosInstance.post(
    "users/token/",
    {
      email,
      password,
    },
    {
      headers: {
        "X-CSRFToken": Cookies.get("csrftoken") || "",
      },
    }
  );
  const { access, refresh } = response.data;
  Cookies.set("access", access);
  Cookies.set("refresh", refresh);
};

export const apiPostSignup = async ({
  email,
  password1,
  password2,
  nickname,
}: ISingupFormValues) => {
  const response = await axiosInstance.post(
    "users/signup/",
    {
      email,
      password1,
      password2,
      nickname,
    },
    {
      headers: {
        "X-CSRFToken": Cookies.get("csrftoken") || "",
      },
    }
  );
  return response.status;
};

export const apiGithubLogin = async (code: string) => {
  const response = await axiosInstance.post(
    "users/github-login/",
    {
      code,
    },
    {
      headers: {
        "X-CSRFToken": Cookies.get("csrftoken") || "",
      },
    }
  );
  if (response.data) {
    const { access, refresh } = response.data;
    Cookies.remove("access");
    Cookies.remove("refresh");
    Cookies.set("access", access);
    Cookies.set("refresh", refresh);
    return true;
  } else {
    return false;
  }
};

export const apiKakaoLogin = async (code: string) => {
  const response = await axiosInstance.post(
    "users/kakao-login/",
    {
      code,
    },
    {
      headers: {
        "X-CSRFToken": Cookies.get("csrftoken") || "",
      },
    }
  );
  if (response.data) {
    const { access, refresh } = response.data;
    Cookies.remove("access");
    Cookies.remove("refresh");
    Cookies.set("access", access);
    Cookies.set("refresh", refresh);
    return true;
  } else {
    return false;
  }
};

export const apiGoogleLogin = async (access_token: string) => {
  const response = await axiosInstance.post(
    "users/google-login/",
    {
      access_token,
    },
    {
      headers: {
        "X-CSRFToken": Cookies.get("csrftoken") || "",
      },
    }
  );
  if (response.data) {
    const { access, refresh } = response.data;
    Cookies.remove("access");
    Cookies.remove("refresh");
    Cookies.set("access", access);
    Cookies.set("refresh", refresh);
    return true;
  } else {
    return false;
  }
};

export const apiUpdateMe = async ({
  nickname,
  avatar,
}: IUpdateMeFormValues) => {
  const response = await axiosInstance.put(
    "users/me/",
    { nickname, avatar },
    {
      headers: {
        "X-CSRFToken": Cookies.get("csrftoken") || "",
        Authorization: `Bearer ${Cookies.get("access")}`,
      },
    }
  );
  return response.status;
};

export const apiInvalidateUser = async () => {
  const response = await axiosInstance.delete("users/me/", {
    headers: {
      "X-CSRFToken": Cookies.get("csrftoken") || "",
      Authorization: `Bearer ${Cookies.get("access")}`,
    },
  });
  Cookies.remove("access");
  Cookies.remove("refresh");
  return response.status;
};
