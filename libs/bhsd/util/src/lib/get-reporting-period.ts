export const getReportingPeriod = (monthsAgo: number): Date => {
  const today = new Date();
  const lastMonth = new Date(
    today.getFullYear(),
    today.getMonth() - monthsAgo,
    1
  );
  const lastYear =
    lastMonth.getMonth() > today.getMonth()
      ? today.getFullYear() - 1
      : today.getFullYear();
  lastMonth.setFullYear(lastYear);
  return lastMonth;
};

export const getReportingPeriodText = (period: Date): string => {
  const monthName = period.toLocaleString('en-US', {
    month: 'long',
  });

  return `${monthName}, ${period.getFullYear()}`;
};
