import {
  ErrorType,
  ExtractRecordField,
  ExtractRecordValidation,
  ExtractRecordValidationV2,
  ExtractSubmissionResponse,
  ExtractSubmissionResponseV2,
  Validation,
  ValidationMessage,
  ValidationV2,
} from './models';

export const convertValidationToValidationV2 = (
  validation: Validation,
  errorType: ErrorType
): ValidationV2 => {
  return {
    errorType,
    fieldName: getFieldNameFromValidation(validation),
    message: getMessageFromValidation(validation),
  };
};

export const getFieldNameFromValidation = (
  validation: Validation
): ExtractRecordField => {
  return (Object.keys(validation) as ExtractRecordField[])[0];
};

export const getMessageFromValidation = (
  validation: Validation
): ValidationMessage => {
  const fieldName = getFieldNameFromValidation(validation);
  return validation[fieldName] as ValidationMessage;
};

export const convertRecordValidationToV2 = (
  recordValidation: ExtractRecordValidation
): ExtractRecordValidationV2 => {
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
