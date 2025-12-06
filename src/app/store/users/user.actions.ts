import { createAction, props } from "@ngrx/store";
import { CreateUserDto, ServerError, UpdateUserDto, User, UserFilter } from "../../models/user/user.model";

export const loadUsers = createAction('[User API] Load Users');
export const loadUserSuccess = createAction(
    '[User API] Load User Success',
    props<{ users: User[] }>()
);

export const loadUserFailure = createAction(
    '[User API] Load User Failure',
    props<{ error: any }>()
);

// --- CRUD Operations - Request Actions ---
export const addUser = createAction(
    '[User API] Add User',
    props<{ userDto: CreateUserDto }>()
);

export const updateUser = createAction(
    '[User API] Update User',
    props<{ id: number, change: UpdateUserDto }>()
);

export const deleteUser = createAction(
    '[User API] Delete User',
    props<{ id: number }>()
);

// --- CRUD Operations - API Response Actions ---
export const addUserSuccess = createAction(
     '[User API] Add User Success',
    props<{ user: User }>()
);

export const updateUserSuccess = createAction(
    '[User API] Update User Success',
    props<{ user: User }>()
);

export const deleteUserSuccess = createAction(
    '[User API] Delete User Success',
    props<{ id: number }>()
);

// Generic Failure action for all CRUD operations
export const apiCallFailure = createAction(
  '[User API] CRUD Operation Failure',
  props<{ error: ServerError }>()
);

// --- Filters & Pagination ---
export const setFilters =  createAction(
    '[User UI] Set Filter',
    props<{ filters: UserFilter }>()
);

export const setPage = createAction(
  '[User UI] Set Page',
  props<{ page: number }>()
);

export const setPageSize = createAction(
  '[User UI] Set Page Size',
  props<{ size: number }>()
);
