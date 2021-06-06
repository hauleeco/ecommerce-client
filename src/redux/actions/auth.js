import * as Types from "../../constants/ActionType";
import callApi from "../../utils/apiCaller";
import callApiOpenId from "../../utils/apiCallerOpenId";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { config } from "../../config";

export const actCheckClientOpenIdRequest = (payload) => {
  return async (dispatch) => {
    const client_id = config.apiOpenId.clientId;
    const state = config.apiOpenId.state;
    const getClient = await callApiOpenId(
      `users/check?response_type=code&scope=openid&client_id=${client_id}&state=${state}`,
      "POST",
      payload
    );
    if(getClient && getClient.data ) {
      const tokenRequestPayload = {
        grant_type: "authorization_code",
        code: getClient.data.code,
        state: getClient.data.state
      };
      const getToken = await callApiOpenId(
        "users/getToken",
        "POST",
        tokenRequestPayload
      );
      const res = await callApi("auth/loginWithOpenId", "POST", {id_token: getToken.data.id_token});
      if (res && res.data.token) {
        const token = res.data.token;
        localStorage.setItem("_auth", token);
        dispatch(actLogin(token));
      }
    }
  };
};

export const actLoginRequest = (user) => {
  return async (dispatch) => {
    const res = await callApi("auth/login", "POST", user);
    if (res && res.data.token) {
      const token = res.data.token;
      localStorage.setItem("_auth", token);
      dispatch(actLogin(token));
    }
  };
};

export const actLogin = (token) => {
  return {
    type: Types.LOGIN,
    token,
  };
};

export const actRegisterRequest = (user) => {
  return async () => {
    const res = await callApi("auth/register", "POST", user);
    if (res && res.status === 200) {
      toast.success("Registration successful");
    }
  };
};

export const actTokenRequest = (token) => {
  return async (dispatch) => {
    dispatch(actToken(token));
  };
};

export const actToken = (token) => {
  return {
    type: Types.TOKEN_REDUX,
    token,
  };
};

export const actForgotPasswordRequest = (email) => {
  return async () => {
    const res = await callApi("auth/forgotPassword", "POST", email);
    if (res && res.status === 200) {
      toast.success("Reset password is successful, please check your email!");
    }
  };
};

export const actUpdateMeRequset = (data, token) => {
  return async (dispatch) => {
    const res = await callApi("users/me", "PUT", data, token);
    if (res && res.status === 200) {
      toast.success("Update user is success");
    }
  };
};

export const actChangePasswordMeRequset = (data, token) => {
  return async (dispatch) => {
    const res = await callApi("users/me/changePassword", "PUT", data, token);
    if (res && res.status === 200) {
      toast.success("Change password is success");
    }
  };
};
