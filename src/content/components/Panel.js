import React, { Component } from 'react';
import { connect } from 'react-redux';
import { local, sync } from '../../util/storage';
import StickerList from './StickerList';
import CurrentSticker from './CurrentSticker';
import { getStickerSets, addStickerSet, removeStickerSet } from '../actions';
import { gatherClientData } from '../../util/api';

function addFACDN() {
  const link = document.createElement('link');
  link.setAttribute('rel', 'stylesheet')
  link.setAttribute('href', 'https://maxcdn.bootstrapcdn.com/font-awesome/4.7.0/css/font-awesome.min.css');
  link.setAttribute('type', 'text/css');
  document.head.appendChild(link);
}

const addStickerSetPrompt = async () => new Promise((resolve, reject) => {
  let url;
  url = prompt('imgur album url:', 'http://imgur.com/a/');
  if (url === null) return reject();
  if (/imgur\.com\/a\/.+/.test(url) === false) {
    alert('Invalid album url');
    return reject();
  }
  const match = url.match(/a\/([^ ]*)/);
  if (match === null) return reject();;
  const aId = match[1];
  return resolve(aId);
});

class Panel extends Component {
  constructor(props) {
    super(props);
    this.state = {
      stickerList: [],
    }
  }
  async componentDidMount() {
    require('./style.less');
    addFACDN();
    gatherClientData();
    this.props.getStickerSets();
  }

  addSetClick = async () => {
    try {
      const aId = await addStickerSetPrompt();
      const stickerList = this.state.stickerList.slice();
      if (stickerList.length >= 10) {
        alert('You have reached maximum number of sticker set (10)');
        throw new Error();
      }
      this.props.addStickerSet(aId);
    } catch (e) {
      
    }
  }

  removeSetClick = async () => {
    const id = this.props.selectedSetId;
    if (id) this.props.removeStickerSet(id);
  }

  render() {
    const { isOpen } = this.props;
    return (
      <div style={{display: isOpen ? 'flex': 'none' }} className="sticker-panel">
        <div className="sticker-header">
          <StickerList />
          <div className="sticker-options">
            <a href='#' onClick={this.removeSetClick}><i className="fa fa-trash"></i></a>
            <a href='#' onClick={this.addSetClick}><i className="fa fa-plus-square"></i></a>
          </div>
        </div>
        <div className="current-stickers-wrapper">
          <CurrentSticker />
        </div>
      </div>
    );
  }
}

export default connect((state) => {
  return {
    selectedSetId: state.stickerSet.selectedId,
  };
}, {
  getStickerSets,
  addStickerSet,
  removeStickerSet,
})(Panel);