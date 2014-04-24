/**
 * @jsx React.DOM
 */

'use strict';

var React = require('react/addons');
var Popup = require('../popup/popup');
var List = require('../list/list');
require('./popup-list.scss');

var PopupList = React.createClass({
  propTypes: {
    getTarget: React.PropTypes.func.isRequired,
    active: React.PropTypes.bool,
    items: React.PropTypes.arrayOf(React.PropTypes.object),
    as: React.PropTypes.string,
    onSelect: React.PropTypes.func
  },
  getInitialState: function() {
    console.log(this.props);
    return {
      items: this.props.items,
      active: this.props.active
    };
  },
  setItems: function(items) {
    this.setState({items: items});
  },
  setVisible: function(active) {
    this.refs.popup.setState({active: active});
  },
  /*jshint ignore:start */
  render: function () {
    return <Popup ref='popup' active={this.state.active} getTarget={this.props.getTarget}>
             <List items={this.state.items} as={this.props.as} onSelect={this.props.onSelect} />
           </Popup>;
  }
  /*jshint ignore:end */
});

module.exports = PopupList;
