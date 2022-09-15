import {
  ExistingSubmission,
  ExpectingSubmission,
  SubmissionStatus,
  SubmissionSummary,
} from '../models';

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

  if (status === 'Expecting Submission') {
    const expectingSubmission: ExpectingSubmission = {
      status,
      providerName,
      mh,
      sud,
    };

    return expectingSubmission;
  } else {
    const existingSubmission: ExistingSubmission = {
      status,
      providerName,
      mh,
      sud,
      submittedOn,
      fileName,
      totalRecords: Number(totalRecords),
      pass: Number(pass),
      fail: Number(fail),
      extractId: extractId.$oid,
    };

    return existingSubmission;
  }
};
