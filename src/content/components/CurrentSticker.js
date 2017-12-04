import React, { Component } from 'react';
import { connect } from 'react-redux';
import { getStickers } from '../actions';
import { sendImage } from '../../util/api';

class CurrentSticker extends Component {
  constructor(props) {
    super(props);
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.currentAlbumId != this.props.currentAlbumId && nextProps.currentAlbumId !== null) {
      this.props.getStickers(nextProps.currentAlbumId);
    }
  }

  stickerClick = (sticker) => {
    const { url } = sticker;
    sendImage(url);
  }

  render() {
    const { currentAlbumId, list, isLoading } = this.props;
    return (
      <div className="current-stickers">
        {isLoading ? 'Loading ... '
          : currentAlbumId === null
            ? <div>No sticker set is slected</div>
            : list.length > 0 && list.map((sticker) => (
              <div className="sticker" key={sticker.url} onClick={() => this.stickerClick(sticker)}>
                <img src={sticker.url} />
              </div>
            ))}
      </div>
    )
  }
}

export default connect((state) => {
 const currentAlbumId = state.stickerSet.selectedId
 const { list, isLoading } = state.sticker;
 return { currentAlbumId, list, isLoading }
}, {
  getStickers
})(CurrentSticker);