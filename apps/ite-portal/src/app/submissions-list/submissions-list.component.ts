import { HttpClient } from '@angular/common/http';
import { ChangeDetectionStrategy, Component } from '@angular/core';
import { map, Observable } from 'rxjs';
import { ExtractSubmission } from '../ingest-extract';

@Component({
  templateUrl: './submissions-list.component.html',
  styleUrls: ['./submissions-list.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SubmissionsListComponent {
  submissions$: Observable<ExtractSubmission[]> = this.http
    .get<ExtractSubmission[]>('https://ite-api.herokuapp.com/api/v1/extracts')
    .pipe(map((extracts) => extracts.slice(0, 10)));

  constructor(private http: HttpClient) {}
}
