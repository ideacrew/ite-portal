/* eslint-disable @typescript-eslint/naming-convention */
export const errorMapping: Record<ErrorType, ErrorKey> = {
  Fatal: 'fatal_errors',
  Critical: 'critical_errors',
  Warning: 'warnings',
};

export type ErrorType = 'Fatal' | 'Critical' | 'Warning';

export type ErrorKey = 'fatal_errors' | 'critical_errors' | 'warnings';
