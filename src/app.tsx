import * as React from 'react';
import * as ReactDOM from 'react-dom';

interface AccordionState {
	active: boolean;
}

interface AccordionProps {
	header?: string;
	message?: string;
}

let styles = {
	active: {
		display: 'inherit'
	},
	inactive: {
		display: 'none'
	}
}

export class Accordion extends React.Component<AccordionProps, AccordionState> {

	static defaultProps = {
		header: "Hello from React",
		message: "Lorem Ipsum"
	}

	constructor(props: AccordionProps) {
		super(props);

		this.state = {
			active: true
		};

		this.toggle = this.toggle.bind(this);
	}

	toggle() {
		this.setState({
			active: !this.state.active
		});
	}

	render() {
		return (
			<div>
				<h1 onClick={this.toggle}>{this.props.header}</h1>
				<p style={this.state.active ? styles.active : styles.inactive}>{this.props.message}</p>
			</div>
		);
	}
}

ReactDOM.render(<Accordion header="blah, blah, blah" />, document.getElementById('app'));
