/**
 * @jsx React.DOM
 */

'use strict';

var React = require('react/addons');
require('./list.scss');

var List = React.createClass({
  propTypes: {
    items: React.PropTypes.arrayOf(React.PropTypes.object),
    as: React.PropTypes.string,
    onSelect: React.PropTypes.func
  },
  /*jshint ignore:start */
  render: function () {
    var props = this.props;
    var list = props.items.map(function(item) {
      var classes = React.addons.classSet({
        'list__item': true,
        'list__item_error': item.status === 'error',
        'list__item_action': item.status !== 'error'
      });

      var onSelect = function() {
        props.onSelect(item)
      };

      var value = props.as ? item[props.as] : item;

      return <div className={classes} key={value} onClick={onSelect}>{value}</div>;
    });

    return <div className='list'>{list}</div>;
  }
  /*jshint ignore:end */
});

module.exports = List;