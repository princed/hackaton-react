/**
 * @jsx React.DOM
 */

'use strict';

var React = require('react/addons');
var computedStyle = require('computedStyle');
require('popo');
require('./popup.scss');

var Popup = React.createClass({
  propTypes: {
    getTarget: React.PropTypes.func.isRequired
  },
  position: function () {
    var self = this.getDOMNode();
    var target = this.props.getTarget();
    var width = parseInt(computedStyle(target, 'width'), 10) +
                parseInt(computedStyle(target, 'border-left'), 10) +
                parseInt(computedStyle(target, 'border-right'), 10) +
                parseInt(computedStyle(target, 'padding-left'), 10) +
                parseInt(computedStyle(target, 'padding-right'), 10) -
                parseInt(computedStyle(self, 'border-left'), 10) -
                parseInt(computedStyle(self, 'border-right'), 10) + 'px';

    popo(self, {
      position: 'left top left bottom',
      base: target
    });
    self.style.width = width;
  },
  componentDidMount: function() {
    this.position();
  },
  /*jshint ignore:start */
  render: function () {
    return (
        <div className="popup popup_bound">
          <div className="popup__i">{this.props.children}</div>
        </div>
      )
  }
  /*jshint ignore:end */
});

module.exports = Popup;
