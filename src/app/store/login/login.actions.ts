import { createAction, createActionGroup, emptyProps, props } from "@ngrx/store";
import { loginRequest, RegisterRequest, ServerError, User } from "../../models/Login/LoginData.mode";

export const AuthActions = createActionGroup({
    source: 'Auth',
    events: {
        // login flow
        'Login': props<{ request: loginRequest }>(),
        'Login Success': props<{ user: User, access_token: string, refresh_token: string }>(),
        'Login Failure': props<{ error: ServerError }>(),

        // Logout Flow
        'Logout': emptyProps(),
        'Logout Confirmed': emptyProps(),

        // Token Refresh Flow (Handles 401 response)
        'Refresh Token' : props<{ refreshToken: string }>(),
        'Refresh Token Success' : props<{ access_token: string, refresh_token:string }>(),
        'Refresh Token Failure': emptyProps(),

        // Register flow
        'Register' : props<{ request: RegisterRequest }>(),
        'Register Success' : props<{ user: User }>(),
        'Register Failure' : props<{ error: ServerError }>(),

        // Forget Password
        'Forget Password' : props<{ email: string }>(),
        'Forget Password Success' : props<{ message: string }>(),
        'Forget Password Failure' : props<{ error: ServerError }>(),

        // For Rehydrating State on App Load
        'Check Local Storage': emptyProps(),
        'Local Storage Success': props<{ access_token: string, refresh_token: string }>(),

        // Utility
        'Clear Errors': emptyProps()
    }
});