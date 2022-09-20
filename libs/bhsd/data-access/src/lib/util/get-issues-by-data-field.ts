import {
  errorMapping,
  ErrorType,
  ExtractRecordField,
  ExtractRecordValidation,
  IssuesByDataField,
  Validation,
} from '../models';

export const getExtractRecordsByErrorType = (
  records: ExtractRecordValidation[],
  typeToCount: ErrorType
): ExtractRecordValidation[] => {
  // Scan through all records and count the number of records
  // that have an error of the specified type and field name
  const errorKey = errorMapping[typeToCount];

  // Start by filtering on error type
  const allRecordsWithErrorType: ExtractRecordValidation[] = records.filter(
    (record) => record[errorKey].length > 0
  );

  return allRecordsWithErrorType;
};

export const getUniqueFieldNames = (
  records: ExtractRecordValidation[],
  typeToCount: ErrorType
): ExtractRecordField[] => {
  const errorKey = errorMapping[typeToCount];
  const allErrorsOfType: Validation[] = records.flatMap(
    (record) => record[errorKey]
  );

  const uniqueFieldNames = [
    ...new Set(allErrorsOfType.map((validation) => Object.keys(validation)[0])),
  ] as ExtractRecordField[];

  return uniqueFieldNames;
};

// export const getUniqueCategories = (
//   records: ExtractRecordValidation[],
//   category: ValidationCategory,

// ): ValidationCategory[] => {
//   const categories: ValidationCategory[] = records.map();
// };

export const getAffectedRecords = (
  records: ExtractRecordValidation[],
  fieldName: ExtractRecordField,
  errorType: ErrorType
): ExtractRecordValidation[] => {
  // Scan through all records and count the number of records
  // that have an error of the specified type and field name
  const errorKey = errorMapping[errorType];

  // Start by filtering on error type
  const allRecordsWithErrorType: ExtractRecordValidation[] = records.filter(
    (record) => record[errorKey].length > 0
  );

  // Filter on field name, then return the affected records
  const allRecordsWithFieldName: ExtractRecordValidation[] =
    allRecordsWithErrorType.filter((record) =>
      // Return true if the record has an error of the specified field name

      record[errorKey].some(
        (validation) => Object.keys(validation)[0] === fieldName
      )
    );

  return allRecordsWithFieldName;
};

export const getIssuesByDataField = (
  records: ExtractRecordValidation[],
  errorType: ErrorType
): IssuesByDataField[] => {
  const fieldNames = getUniqueFieldNames(records, errorType);

  const issuesByDataField = fieldNames.map((fieldName) => {
    const affectedRecords = getAffectedRecords(records, fieldName, errorType);
    // const uniqueCategories = getUniqueCategories(affectedRecords, category);
    const issuesByDataField: IssuesByDataField = {
      fieldName,
      affectedRecords,
    };
    return issuesByDataField;
  });

  console.log({ issuesByDataField });

  return issuesByDataField;
};

// export const getCategoryCount = (
//   records: ExtractRecordField[],
//   category: ValidationCategory
// ): number => {};
