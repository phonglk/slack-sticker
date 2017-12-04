import { 
  LOAD_STICKER_DONE,
  LOAD_STICKER_PROGRESS
} from '../actions';
const defaultState = {
  list: [],
  isLoading: false,
}

export default function sticker(state = defaultState, action) {
  switch (action.type) {
    case LOAD_STICKER_PROGRESS:
      return { ...state, isLoading: true };
    case LOAD_STICKER_DONE: 
      return { ...state, list: action.list, isLoading: false };
    default: return state;
  }
}