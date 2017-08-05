//@flow
import type {Action} from './types';

export const createAction = (type: string, payload: ?Object): Action => ({
  type,
  payload,
});
