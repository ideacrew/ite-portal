import { SubmissionStatus } from '@dbh/bhsd/data-access';

import { passRate } from './pass-rate';

describe('Pass Rate data transform', () => {
  it('transforms data with values', () => {
    const mockSubmission: Partial<SubmissionStatus> = {
      pass: 10,
      totalRecords: 20,
    };

    expect(passRate(mockSubmission)).toEqual('50%');
  });

  it('transforms data with values', () => {
    const mockSubmission: Partial<SubmissionStatus> = {
      pass: 10,
    };

    expect(passRate(mockSubmission)).toEqual('N/A');
  });
});
