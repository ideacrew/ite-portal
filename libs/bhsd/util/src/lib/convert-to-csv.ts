export const getCsvBlob = (rows: object[], columns: string[]): Blob => {
  const csvData = convertToCsv(rows, columns);
  const blob = new Blob(['\uFEFF' + csvData], {
    type: 'text/csv;charset=utf-8;',
  });
  return blob;
};

const convertToCsv = (rows: object[], columns: string[]): string => {
  if (!rows || rows.length === 0) {
    return '';
  }
  const rowContent = rows
    .map((row) =>
      typeof row == 'object'
        ? columns
            .map((key) => {
              const cellData = row[key as keyof typeof row] as string;
              const cell =
                cellData === null || cellData === undefined
                  ? ''
                  : // eslint-disable-next-line no-useless-escape
                    `\"${cellData}\"`;
              return cell;
            })
            .join(',')
        : ''
    )
    .join('\n');
  return columns.join(',') + '\n' + rowContent;
};
