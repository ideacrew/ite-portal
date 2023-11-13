import { SubmissionStatus } from '@dbh/bhsd/data-access';

export const passRate = ({ pass, totalRecords }: Partial<SubmissionStatus>) => {
  if (pass && totalRecords) {
    return `${Math.round((pass / totalRecords) * 1000) / 10}%`;
  } else if (totalRecords && !pass) {
    return '0%';
  } else {
    return 'N/A';
  }
};
