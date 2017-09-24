import React, { Component } from 'react';
import { local, sync } from '../../util/storage';

function addFACDN() {
  const link = document.createElement('link');
  link.setAttribute('rel', 'stylesheet')
  link.setAttribute('href', 'https://maxcdn.bootstrapcdn.com/font-awesome/4.7.0/css/font-awesome.min.css');
  link.setAttribute('type', 'text/css');
  document.head.appendChild(link);
}

export default class Panel extends Component {
  constructor(props) {
    super(props);
  }
  async componentDidMount() {
    require('./style.less');
    addFACDN();
    console.log('mounted');
    const { stickerList } = await sync.get({ stickerList: [] });
    console.log(stickerList);
  }

  render() {
    const { isOpen } = this.props;
    return (
      <div style={{display: isOpen ? 'block': 'none' }}>
        <div className="sticker-header">
          <div className="sticker-list">
          </div>
          <div className="sticker-options">
            <a href='#'><i className="fa fa-plus-square"></i></a>
          </div>
        </div>
      </div>
    );
  }
}