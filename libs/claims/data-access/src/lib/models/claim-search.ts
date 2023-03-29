/* eslint-disable @typescript-eslint/naming-convention */
import { ClaimSearchResult } from './claim-search-result';

export type ClaimSearch = {
  claim_count: number;
  claims?: ClaimSearchResult[];
};
