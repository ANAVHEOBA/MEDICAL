import { configureStore } from '@reduxjs/toolkit';
import doctorStepSlice from './features/doctorStepSlice';
import pharmacyStepSlice from './features/pharmacyStepSlice';

export const store = configureStore({
  reducer: {
    doctorStep: doctorStepSlice,
    pharmacyStep: pharmacyStepSlice,
  },
});

// Note: TypeScript-specific types are removed in JavaScript.
// You can use these types in TypeScript files, but they are not used in plain JavaScript.
