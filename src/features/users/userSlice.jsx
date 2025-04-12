import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { auth, db } from "../../firebase";
import { doc, getDoc, setDoc } from "firebase/firestore";

export const fetchUser = createAsyncThunk("user/fetchUser", async () => {
  const user = auth.currentUser;
  if (!user) throw new Error("User not authenticated");

  const docRef = doc(db, "users", user.uid);
  const docSnap = await getDoc(docRef);

  return docSnap.exists()
    ? docSnap.data()
    : {
        email: user.email,
        name: user.displayName || "",
      };
});

export const updateUser = createAsyncThunk("user/updateUser", async (updatedData) => {
  const user = auth.currentUser;
  const docRef = doc(db, "users", user.uid);
  await setDoc(docRef, updatedData, { merge: true });
  return updatedData;
});

const userSlice = createSlice({
  name: "user",
  initialState: {
    loading: false,
    error: null,
    data: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchUser.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchUser.fulfilled, (state, action) => {
        state.loading = false;
        state.data = action.payload;
      })
      .addCase(fetchUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })
      .addCase(updateUser.fulfilled, (state, action) => {
        state.data = { ...state.data, ...action.payload };
      });
  },
});

export default userSlice.reducer;
