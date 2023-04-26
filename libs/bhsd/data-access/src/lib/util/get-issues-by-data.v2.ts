/* eslint-disable unicorn/consistent-destructuring */
/* eslint-disable @typescript-eslint/naming-convention */
import {
  ErrorType,
  ExtractRecordField,
  ExtractRecordValidation,
  ExtractRecordValidationV2,
  ExtractRecordValidationFlatPayload,
  ExtractRecordValidationRecordCounts,
  ExtractSubmissionResponse,
  ExtractSubmissionResponseV2,
  ExtractSubmissionResponseV3,
  Validation,
  ValidationMessage,
  ValidationV2,
} from '../models';

export const convertValidationToValidationV2 = (
  validation: Validation,
  errorType: ErrorType
): ValidationV2 => {
  const { text, category } = getMessageFromValidation(validation);

  return {
    errorType,
    fieldName: getFieldNameFromValidation(validation),
    text,
    category,
  };
};

export const getFieldNameFromValidation = (
  validation: Validation
): ExtractRecordField => (Object.keys(validation) as ExtractRecordField[])[0];

export const getMessageFromValidation = (
  validation: Validation
): ValidationMessage => {
  const fieldName = getFieldNameFromValidation(validation);
  const message = validation[fieldName] as ValidationMessage;

  return message;
};

export const convertRecordValidationToV2 = (
  recordValidation: ExtractRecordValidation
): ExtractRecordValidationV2 => {
  // eslint-disable-next-line @typescript-eslint/naming-convention
  const { critical_errors, fatal_errors, warnings, ...leftOver } =
    recordValidation;

  const criticalErrors = critical_errors.map((validation) =>
    convertValidationToValidationV2(validation, 'Critical')
  );
  const fatalErrors = fatal_errors.map((validation) =>
    convertValidationToValidationV2(validation, 'Fatal')
  );
  const warningErrors = warnings.map((validation) =>
    convertValidationToValidationV2(validation, 'Warning')
  );

  return {
    ...leftOver,
    errors: [...criticalErrors, ...fatalErrors, ...warningErrors],
  };
};

export const convertExtractSubmissionToV2 = (
  submissionResponse: ExtractSubmissionResponse
): ExtractSubmissionResponseV2 => {
  const { records } = submissionResponse;

  const recordsV2 = records.map((record) =>
    convertRecordValidationToV2(record)
  );

  return { ...submissionResponse, records: recordsV2 };
};

export const convertRecordValidationToV3 = (
  recordValidation: ExtractRecordValidationV2
): ExtractRecordValidationFlatPayload => {
  // eslint-disable-next-line @typescript-eslint/naming-convention
  const { status, errors, payload } = recordValidation;
  return { errors, status, ...payload };
};

export const convertExtractSubmissionToFailedCsv = (
  submissionResponse: ExtractSubmissionResponseV2
): ExtractSubmissionResponseV3 => {
  const { records } = submissionResponse;
  console.log(records);
  console.log(submissionResponse);
  const recordsV2 = records
    .map((record) => convertRecordValidationToV3(record))
    .filter((record) => record.errors.length > 0);

  return { ...submissionResponse, records: recordsV2 };
};

export const convertRecordValidationToV4 = (
  recordValidation: ExtractRecordValidationV2
): ExtractRecordValidationRecordCounts => {
  const { client_id, admission_date, record_type, treatment_setting } =
    recordValidation.payload;
  const { status } = recordValidation;

  const recordId = `${client_id ?? 'no-client-id'}_${
    admission_date ?? 'no-admission-date'
  }_${record_type ?? 'no-record-type'}${
    treatment_setting ?? '_no-treatment-setting'
  }`;

  const fatal_error_count = recordValidation.errors.filter(
    (error: ValidationV2) => error.errorType === 'Fatal'
  ).length;

  const critical_error_count = recordValidation.errors.filter(
    (error: ValidationV2) => error.errorType === 'Critical'
  ).length;

  const warning_count = recordValidation.errors.filter(
    (error: ValidationV2) => error.errorType === 'Warning'
  ).length;

  return {
    record_id: recordId,
    fatal_error_count,
    critical_error_count,
    warning_count,
    status,
  };
};

export const convertExtractSubmissionToIssuesByRecord = (
  submissionResponse: ExtractSubmissionResponseV2
): ExtractSubmissionResponseV3 => {
  const { records } = submissionResponse;

  const sortedRecords = records.sort((recordA, recordB) => {
    const countOfRecordAFatalErrors = recordA.errors.filter(
      (error) => error.errorType === 'Fatal'
    ).length;
    const countOfRecordBFatalErrors = recordB.errors.filter(
      (error) => error.errorType === 'Fatal'
    ).length;

    const countOfRecordACriticalErrors = recordA.errors.filter(
      (error) => error.errorType === 'Critical'
    ).length;
    const countOfRecordBCriticalErrors = recordB.errors.filter(
      (error) => error.errorType === 'Critical'
    ).length;

    const countOfWarningsA = recordA.errors.filter(
      (error) => error.errorType === 'Warning'
    ).length;
    const countOfWarningsB = recordB.errors.filter(
      (error) => error.errorType === 'Warning'
    ).length;

    // If fatal error counts are equal, use critical errors, but if those are the same
    // use warnings to determine order
    if (countOfRecordAFatalErrors === countOfRecordBFatalErrors) {
      if (countOfRecordACriticalErrors === countOfRecordBCriticalErrors) {
        return countOfWarningsA > countOfWarningsB ? -1 : 1;
      } else {
        return countOfRecordACriticalErrors > countOfRecordBCriticalErrors
          ? -1
          : 1;
      }
    } else {
      return countOfRecordAFatalErrors > countOfRecordBFatalErrors ? -1 : 1;
    }
  });

  const recordsV2 = sortedRecords.map((record) =>
    convertRecordValidationToV4(record)
  );

  return { ...submissionResponse, records: recordsV2 };
};
