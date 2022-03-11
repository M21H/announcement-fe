import TokenService from "../../service/storage.service";
import { IAuthThunk } from "./auth.types";
import AuthService from "../../API/AuthService";
import jwtDecode, { JwtPayload } from "jwt-decode";
import { APIStatusCode } from "../types/APITypes";
import { initializeApp } from "../app/app.action";

type JwtPayloadType = JwtPayload & {
  id: string;
  username: string;
  createdAt: string;
};

const authAction = {
  setAuthData: (
    id: string | null,
    username: string | null,
    createdAt: string | null,
    isAuth: boolean
  ) =>
    ({
      type: "GET_AUTH_USER_DATA_SUCCESS",
      payload: { id, username, createdAt, isAuth },
    } as const),
  setAuthError: (error: string) =>
    ({
      type: "GET_AUTH_USER_DATA_ERROR",
      payload: error,
    } as const),
};

const getAuthUserData = (): IAuthThunk => async (dispatch) => {
  const decoded = jwtDecode<JwtPayloadType>(TokenService.getAuthToken());
  if (decoded) {
    dispatch(
      authAction.setAuthData(
        decoded.id,
        decoded.username,
        decoded.createdAt,
        true
      )
    );
  } else {
    dispatch(authAction.setAuthData(null, null, null, false));
  }
};

const login =
  (username: string, password: string): IAuthThunk =>
  async (dispatch) => {
    const { status, data } = await AuthService.login(username, password);
    if (status === APIStatusCode.Success) {
      dispatch(initializeApp());
    }
    if (status === APIStatusCode.Error) {
      //@ts-ignore
      dispatch(authAction.setAuthError(data?.message?.error));
    }
  };

const register =
  (username: string, password: string, confirmPassword: string): IAuthThunk =>
  async (dispatch) => {
    const { status, data } = await AuthService.register(
      username,
      password,
      confirmPassword
    );
    if (status === APIStatusCode.Success) {
      dispatch(initializeApp());
    }
    if (status === APIStatusCode.Error) {
      //@ts-ignore
      dispatch(authAction.setAuthError(data?.message?.error));
    }
  };

const logout = (): IAuthThunk => async (dispatch) => {
  localStorage.clear();
  dispatch(authAction.setAuthData(null, null, null, false));
	dispatch(authAction.setAuthError(''))
};

export { authAction, getAuthUserData, login, register, logout };
