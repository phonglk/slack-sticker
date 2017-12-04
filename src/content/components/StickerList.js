import React, { Component } from 'react';
import { connect } from 'react-redux';
import classNames from 'classnames';

import { selectStickerSet } from '../actions';

class StickerList extends Component {
  constructor(props) {
    super(props);
  }
  render() {
    const { list, selectedId, isLoading } = this.props;
    return (
      <div className="sticker-list">
        {isLoading && 'Loading ... '}
        {list.length === 0
          ? <div>You have no sticker collection: Please add (+) an imgur album</div>
          : list.map(s => {
          return (
            <div
              key={s.id}
              className={classNames('sticker-tab', { selected: s.id === selectedId })}
              onClick={() => this.props.selectStickerSet(s.id)}
            >
              {s.icon && s.icon.url ? <img src={s.icon.url} /> : s.id}
            </div>
          )
        })}
      </div>
    )
  }
}

export default connect((state) => {
  const { list, selectedId } = state.stickerSet;
  return {
    list, selectedId,
  }
}, { selectStickerSet })(StickerList);