// /* eslint-disable arrow-body-style */
// /* eslint-disable unicorn/consistent-function-scoping */
// import { inject, Injectable } from '@angular/core';
// import { HttpErrorResponse } from '@angular/common/http';
// import { ComponentStore, tapResponse } from '@ngrx/component-store';
// import { Store } from '@ngrx/store';
// import { filter, Observable, switchMap } from 'rxjs';

// import {
//   BHSDService,
//   convertExtractSubmissionToV2,
//   ExtractSubmissionResponse,
//   ExtractSubmissionResponseV2,
// } from '@dbh/bhsd/data-access';
// import { selectRouteParam } from '@dbh/shared/state/root-store';

// export type SubmissionState = {
//   submission: ExtractSubmissionResponse | undefined;
// };

// @Injectable()
// export class SubmissionStore extends ComponentStore<SubmissionState> {
//   bhsdService = inject(BHSDService);
//   store = inject(Store);

//   submissionId$: Observable<string> = this.store
//     .select('63c03f08fca84e2196485d50')
//     .pipe(filter(Boolean));

//   constructor() {
//     super({ submission: undefined });

//     // When this service is injected this will run
//     // But it may be better to have this called in the component
//     // that injects the service
//     this.getSubmission(this.submissionId$);
//   }

//   readonly submission$: Observable<ExtractSubmissionResponse> = this.select(
//     (state) => state.submission
//   ).pipe(filter(Boolean));

//   readonly setSubmission = this.updater(
//     (state, submission: ExtractSubmissionResponse) => ({
//       submission,
//     })
//   );

//   readonly submissionV2$: Observable<ExtractSubmissionResponseV2> = this.select(
//     this.submission$,
//     (submission) => convertExtractSubmissionToV2(submission)
//   );

//   readonly getSubmission = this.effect((submissionId$: Observable<string>) => {
//     return submissionId$.pipe(
//       switchMap((id) =>
//         this.bhsdService.getExtractSubmission(id).pipe(
//           tapResponse(
//             (submission) => this.setSubmission(submission),
//             (errors: HttpErrorResponse) => console.error(errors)
//           )
//         )
//       )
//     );
//   });
// }
