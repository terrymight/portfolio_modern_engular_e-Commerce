import { inject, Injectable } from "@angular/core";
import * as UserActions from './user.actions';
import { Actions, createEffect, ofType } from "@ngrx/effects";
import { UserService } from "../../service/users/users.service";
import { catchError, map, mergeMap, of, switchMap } from "rxjs";

@Injectable()
export class UserEffects {
    private actions$ = inject(Actions);
    private userService = inject(UserService);

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
                    catchError(error => of(UserActions.apiCallFailure({ error })))
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
}