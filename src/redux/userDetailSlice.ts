import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { IDetailedUser } from "../utils/types";

const userDetailsSlice = createSlice({
  name: 'userDetails',
  initialState: {
    details: {
      login: '',
      id: 0,
      node_id: '',
      avatar_url: '',
      gravatar_id: null,
      url: '',
      html_url: '',
      followers_url: '',
      following_url: '',
      gists_url: '',
      starred_url: '',
      subscriptions_url: '',
      organizations_url: '',
      repos_url: '',
      events_url: '',
      received_events_url: '',
      type: '',
      site_admin: false,
      name: null,
      company: null,
      blog: null,
      location: '',
      email: null,
      hireable: null,
      bio: null,
      twitter_username: null,
      public_repos: 0,
      public_gists: 0,
      followers: 0,
      following: 0,
      created_at: '',
      updated_at: ''
    }
  },
  reducers: {
    setUserDetails: (state, action: PayloadAction<IDetailedUser>) => {
      state.details.avatar_url = action.payload.avatar_url;
      state.details.login = action.payload.login;
      state.details.location = action.payload.location ? action.payload.location : "Не указана";
      state.details.followers = action.payload.followers;
      state.details.public_repos = action.payload.public_repos;
    },
    clearUserDetails: (state) => {
      state.details.avatar_url = '';
      state.details.login = '';
      state.details.location = '';
      state.details.followers = 0;
      state.details.public_repos = 0;
    },
  },
});

export const { setUserDetails, clearUserDetails } = userDetailsSlice.actions;
export default userDetailsSlice.reducer;