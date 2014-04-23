/**
 * @jsx React.DOM
 */

'use strict';

var React = require('react/addons');
var Popup = require('../popup/popup');

var ComboBox = React.createClass({
  /*jshint ignore:start */
  getTarget: function() {
    return this.refs.input.getDOMNode();
  },
  render: function() {
    return (
      <div>
        <input ref="input" />
        <Popup children="LOL" getTarget={this.getTarget}/>
      </div>
    );
  }
  /*jshint ignore:end */
});

React.renderComponent(<ComboBox />, document.getElementById('content')); // jshint ignore:line

module.exports = ComboBox;
