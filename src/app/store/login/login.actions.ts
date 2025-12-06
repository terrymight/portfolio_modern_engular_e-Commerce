import { createAction, createActionGroup, emptyProps, props } from "@ngrx/store";
import { loginRequest, RegisterRequest, User } from "../../models/Login/LoginData.mode";

export const AuthActions = createActionGroup({
    source: 'Auth',
    events: {
        // login flow
        'Login': props<{ request: loginRequest }>(),
        'Login Success': props<{ user: User }>(),
        'Login Failure': props<{ error: string }>(),

        // Register flow
        'Register' : props<{ request: RegisterRequest }>(),
        'Register Success' : props<{ user: User }>(),
        'Register Failure' : props<{ error: string }>(),

        // Forget Password
        'Forget Password' : props<{ email: string }>(),
        'Forget Password Success' : props<{ message: string }>(),
        'Forget Password Failure' : props<{ error: string }>(),

        // Utility
        'Clear Errors': emptyProps()
    }
});