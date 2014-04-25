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
    active: React.PropTypes.bool,
    getTarget: React.PropTypes.func.isRequired
  },
  getInitialState: function() {
    return {
      active: this.props.active
    }
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
  statics: {
    automount: function(component, callback) {
      var node = document.createElement('span');
      document.body.appendChild(node);

      return {
        component: React.renderComponent(component, node, callback),
        unmountComponent: function() {
          var ret = React.unmountComponentAtNode(node);
          document.body.removeChild(node);
          return ret;
        }
      };
    }
  },
  handleOutsideClick: function(e) {
    var clickTarget = e.target;
    var thisTarget = this.props.getTarget();
    var thisNode = this.getDOMNode();

    if (clickTarget !== thisNode && clickTarget !== thisTarget && !thisNode.contains(clickTarget)) {
      this.setState({active: false});
    }
  },
  componentDidMount: function() {
    this.position();
    document.addEventListener('click', this.handleOutsideClick)
  },
  componentWillUnmount: function() {
    document.removeEventListener('click', this.handleOutsideClick)
  },
  /*jshint ignore:start */
  render: function () {
    var classes = React.addons.classSet({
      'popup': true,
      'popup_bound': true,
      'popup_hidden': !this.state.active
    });

    return <div className={classes}>
             <div className='popup__i'>{this.props.children}</div>
           </div>
  }
  /*jshint ignore:end */
});

module.exports = Popup;
