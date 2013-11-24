/** @jsx React.DOM */
'use strict';
var HelloWorld = React.createClass({
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

React.renderComponent(
	<HelloWorld />,
	document.getElementById('app')
);
