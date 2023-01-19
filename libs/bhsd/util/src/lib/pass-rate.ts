import { SubmissionStatus } from '@dbh/bhsd/data-access';

// type PartialSubmissionStatus = Pick<'pass', 'totalRecords'>

export const passRate = ({ pass, totalRecords }: Partial<SubmissionStatus>) =>
  pass && totalRecords ? `${Math.round((pass / totalRecords) * 100)}%` : 'N/A';
