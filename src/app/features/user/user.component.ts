import { Component, inject, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';

import * as UserActions from '../../store/users/user.actions';
import * as UserSelectors from '../../store/users/user.selectors';
import { CreateUserDto, UpdateUserDto, User } from '../../models/user/user.model';
import { UpdateProductDto } from '../../models/product/product.model';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

@Component({
    standalone: true,
    imports: [CommonModule, ReactiveFormsModule, FormsModule],
    selector: 'select-user',
    templateUrl: 'user.component.html',
})

export class UserComponent implements OnInit {
    private store = inject(Store);

    users$ = this.store.select(UserSelectors.selectPagedUsers);
    loading$ = this.store.select(UserSelectors.selectUserLoading);
    // userRole$ = this.store.select(UserSelectors.selectUserRoles);
    userRole$ = this.store.select(UserSelectors.selectUserRoles);

    userRoleId: string | null = null;
    searchQuery = '';

    ngOnInit():void { 
        this.store.dispatch(UserActions.loadUsers());
    }

    applyFilters(): void {
    this.store.dispatch(
      UserActions.setFilters({
        filters: {
          role: this.userRoleId ?? undefined, // undefined when not set
          searchQuery: this.searchQuery.trim() || undefined,
        }
      })
    );
  }

    addUser():void {
        const dto: CreateUserDto = {
            name: 'Loveth Sani',
            email: 'loveth@gmail.com',
            password: 'password123',
            avatar: 'https://images.rawpixel.com/image_800/czNmcy1wcml2YXRlL3Jhd3BpeGVsX2ltYWdlcy93ZWJzaXRlX2NvbnRlbnQvbHIvcm0zMjgtMzY2LXRvbmctMDhfMS5qcGc.jpg'
        };

        this.store.dispatch(UserActions.addUser({userDto: dto}));
    }

    updateUser(user: User): void {
        const changes: UpdateUserDto = {
            name: user.name + 'Updates',
            email: 'updatedemail@gmail.com'
        }
        this.store.dispatch(UserActions.updateUser({id: user.id, change: changes}));
    }

    deleteUser(id: number): void {
        if (confirm('Delete user?')) {
            this.store.dispatch(UserActions.deleteUser({ id: id }))
        }
    }
}