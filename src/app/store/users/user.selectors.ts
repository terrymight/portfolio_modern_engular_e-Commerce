// store/users/user.selectors.ts
import { createFeatureSelector, createSelector } from "@ngrx/store";
import { UserState } from "../../models/user/user.model";

export const selectUserState = createFeatureSelector<UserState>('users');

// Basic Selectors
export const selectAllUsers = createSelector(
  selectUserState,
  (state) => state.items
);

export const selectPagination = createSelector(
  selectUserState,
  (state) => state.pagination
);

export const selectUserFilter = createSelector(
  selectUserState,
  (state) => state.filters
);

// Filtered list selector (search + role + simple date filter example)
export const selectFilteredUsers = createSelector(
  selectAllUsers,
  selectUserFilter,
  (users, filter) => {
    if (!filter || (!filter.searchQuery && !filter.role && !filter.name && !filter.email && !filter.startDate && !filter.endDate)) {
      return users;
    }

    const q = filter.searchQuery?.trim().toLowerCase();

    return users.filter(user => {
      // Role filter
      if (filter.role && filter.role !== '' && user.role !== filter.role) {
        return false;
      }

      // Name filter (exact or partial)
      if (filter.name) {
        if (!user.name.toLowerCase().includes(String(filter.name).toLowerCase())) return false;
      }

      // Email filter
      if (filter.email) {
        if (!user.email.toLowerCase().includes(filter.email.toLowerCase())) return false;
      }

      // SearchQuery: check name, email, role
      if (q) {
        const matchName = user.name?.toLowerCase().includes(q);
        const matchEmail = user.email?.toLowerCase().includes(q);
        const matchRole = user.role?.toLowerCase().includes(q);
        if (!matchName && !matchEmail && !matchRole) return false;
      }

      // Date range example (assuming creationAt is ISO string)
      if (filter.startDate) {
        const created = new Date(user.creationAt);
        if (created < filter.startDate) return false;
      }
      if (filter.endDate) {
        const created = new Date(user.creationAt);
        if (created > filter.endDate) return false;
      }

      return true;
    });
  }
);

// Unique roles selector
export const selectUserRoles = createSelector(
  selectAllUsers,
  (users) => {
    const set = new Set<string>();
    users.forEach(u => {
      if (u.role) set.add(u.role);
    });
    return Array.from(set); // returns list of roles, e.g. ['customer', 'admin']
  }
);

// Loading
export const selectUserLoading = createSelector(
  selectUserState,
  (state) => state.loading
);

// Paginated selector: apply pagination to filtered users
export const selectPagedUsers = createSelector(
  selectFilteredUsers,
  selectPagination,
  (filtered, pagination) => {
    const start = (pagination.currentPage - 1) * pagination.itemsPerPage;
    return filtered.slice(start, start + pagination.itemsPerPage);
  }
);
