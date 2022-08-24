import { ExtractRecordData, ExtractRecordField } from './models';

export const convertCsvToJson = (csv: string): ExtractRecordData[] => {
  // Container list for the JSON data
  const csvAsObject: ExtractRecordData[] = [];

  // Begin by separating headers from lines
  const [rawHeaders, ...rawLines] = csv.split('\r\n');

  const filteredLines = rawLines.filter((rawLine) =>
    firstCharacterIsValid(rawLine)
  );

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

const firstCharacterIsValid = (rawLine: string): boolean => {
  const firstCharacter = rawLine.charAt(0);
  const isNotAComma = firstCharacter !== ',';

  const hasLineLength = rawLine.length > 0;

  return isNotAComma && hasLineLength;
};
