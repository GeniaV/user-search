import { sendLoginForSearching } from "./loginSearchSlice";
import loginSearchReducer from "./loginSearchSlice";

describe('LoginSearch reducer', () => {
  const initialState = {
    loginName: ' '
  };

  it('should handle sendLoginForSearching', () => {
    const loginName = 'GeniaV';
    const action = sendLoginForSearching(loginName);
    const state = loginSearchReducer(initialState, action);

    expect(state.loginName).toBe(loginName);
  });
});