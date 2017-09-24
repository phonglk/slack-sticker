import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import Panel from '../panel';

export default class Sticker extends Component {
  constructor(props) {
    super(props);

    this.state = {
      isPanel: false,
    }
  }
  componentDidMount() {
    require('./style.less');
  }

  togglePanelClick = () => {
    let { isPanel } = this.state;
    isPanel = !isPanel;
    const $footer = document.querySelector('#footer');
    if ($footer) {
      let $panel = document.querySelector('.sticker-panel-root');
      if ($panel === null) {
        $panel = document.createElement('div');
        $panel.className = 'sticker-panel-root';
        $footer.insertBefore($panel, $footer.firstChild);
      }
      ReactDOM.render(<Panel isOpen={isPanel} />, $panel);
    }
    this.setState({ isPanel });
  }

  render() {
    const { isPanel } = this.state;
    let className = 'emoji-outer emoji-sizer sticker-icon';
    if (isPanel === true) className+=' is-active';
    return (
      <div>
        <span className={className} onClick={this.togglePanelClick}></span>
      </div>
    );
  }
}