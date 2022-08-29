import {
  ExtractRecordData,
  ExtractRecordField,
} from '@dbh/provider-extract/data-access';

export const convertCsvToJson = (csv: string): ExtractRecordData[] => {
  // Container list for the JSON data
  const csvAsObject: ExtractRecordData[] = [];

  // Begin by separating headers from lines
  const [rawHeaders, ...rawLines] = csv.split('\r\n');

  const filteredLines = rawLines.filter((rawLine) => lineHasValue(rawLine));

  if (filteredLines.length > 0) {
    const headers: ExtractRecordField[] = rawHeaders.split(
      ','
    ) as ExtractRecordField[];
    for (const line of filteredLines) {
      const record: Partial<ExtractRecordData> = {};
      const currentLine = line.split(',');

      for (const header of headers) {
        record[header] = currentLine[headers.indexOf(header)];
      }

      // Need to cast this as the full record, rather than Partial<T>
      csvAsObject.push(record as ExtractRecordData);
    }
  }

  return csvAsObject;
};

const lineHasValue = (rawLine: string): boolean => {
  const notOnlyCommas = /[^\s,]/.test(rawLine);
  const hasLineLength = rawLine.length > 0;

  return notOnlyCommas && hasLineLength;
};
