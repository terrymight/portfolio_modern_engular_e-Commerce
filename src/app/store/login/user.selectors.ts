import { createFeatureSelector, createSelector } from "@ngrx/store";
import { loginState } from "../../models/Login/LoginData.mode";

export const selectAuthState = createFeatureSelector<loginState>('auth');

export const selectIsLoading = createSelector(
    selectAuthState,
    (state) => state.loading
);

export const selectAuthError = createSelector(
    selectAuthState,
    (state) => state.error
);

export const selectAuthMessage = createSelector(
    selectAuthState,
    (state) => state.message
);

export const selectIsAuthenticated = createSelector(
    selectAuthState,
    (state) => !!state.access_token && !!state.refresh_token
);

export const selectAccessToken = createSelector(
    selectAuthState,
    (state) => state.access_token
);

export const selectRefreshToken = createSelector(
    selectAuthState,
    (state) => state.refresh_token
);