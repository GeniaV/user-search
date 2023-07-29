import { getUserInfo } from "../../utils/api";
import { AppDispatch } from "../store";
import { setUserDetails } from "../userDetailSlice";

export const fetchUserDetails = (username: string) => async (dispatch: AppDispatch) => {
  try {
    const response = await getUserInfo(username);
    dispatch(setUserDetails(response));
  } catch (error) {
    console.log(error);
  }
};