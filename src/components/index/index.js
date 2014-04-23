/**
 * @jsx React.DOM
 */

'use strict';

var React = require('react/addons');
var Popup = require('../popup/popup');

var HacktonreactApp = React.createClass({
  /*jshint ignore:start */
  render: function() {
    return (
      <Popup />
    );
  }
  /*jshint ignore:end */
});

React.renderComponent(<HacktonreactApp />, document.getElementById('content')); // jshint ignore:line

module.exports = HacktonreactApp;
