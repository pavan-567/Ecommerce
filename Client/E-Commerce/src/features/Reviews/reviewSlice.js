import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { getToken } from "../../utils/auth";

const initialState = {
  reviews: [],
  loading: false,
  error: "",
};

export const fetchReviews = createAsyncThunk(
  "reviews/fetchReviews",
  async function () {
    const res = await fetch(`http://127.0.0.1:8000/api/reviews/`);
    const data = await res.json();
    return data;
  }
);

export const fetchReviewsByProduct = createAsyncThunk(
  "reviews/fetchReviewsByProduct",
  async function (productId) {
    const res = await fetch(`http://127.0.0.1:8000/api/reviews/${productId}/`);
    const data = await res.json();
    return data;
  }
);

export const addReview = createAsyncThunk(
  "reviews/addReview",
  async function (review) {
    const res = await fetch(`http://127.0.0.1:8000/api/reviews/create/`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${getToken()?.access}`,
      },
      body: JSON.stringify(review),
    });

    const data = await res.json();
    return data;
  }
);

export function checkAlreadyReviewGiven(productId, username) {
  return function (state) {
    for (let review of state.reviews.reviews) {
      if (review.username === username && review.product === productId)
        return true;
    }
    return false;
  };
}

const reviewSlice = createSlice({
  name: "reviews",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchReviews.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchReviews.fulfilled, (state, action) => {
        state.loading = false;
        state.reviews = action.payload;
      })
      .addCase(fetchReviews.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })
      .addCase(addReview.pending, (state) => {
        state.loading = true;
      })
      .addCase(addReview.fulfilled, (state, action) => {
        state.loading = false;
        state.reviews.push(action.payload);
      })
      .addCase(addReview.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      });
  },
});

export default reviewSlice.reducer;
