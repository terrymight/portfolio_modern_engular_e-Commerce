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
