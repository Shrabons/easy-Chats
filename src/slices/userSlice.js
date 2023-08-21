import { createSlice } from '@reduxjs/toolkit'

export const userSlice = createSlice({
  name: 'user',
  initialState: {
    userInfo: localStorage.getItem("userEasychat") ? JSON.parse(localStorage.getItem("userEasychat")) : "check",
    active: localStorage.getItem("activeChatname") ? JSON.parse(localStorage.getItem("activeChatname")) : "check",
  },

  reducers: {
    userLogindata: (state, Action) => {
      state.userInfo = Action.payload
    },
    activeChat: (state, Action) => {
      state.active = Action.payload
      
    },
  },
})

// Action creators are generated for each case reducer function
export const { userLogindata,activeChat } = userSlice.actions

export default userSlice.reducer