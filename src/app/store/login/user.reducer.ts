import { createReducer, on } from "@ngrx/store";
import { initialLoginState } from "../../models/Login/LoginData.mode";
import { AuthActions } from "./login.actions";


export const initialState = createReducer(
    initialLoginState,
    
    // Login Reducers
    on(AuthActions.login, (state) => ({
        ...state,
        loading: true,
        error: null
    })),
    on(AuthActions.loginSuccess, (state, { user, access_token, refresh_token }) => ({
        ...state,
        user,
        access_token,
        refresh_token,
        loading: false,
        error: null
    })),
    on(AuthActions.loginFailure, (state, { error }) => ({
        ...state,
        loading: false,
        error: { globalMessage: error, fieldErrors: null }
    })),

    // Register Reducers
    on(AuthActions.register, (state) => ({
        ...state,
        loading: true,
        error: null
    })),
    on(AuthActions.registerSuccess, (state, { user }) => ({
        ...state,
        user,
        error: null,
        loading: false
    })),
    on(AuthActions.registerFailure, (state, { error }) => ({
        ...state,
        loading: false,
        error: { globalMessage: "Something went wrong. Please log in again.", fieldErrors: null }
    })),

    // Forgot Password Reducers
    on(AuthActions.forgetPassword, (state) => ({
        ...state,
        loading: true,
        error: null,
        message: null
    })),
    on(AuthActions.forgetPasswordSuccess, (state, { message }) => ({
        ...state,
        loading: false,
        message: message
    })),
    on(AuthActions.forgetPasswordFailure, (state, { error }) => ({
        ...state,
        loading: false,
        error: { globalMessage: "Session expired. Please log in again.", fieldErrors: null }
    })),

    on(AuthActions.localStorageSuccess, (state, { access_token, refresh_token }) => ({
        ...state,
        access_token,
        refresh_token,
        loading: false,
        error: null
    })),


    on(AuthActions.refreshTokenSuccess, (state, { access_token, refresh_token }) => ({
        ...state,
        access_token,
        refresh_token,
        loading: false,
        error: null
    })),
    on(AuthActions.refreshTokenFailure, (state) => ({
        ...state,
        user: null,
        accessToken: null,
        refreshToken: null,
        loading: false,
        error: { globalMessage: "Session expired. Please log in again.", fieldErrors: null }
    })),


    on(AuthActions.logout, (state) => ({
        ...state,
        loading: true, // Optional: show loading while clearing API/storage
        error: null,
        message: null
    })),
    on(AuthActions.logoutConfirmed, (state) => ({
        ...state,
        user: null, // Clear user data
        accessToken: null, // Clear access token
        refreshToken: null, // Clear refresh token
        loading: false, // Stop loading
    })),
);