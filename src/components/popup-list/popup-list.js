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
    items: React.PropTypes.arrayOf(React.PropTypes.object),
    onSelect: React.PropTypes.func
  },
  /*jshint ignore:start */
  render: function () {
    return <Popup getTarget={this.props.getTarget}>
      <List items={this.props.items} onSelect={this.props.onSelect} />
    </Popup>;
  }
  /*jshint ignore:end */
});

module.exports = PopupList;
