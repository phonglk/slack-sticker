export const LOAD_STICKER_SET_PROGRESS = 'LOAD_STICKER_SET_PROGRESS';
export const LOAD_STICKER_SET_DONE = 'LOAD_STICKER_SET_DONE';
export const ADD_STICKER_SET = 'ADD_STICKER_SET';
export const SELECT_STICKER_SET = 'SELECT_STICKER_SET';
export const REMOVE_STICKER_SET = 'REMOVE_STICKER_SET';

export const LOAD_STICKER_PROGRESS = 'LOAD_STICKER_PROGRESS';
export const LOAD_STICKER_DONE = 'LOAD_STICKER_DONE';

import { sync, local } from '../../util/storage';
import { loadImgurAlbum } from '../../util/api';

export function getStickerSets() {
  return async (dispatch) => {
    dispatch({type: LOAD_STICKER_SET_PROGRESS });
    let { stickerList: list, selectedStickerSet: selectedId } = await sync.get({ stickerList: [], selectedStickerSet: null })
    if (selectedId === null && list.length > 0) {
      selectedId = list[0].id;
    }
    list = list.filter(set => set !== null && set.id);
    dispatch({ type: LOAD_STICKER_SET_DONE, list, selectedId })
  }
}

export function addStickerSet(id) {
  return {
    type: ADD_STICKER_SET,
    item: { id, icon: null },
  }
}

export function selectStickerSet(selectedId) {
  return { type: SELECT_STICKER_SET, selectedId };
}

export function removeStickerSet(id) {
  const KEY_STICKER_LOCAL = `sticker_set_${id}`;
  local.remove(KEY_STICKER_LOCAL);
  return {
    type: REMOVE_STICKER_SET,
    item: { id },
  }
}

export function getStickers(aId) {
  return async (dispatch) => {
    dispatch({type: LOAD_STICKER_PROGRESS });
    const KEY_STICKER_LOCAL = `sticker_set_${aId}`;
    let { [KEY_STICKER_LOCAL]: list } = await local.get({ [KEY_STICKER_LOCAL]: null });
    if (list === null) {
      list = await loadImgurAlbum(aId);
      local.set({ [KEY_STICKER_LOCAL]: list });
    }
    dispatch({type: LOAD_STICKER_DONE, list, id: aId });
  }
}