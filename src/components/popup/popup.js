/**
 * @jsx React.DOM
 */

'use strict';

var React = require('react/addons');
var computedStyle = require('computedStyle/dist/computedStyle.commonjs');
require('popo.js/popo'); // Uses global :(
require('./popup.scss');

var sumProps = function(target, props) {
  var propsList = props.split(' ');

  return propsList.reduce(function(sum, prop) {
    return sum + parseInt(computedStyle(target, prop), 10);
  }, 0);
};

var getWidth = function(target) {
  var widthProps = computedStyle(target, 'box-sizing') === 'border-box' ?
    'width' :
    'width border-left border-right padding-left padding-right';

  return sumProps(target, widthProps);
};

var Popup = React.createClass({
  propTypes: {
    getTarget: React.PropTypes.func.isRequired
  },
  position: function () {
    var self = this.getDOMNode();
    var target = this.props.getTarget();

    popo(self, {
      position: 'left top left bottom',
      base: target
    });
    self.style.width = getWidth(target) - sumProps(self, 'border-left border-right') + 'px';
  },
  componentDidMount: function() {
    this.position();
  },
  /*jshint ignore:start */
  render: function () {
    return (
        <div className='popup popup_bound'>
          <div className='popup__i'>{this.props.children}</div>
        </div>
      )
  }
  /*jshint ignore:end */
});

module.exports = Popup;
