import {combineReducers} from 'redux';
import {DATA_AVAILABLE} from './action';

let dataState = {data: []};

const dataReducer = (state = dataState, action: any) => {
  switch (action.type) {
    case DATA_AVAILABLE:
      return {...state, data: action.data};
    default:
      return state;
  }
};

const rootReducer = combineReducers({
  dataReducer,
});

export default rootReducer;
