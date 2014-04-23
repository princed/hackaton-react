/**
 * @jsx React.DOM
 */

'use strict';

var React = require('react/addons');
var computedStyle = require('computedStyle');
require('popo');
require('./popup.scss');

var sumProps = function(target, props) {
  var propsList = props.split(' ');

  return propsList.reduce(function(sum, prop) {
    console.log(sum);
    return sum + parseInt(computedStyle(target, prop), 10);
  }, 0);
};


var Popup = React.createClass({
  propTypes: {
    getTarget: React.PropTypes.func.isRequired
  },
  position: function () {
    var self = this.getDOMNode();
    var target = this.props.getTarget();
    var width = sumProps(target, 'width border-left border-right padding-left padding-right') -
                sumProps(self, 'border-left border-right') + 'px';

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
