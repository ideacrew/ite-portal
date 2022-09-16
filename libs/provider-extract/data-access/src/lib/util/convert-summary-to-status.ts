import { SubmissionStatus, SubmissionSummary } from '../models';

export const convertSummaryToStatus = (
  summary: SubmissionSummary
): SubmissionStatus => {
  const {
    status,
    provider_name: providerName,
    mh,
    sud,
    submitted_on: submittedOn,
    file_name: fileName,
    total_records: totalRecords,
    pass,
    fail,
    extract_id: extractId,
  } = summary;

  const submissionStatus: SubmissionStatus = {
    status,
    providerName,
    mh,
    sud,
    fileName: fileName === 'N/A' ? undefined : fileName,
    submittedOn: submittedOn === 'N/A' ? undefined : submittedOn,
    totalRecords: totalRecords === 'N/A' ? undefined : Number(totalRecords),
    pass: pass === 'N/A' ? undefined : Number(pass),
    fail: fail === 'N/A' ? undefined : Number(fail),
    extractId: extractId.$oid === 'N/A' ? undefined : extractId.$oid,
  };

  return submissionStatus;
};
