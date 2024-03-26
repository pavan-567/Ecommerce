import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { fetchAddress } from "../../services/apiAddress";
import { getAddresses, getSelectedAddr } from "../../utils/Address";

const initialState = {
  addresses: [],
  selectedAddr: null,
  loading: false,
  error: null,
  editAddr: null,
};

export const fetchAddresses = createAsyncThunk(
  "addresses/fetchAddress",
  fetchAddress
);

const addressSlice = createSlice({
  name: "address",
  initialState,
  reducers: {
    addAddress(state, action) {
      state.addresses.push(action.payload);
      if (state.addresses.length === 1) state.selectedAddr = action.payload.id;
    },

    addAllAddress(state, action) {
      state.addresses = action.payload;
      if (action.payload)
        action.payload.forEach((address) => {
          if (address.defaultAddress === true) {
            state.selectedAddr = address.id;
            localStorage.setItem(
              "selectedAddr",
              JSON.stringify({ id: address.id })
            );
          }
        });

      localStorage.setItem("address", JSON.stringify(action.payload));
    },
    removeAddress(state, action) {
      // Action
      state.addresses = state.addresses.filter(
        (address) => address.id !== action.payload
      );
      if (state.addresses.length === 0) {
        state.selectedAddr = null;
        state.editAddr = null;
      }
    },
    selectAddress(state, action) {
      // Action == id
      state.selectedAddr = action.payload;
      // state.addresses = state.addresses.map((address) => {
      //   if (address.id === action.payload) {
      //     address.defaultAddress = true;
      //   }
      //   return address;
      // });
    },
    editAddress(state, action) {
      state.editAddr = action.payload;
    },
    removeEditAddress(state) {
      state.editAddr = null;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(fetchAddresses.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(fetchAddresses.fulfilled, (state, action) => {
      state.loading = false;
      state.addresses = action.payload;
    });
    builder.addCase(fetchAddresses.rejected, (state, action) => {
      state.loading = false;
      state.addresses = [];
      state.error = action.error.message;
    });
  },
});

export function getSelectedAddress() {
  return function (state) {
    return state.address.selectedAddr;
  };
}

export function getAllAddress() {
  return function (state) {
    return state.address.addresses;
  };
}

export function getAddress(id) {
  return function (state) {
    return state.address.addresses?.find((address) => address.id === id);
  };
}

export const {
  addAddress,
  addAllAddress,
  removeAddress,
  selectAddress,
  editAddress,
} = addressSlice.actions;
export default addressSlice.reducer;
