// src/features/userSlice.ts
import { createSlice } from '@reduxjs/toolkit';

interface User {
  id: number;
  firstName: string;
  lastName: string;
  status: 'active' | 'inactive';
}

interface UserState {
  users: User[];
}

const initialState: UserState = {
  users: [
  ],
};

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    addUser: (state, action) => {
      state.users.push(action.payload);
    },
    updateUser: (state, action) => {
      const { id, firstName, lastName, status } = action.payload;
      const userIndex = state.users.findIndex(user => user.id === id);
      if (userIndex !== -1) {
        state.users[userIndex] = { id, firstName, lastName, status };
      }
    },
    deleteUser: (state, action) => {
      state.users = state.users.filter(user => user.id !== action.payload);
    },
  },
});

export const { addUser, updateUser, deleteUser } = userSlice.actions;

export default userSlice.reducer;
