import { Component } from '@angular/core';
import { ActivatedRoute, ParamMap } from '@angular/router';
import { filter, map, shareReplay, switchMap } from 'rxjs';
import { UsersService } from '@dbh/users/data-access';

@Component({
  selector: 'users-user-detail',
  templateUrl: './user-detail.component.html',
  styleUrls: ['./user-detail.component.scss'],
})
export class UserDetailComponent {
  id = this.route.paramMap;
  user$ = this.route.paramMap.pipe(
    filter((parameters: ParamMap) => parameters.has('id')),
    map((parameters: ParamMap) => parameters.get('id')),
    switchMap((id: string | null) =>
      this.userService.getUser(id ?? 'fake-value')
    ),
    shareReplay(1)
  );

  constructor(
    private route: ActivatedRoute,
    private userService: UsersService
  ) {}
}
