import { createSlice } from '@reduxjs/toolkit'
import { RootState } from '../store'
import { User } from '../../src/utils/types'
const authSlice = createSlice({

    name: 'auth',
    initialState: {
        user: null
    },
    reducers: {
        Login: (state, action) => {

            const { user } = action.payload
            state.user = user
        },
        logout: (state) => {

            state.user = null
        }
    }
})

export const { logout, Login } = authSlice.actions
export default authSlice.reducer
export const getCurrentUser = (state: RootState) => state.auth.user as unknown as User