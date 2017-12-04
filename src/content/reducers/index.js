import { combineReducers } from 'redux';
import sticker from './sticker';
import stickerSet from './stickerSet';

const slackSticker = combineReducers({
  sticker,
  stickerSet,
})

export default slackSticker