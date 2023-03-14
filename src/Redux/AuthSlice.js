import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import db from "../Services/firebaseClient";
import axios from "../Services/AxiosConfig";
import Cookies from "js-cookie";
const baseURL = process.env.REACT_APP_RESOURSE_SERVER;
// Attempt Signup
export const signup = createAsyncThunk(
  "auth/signup",
  async (
    {
      firstName,
      lastName,
      email,
      password,
      phone,
      // gender,
      accountType,
      physicalAddress,
    },
    thunkAPI
  ) => {
    try {
      // Registering with Firebase
      const res = await db.auth.register({
        email: email,
        password: password,
      });
      // Checking if error is returned
      if (res instanceof Error) throw new Error("Couldn't Register");
      // Preparing Data to save in the database
      const data = {
        first_name: firstName,
        last_name: lastName,
        // gender: gender,
        // phone:phone,
        physical_address: physicalAddress,
        is_business_profile: accountType === "business" ? true : false,
        is_personal_profile: accountType === "personal" ? true : false,
        id_token: res,
      };
      // return;
      // Send Data to backend Server
      const backendResponse = await (
        await fetch(baseURL + "signup/firebase/user/", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(data),
        })
      ).json();
      const backendResponseData = backendResponse.data.data;
      // console.log("backendResponse", backendResponseData);
      const userData = {
        core_id: backendResponseData.core_id,
        first_name: backendResponseData.first_name,
        last_name: backendResponseData.last_name,
        physical_address: backendResponseData.physical_address,
        is_business_profile: backendResponseData.is_business_profile,
        is_business_member: backendResponseData.is_business_member,
        is_invited: backendResponseData.is_invited,
        is_personal_profile: backendResponseData.is_personal_profile,
        rT: backendResponseData.token,
        fT: data.id_token,
      };

      localStorage.setItem(
        "FlushAccountType",
        JSON.stringify({
          is_business_profile: backendResponseData.is_business_profile,
          is_business_member: backendResponseData.is_business_member,
          is_invited: backendResponseData.is_invited,
          is_personal_profile: backendResponseData.is_personal_profile,
        })
      );

      localStorage.setItem("rT", backendResponseData.token);
      localStorage.setItem("fT", data.id_token);

      axios.defaults.headers.common[
        "Authorization"
      ] = `Bearer ${backendResponseData.token}`;
      // console.log("Flag1");
      return userData;
    } catch (error) {
      console.error({
        key: "signup",
        content: error || "Something went wrong !",
      });
      return thunkAPI.rejectWithValue(error);
    }
  }
);
export const signupGoogle = createAsyncThunk(
  "auth/signupGoogle",
  async (
    { firstName, lastName, accountType, physicalAddress, token },
    thunkAPI
  ) => {
    try {
      const data = {
        first_name: firstName,
        last_name: lastName,
        // gender: gender,
        physical_address: physicalAddress,
        is_business_profile: accountType === "business" ? true : false,
        is_personal_profile: accountType === "personal" ? true : false,
        id_token: token,
      };
      // return;
      // Send Data to backend Server
      const backendResponse = await axios.post("signup/firebase/user/", data);
      const userData = {
        core_id: backendResponse.data.token[0].data[0].core_id,
        first_name: backendResponse.data.token[0].data[0].first_name,
        last_name: backendResponse.data.token[0].data[0].last_name,
        // gender: backendResponse.data.token[0].data[0].gender,
        physical_address:
          backendResponse.data.token[0].data[0].physical_address,
        is_business_profile:
          backendResponse.data.token[0].data[0].is_business_profile,
        is_business_member:
          backendResponse.data.token[0].data[0].is_business_member,
        is_invited: backendResponse.data.token[0].data[0].is_invited,
        is_personal_profile:
          backendResponse.data.token[0].data[0].is_personal_profile,
        rT: backendResponse.data.token[0].token,
        fT: data.id_token,
      };
      // console.log("userData", userData);
      Cookies.set(
        "FlushAccountType",
        JSON.stringify({
          is_business_profile:
            backendResponse.data.token[0].data[0].is_business_profile,
          is_business_member:
            backendResponse.data.token[0].data[0].is_business_member,
          is_invited: backendResponse.data.token[0].data[0].is_invited,
          is_personal_profile:
            backendResponse.data.token[0].data[0].is_personal_profile,
        })
      );

      Cookies.set("rT", backendResponse.data.token[0].token);
      Cookies.set("fT", data.id_token);
      return userData;
    } catch (error) {
      console.error({
        key: "signup",
        content: error || "Something went wrong !",
      });
      return thunkAPI.rejectWithValue(error);
    }
  }
);
export const signin = createAsyncThunk(
  "auth/signin",
  async ({ email, password }, thunkAPI) => {
    try {
      // Registering with Firebase
      const res = await db.auth.login({
        email,
        password,
      });
      // Checking if error is returned
      if (res instanceof Error) throw new Error("Couldn't Login");
      // Preparing Data to save in the database
      const data = {
        id_token: res.user._delegate.accessToken,
      };
      // Send Data to backend Server
      const backendResponse = await (
        await fetch(baseURL + "firebase/user/signin/", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            // 'Content-Type': 'application/x-www-form-urlencoded',
          },
          body: JSON.stringify(data),
        })
      ).json();
      // console.log("backendResponse", backendResponse);
      const userData = {
        first_name: backendResponse.data.first_name,
        last_name: backendResponse.data.last_name,
        physical_address: backendResponse.data.physical_address,
        is_business_profile: backendResponse.data.is_business_profile,
        is_business_member: backendResponse.data.is_business_member,
        is_invited: backendResponse.data.is_invited,
        is_personal_profile: backendResponse.data.is_personal_profile,
        rT: backendResponse.data.token,
        fT: data.id_token,
      };
      localStorage.setItem(
        "FlushAccountType",
        JSON.stringify({
          is_business_profile: backendResponse.data.is_business_profile,
          is_business_member: backendResponse.data.is_business_member,
          is_invited: backendResponse.data.is_invited,
          is_personal_profile: backendResponse.data.is_personal_profile,
        })
      );
      localStorage.setItem("rT", backendResponse.data.token);
      localStorage.setItem("fT", data.id_token);
      return userData;
    } catch (error) {
      console.error({
        key: "signup",
        content: error || "Something went wrong !",
      });
      return thunkAPI.rejectWithValue(error);
    }
  }
);
export const authorize = createAsyncThunk(
  "auth/authorize",
  async (data, thunkAPI) => {
    try {
      const rT = await localStorage.getItem("rT");
      const fT = await localStorage.getItem("rT");

      // axios.defaults.headers.common["Authorization"] = `Bearer ${rT}`;
      const { data } = await axios.get("user/profile/view/");
      // console.log("profileData", data.data);
      return { rT, fT, profileData: data.data };
    } catch (error) {
      // console.log(error);
      return thunkAPI.rejectWithValue(error);
    }
  }
);
const initialState = { authorizing: true, isAuthorized: false };
export const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    logout: (state) => {
      state.isLoggedIn = false;
      state.isSignUpError = false;
    },
  },
  extraReducers: {
    [authorize.pending]: (state, { payload }) => {
      state.authorizing = true;
      state.isAuthorized = false;
    },
    [authorize.fulfilled]: (state, { payload }) => {
      state.userId = payload.profileData.core_id;
      state.userDetail = payload.profileData;
      state.rT = payload.rT;
      state.fT = payload.fT;
      state.isAuthorized = true;
      state.authorizing = false;
    },
    [authorize.rejected]: (state, { payload }) => {
      state.isAuthorized = false;
      state.authorizing = false;
    },
    [signup.pending]: (state) => {
      state.isSignUpProcessing = true;
    },
    [signup.fulfilled]: (state, { payload }) => {
      state.isSignUpProcessing = false;
      state.userId = payload.core_id;
      state.signUpErrorMessage = "";
      state.isSignUpError = false;
      state.signupSuccess = true;
    },
    [signup.rejected]: (state, { payload }) => {
      state.isSignUpProcessing = false;
      state.signUpErrorMessage = payload.message;
      state.isSignUpError = true;
      state.signupSuccess = false;
    },
    [signupGoogle.pending]: (state) => {
      // state.isSignUpProcessing = true;
    },
    [signupGoogle.fulfilled]: (state, { payload }) => {
      // state.isSignUpProcessing = false;
      state.userId = payload.core_id;
      state.signUpErrorMessage = "";
      state.isSignUpError = false;
      state.signupSuccess = true;
    },
    [signupGoogle.rejected]: (state, { payload }) => {
      // state.isSignUpProcessing = false;
      state.signUpErrorMessage = payload.message;
      state.isSignUpError = true;
      state.signupSuccess = false;
    },

    [signin.pending]: (state) => {
      state.isSignInProcessing = true;
    },
    [signin.fulfilled]: (state, { payload }) => {
      state.isSignInProcessing = false;
      state.userId = payload.core_id;
      state.signInErrorMessage = "";
      state.isSignInError = false;
      state.signInSuccess = true;
      state.rT = payload.rT;
      state.fT = payload.fT;
      state.isAuthorized = true;
    },
    [signin.rejected]: (state, { payload }) => {
      state.isSignInProcessing = false;
      state.signInErrorMessage = payload.message;
      state.isSignInError = true;
      state.signInSuccess = false;
    },
  },
});
// Action creators are generated for each case reducer function
export const { logout } = authSlice.actions;
export default authSlice.reducer;
