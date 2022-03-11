import { getAuthUserData } from "../auth/auth.actions";
import { IAppThunk } from "./app.types";

const appAction = {
  initializedSuccess: () => ({ type: "INITIALIZED_SUCCESS" } as const),
  initializedFail: () => ({ type: "INITIALIZED_FAIL" } as const),
};

const initializeApp =
  (): IAppThunk =>
    (dispatch): any => {
      dispatch(getAuthUserData());
      dispatch(appAction.initializedSuccess());
    };

export { appAction, initializeApp };
