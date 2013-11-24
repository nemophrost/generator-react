/** @jsx React.DOM */
'use strict';
define([], function () {
	return React.createClass({
		getInitialState: function() {
			return {message: 'Hello World!'};
		},
		goodbye: function(event) {
			this.setState({message: 'Goodbye World.'});
		},
		render: function() {
			return (
				<h1 onClick={this.goodbye}>{this.state.message}</h1>
			);
		}
	});
});
