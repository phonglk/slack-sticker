import { 
  LOAD_STICKER_SET_DONE,
  LOAD_STICKER_SET_PROGRESS,
  ADD_STICKER_SET,
  REMOVE_STICKER_SET,
  SELECT_STICKER_SET,
  LOAD_STICKER_DONE,
} from '../actions';
import { sync, local } from '../../util/storage';
const defaultState = {
  list: [],
  selectedId: null,
  isLoading: false,
}

function syncState(state) {
  sync.set({ stickerList: state.list, selectedStickerSet: state.selectedId });
}

export default function stickerSet(state = defaultState, action) {
  switch (action.type) {
    case LOAD_STICKER_SET_PROGRESS:
      return { ...state, isLoading: true };
    case LOAD_STICKER_SET_DONE: 
      return { 
        ...state,
        list: action.list,
        selectedId: action.selectedId,
      };
    case SELECT_STICKER_SET: {
      sync.set({ selectedStickerSet: action.selectedId })
      return {
        ...state,
        selectedId: action.selectedId,
      }
    }
    case ADD_STICKER_SET: {
      const list = state.list.concat(action.item);
      const selectedId = state.list.length > 0 ? action.item.id : state.selectedId;
      syncState({ list, selectedId });
      return { ...state,
        list,
        selectedId
      }
    }
    case REMOVE_STICKER_SET: {
      const list = state.list.filter(({ id }) => action.item.id !== id);
      const selectedId = state.selectedId === action.item.id
        ? (list.length === 0
          ? null 
          : state.list[0].id)
        : state.selectedId;
      syncState({ list, selectedId });
      return { ...state, list, selectedId };
    }
    case LOAD_STICKER_DONE: {
      const aId = action.id;
      const stickers = action.list;
      if (stickers.length === 0) return state;
      const list = state.list.map(set => {
        if (set.id !== aId) return set;
        return {
          ...set,
          icon: stickers[0],
        }
      });
      const newState = {
        ...state, list
      }
      syncState(newState);
      return newState;
    }
    default: return state;
  }
}