import { inject, Injectable } from "@angular/core";
import * as UserActions from './user.actions';
import { Actions, createEffect, ofType } from "@ngrx/effects";
import { UserService } from "../../service/users/users.service";
import { catchError, map, mergeMap, of, switchMap, tap } from "rxjs";
import { HttpErrorResponse } from "@angular/common/http";
import { ServerError } from "../../models/user/user.model";
import { ToastService } from "../../service/toast/toast.service";
import { ModalService } from "../../service/modal/modal.service";

@Injectable()
export class UserEffects {
    private actions$ = inject(Actions);
    private userService = inject(UserService);
    private toast = inject(ToastService);
    private dialogService = inject(ModalService)

    // Effect for loading all users
    loadUsers$ = createEffect(() => 
        this.actions$.pipe(
            ofType(UserActions.loadUsers),
            switchMap(() => 
                this.userService.getUsers().pipe(
                    map(users => UserActions.loadUserSuccess({ users })),
                    catchError(error => of(UserActions.loadUserFailure({ error })))
                ),
            ),
        ),
    );

    // Effect for creating a User
    addUser$ = createEffect(() => 
        this.actions$.pipe(
            ofType(UserActions.addUser),
            mergeMap(action => 
                this.userService.createUser(action.userDto).pipe(
                    map(user => UserActions.addUserSuccess({ user })),
                    catchError((httpError: HttpErrorResponse) => {
                        let serverError: ServerError = {
                            globalMessage: 'An unknown error occurred. Please try again.',
                            fieldErrors: null
                        };

                        // Attempt to extract the primary message
                        if (httpError.error && httpError.error.message) {
                            serverError.globalMessage = httpError.error.message;
                        } else if (httpError.status >= 500) {
                            serverError.globalMessage = 'Server error. Please try later.';
                        }

                        // Check specifically for validation errors (often status 422)
                        if (httpError.status === 400 && httpError.error ) {
                            // API often returns: { errors: { email: ["message1", ...], password: [...] } }
                            serverError.fieldErrors = httpError.error.message;
                            // serverError.fieldErrors = httpError.error.message[0];
                            // Optional: If validation errors exist, use a generic validation message
                            serverError.globalMessage = 'Please correct the validation errors below.';
                        }

                        // Dispatch the failure action with the structured error
                        return of(UserActions.apiCallFailure({ error: serverError }));
                    }),
                    // catchError(error => of(UserActions.apiCallFailure({ error })))
                ),
            ),
        ),
    );

    // Effect for updating a user
    updateUser$ = createEffect(() => 
        this.actions$.pipe(
            ofType(UserActions.updateUser),
            mergeMap(action => 
                this.userService.updateUser(action.id, action.change).pipe(
                    map(user => UserActions.updateUserSuccess({ user })),
                    catchError(error => of(UserActions.apiCallFailure({ error })))
                ),
            ),
        )
    )

    // Effect for deleting a user
    deleteUser$ = createEffect(() => 
        this.actions$.pipe(
            ofType(UserActions.deleteUser),
            mergeMap(action => 
                this.userService.deleteUser(action.id).pipe(
                    map(() => UserActions.deleteUserSuccess({ id: action.id })),
                    catchError(error => of(UserActions.apiCallFailure({ error })))
                ),
            ),
        )
    )

    // Closes registration modal and displays toast
    registerSuccess$ = createEffect(() => 
        this.actions$.pipe(
            ofType(UserActions.addUserSuccess),
            tap(() => {
                this.toast.success({summary:'registered success', message: 'User created'});
                this.dialogService.closeDialog()
            })
        ), { dispatch: false })
}