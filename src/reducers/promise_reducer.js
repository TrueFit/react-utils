import {stateReducer} from './state_reducer';

export const promiseReducer = (actionType, initialState, stateChanges) => {
  const filter = `${actionType}_`;
  const reducer = stateReducer(initialState, stateChanges);

  return (state = initialState, action) =>
    reducer(state, {...action, type: action.type.replace(filter, '')});
};
