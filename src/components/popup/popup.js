/**
 * @jsx React.DOM
 */

'use strict';

var React = require('react/addons');
require('./popup.scss');

var Popup = React.createClass({
  /*jshint ignore:start */
  render: function () {
    return (
        <div className="ring-dropdown">
          <div className="ring-dropdown__i">LOL</div>
        </div>
      )
  }
  /*jshint ignore:end */
});

module.exports = Popup;
