import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  value: 0,
};

export const pharmacyStepSlice = createSlice({
  name: 'pharmacyStep',
  initialState,
  reducers: {
    pharmacyUpdateStep: (state, action) => {
      state.value = action.payload;
    },
  },
});

export const { pharmacyUpdateStep } = pharmacyStepSlice.actions;

export const activePharmacyStep = (state) => state.pharmacyStep;

export default pharmacyStepSlice.reducer;
