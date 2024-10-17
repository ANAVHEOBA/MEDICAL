import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  value: 0,
};

export const doctorStepSlice = createSlice({
  name: 'doctorStep',
  initialState,
  reducers: {
    updateStep: (state, action) => {
      state.value = action.payload;
    },
  },
});

export const { updateStep } = doctorStepSlice.actions;

export const activeDoctorStep = (state) => state.doctorStep;

export default doctorStepSlice.reducer;
