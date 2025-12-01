
import { createReducer, on } from '@ngrx/store';
import * as UserActions from './user.actions';
import { initialUserState } from '../../models/user/user.model';

export const UserReducer = createReducer(
    initialUserState,

    // Loading
    on(UserActions.loadUsers, (state) => ({
        ...state,
        loading: true,
        error: null
    })),

    on(UserActions.loadUserSuccess, (state, { users }) => ({
        ...state,
        loading: false,
        items: users
    })),
    on(UserActions.loadUserFailure, (state, { error }) => ({
        ...state,
        loading: false,
        error,
    })),

    // CRUD success
    on(UserActions.addUserSuccess, (state, {user}) => ({
        ...state,
        items: [user, ...state.items]
    })),
    on(UserActions.updateUserSuccess, (state, { user }) => ({
        ...state,
        items: state.items.map((i) => (i.id === user.id ? user : i))
    })),
    on(UserActions.deleteUserSuccess, (state, { id }) => ({ 
        ...state,
        items: state.items.filter((i) => i.id !== id )
     })),

     // API Failure
     on(UserActions.apiCallFailure, (state, { error }) => ({
        ...state,
        error
     })),

     // Filters
     on(UserActions.setFilters, (state, { filters }) => ({
        ...state,
        filters,
        pagination: {
            ...state.pagination,
            currentPage: 1 // reset to first page when filters change
        }
     })),

     // Pagination
     on(UserActions.setPage, (state, { page }) => ({
        ...state,
        pagination: {
            ...state.pagination,
            currentPage: page
        }
     })),
     on(UserActions.setPageSize, (state, { size }) => ({
        ...state,
        pagination: {
            ...state.pagination,
            itemsPerPage: size,
            currentPage: 1
        }
     }))
);