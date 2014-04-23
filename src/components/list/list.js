/**
 * @jsx React.DOM
 */

'use strict';

var React = require('react/addons');
require('./list.scss');

var List = React.createClass({
  propTypes: {
    items: React.PropTypes.arrayOf(React.PropTypes.object)
  },
  /*jshint ignore:start */
  render: function () {
    var list = this.props.items.map(function(item) {
      var classes = React.addons.classSet({
        'list__item': true,
        'list__item_error': item.status === 'error',
        'list__item_action': item.status !== 'error'
      });

      return <div className={classes}>{item.value}</div>;
    });

    return <div className="list">{list}</div>;
  }
  /*jshint ignore:end */
});

module.exports = List;