/**
 * @jsx React.DOM
 */

'use strict';

var React = require('react/addons');
require('./list.scss');

var List = React.createClass({
  propTypes: {
    items: React.PropTypes.arrayOf(React.PropTypes.object),
    onSelect: React.PropTypes.func
  },
  /*jshint ignore:start */
  render: function () {
    var propsOnSelect = this.props.onSelect;
    var list = this.props.items.map(function(item) {
      var classes = React.addons.classSet({
        'list__item': true,
        'list__item_error': item.status === 'error',
        'list__item_action': item.status !== 'error'
      });

      var onSelect = function() {
        propsOnSelect(item)
      };

      return <div className={classes} key={item.value} onClick={onSelect}>{item.value}</div>;
    });

    return <div className="list">{list}</div>;
  }
  /*jshint ignore:end */
});

module.exports = List;