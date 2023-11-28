import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';

type ProfileType = {
  givenName?: string;
  surname?: string;
  userPrincipalName?: string;
  id?: string;
};

@Component({
  selector: 'app-profile',
  template: `
    <div>
      <p><strong>First Name: </strong> {{ profile?.givenName }}</p>
      <p><strong>Last Name: </strong> {{ profile?.surname }}</p>
      <p><strong>Email: </strong> {{ profile?.userPrincipalName }}</p>
      <p><strong>Id: </strong> {{ profile?.id }}</p>
    </div>
  `,
  styleUrls: [],
  standalone: true,
})
export class ProfileComponent implements OnInit {
  profile: ProfileType | undefined;

  constructor(private http: HttpClient) {}

  ngOnInit() {
    this.getProfile(environment.apiConfig.uri);
  }

  getProfile(url: string) {
    this.http.get(url).subscribe((profile) => {
      this.profile = profile;
    });
  }
}
