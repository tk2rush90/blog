/**
 * post status type
 */
export type PostStatusType = 'draft' | 'live' | 'scheduled';
export const DRAFT = 'draft';
export const LIVE = 'live';
export const SCHEDULED = 'scheduled';

/**
 * option model
 */
export interface OptionModel<T> {
  label: string;
  value: T;
}
