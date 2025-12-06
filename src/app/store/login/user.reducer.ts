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
    on(AuthActions.loginSuccess, (state, { user }) => ({
        ...state,
        user,
        loading: false,
        error: null
    })),
    on(AuthActions.loginFailure, (state, { error }) => ({
        ...state,
        loading: false,
        error: error
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
        error: error
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
        error: error
    }))
);