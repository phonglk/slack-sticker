import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import thunk from 'redux-thunk';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware, compose } from 'redux';
import logger from 'redux-logger'

import Panel from './components/Panel';
import slackSticker from './reducers';
const isProduction = typeof process.env.PRODUCTION !== 'undefined';

export default class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      isPanel: false,
    }
  }
  componentDidMount() {
    require('./content-style.less');
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
      const store = createStore(slackSticker, 
        isProduction
        ? applyMiddleware(thunk)
        : applyMiddleware(thunk, logger));
      ReactDOM.render((
        <Provider store={store}>
          <Panel isOpen={isPanel} />
        </Provider>
      ), $panel);
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