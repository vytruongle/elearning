import { createAsyncThunk } from "@reduxjs/toolkit";
import manageUser from "../../services/manageUser";

export const getLogin = createAsyncThunk(
  "manageUser/getLogin",
  async (payload, { rejectWithValue }) => {
    try {
      const res = await manageUser.getLogin(payload);
      return { userAccount: res?.data, pwd: payload.matKhau };
    } catch (err) {
      return rejectWithValue(err);
    }
  }
);

export const getUpdate = createAsyncThunk(
  "manageUser/getUpdate",
  async (payload, { rejectWithValue }) => {
    try {
      const res = await manageUser.getUpdate(payload);
      return res?.data;
    } catch (err) {
      return rejectWithValue(err);
    }
  }
);

export const getInfomation = createAsyncThunk(
  "manageUser/getInformation",
  async (payload, { rejectWithValue }) => {
    try {
      const res = await manageUser.getInfomation(payload);
      return res?.data;
    } catch (err) {
      return rejectWithValue(err);
    }
  }
);
