/* eslint-disable @typescript-eslint/naming-convention */
import { Claim } from './claim';

export type ClaimSearch = {
  claim_count: number;
  claims?: Claim[];
};
