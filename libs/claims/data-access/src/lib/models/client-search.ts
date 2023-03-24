/* eslint-disable @typescript-eslint/naming-convention */
import { ClientSearchResult } from './client-search-result';

export type ClientSearch = {
  client_count: number;
  clients?: ClientSearchResult[];
};
