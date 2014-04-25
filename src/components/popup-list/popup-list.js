/**
 * @jsx React.DOM
 */

'use strict';

var React = require('react/addons');
var Popup = require('../popup/popup');
var List = require('../list/list');
require('./popup-list.scss');

var PopupList = React.createClass({
  /*jshint ignore:start */
  render: function () {
    return <Popup ref='popup' active={this.props.active} getTarget={this.props.getTarget}>
             <List ref='list' items={this.props.items} as={this.props.as} onSelect={this.props.onSelect} />
           </Popup>;
  }
  /*jshint ignore:end */
});

module.exports = PopupList;
