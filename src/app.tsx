import * as React from 'react';
import * as ReactDOM from 'react-dom';
import {createStore} from 'redux';
import {connect, Provider} from 'react-redux';

interface ActionFn {
	(): any;
}

interface State {
	active?: boolean;
}

interface Dispatch {
	toggle?: ActionFn;
}

interface AccordionProps extends State, Dispatch {
	header?: string;
	message?: string;
}

interface Action {
	type: string;
	val?: any;
}

let styles = {
	active: {
		display: 'inherit'
	},
	inactive: {
		display: 'none'
	}
}

let defaultProps: AccordionProps = {
	header: "Hello from React",
	message: "Lorem Ipsum"
};


/* Reducer function for toggling current state */
export let toggleAccordion = (state: State, action: Action): State => {
	switch(action.type) {
		case '@@redux/INIT':
			console.log('Init toggle');
			return {
				...state,
				active: true
			}

		case 'TOGGLE':
			console.log(`toggle: ${state.active}`);
			return {
				...state,
				active: !state.active
			}
	}

	return state;
}

const mapStateToProps = (state: State, ownProps: AccordionProps): AccordionProps => {
	// The ownProps represent the properties passed to Accordion
	// This will assign default properties when ownProps are null
	let props = Object.assign(defaultProps, ownProps);

	return {
		...props,
		active: state.active
	}
}

const mapDispatchToProps = (dispatch: any): Dispatch => {
	return {
		toggle: () => {
			dispatch({type: 'TOGGLE'})
		}
	}
}

@connect<State, Dispatch, any>(mapStateToProps, mapDispatchToProps)
class Accordion extends React.Component<AccordionProps, any> {

	constructor(props: AccordionProps) {
		super(props);
	}

	render() {
		return (
			<div>
				<h1 onClick={this.props.toggle}>{this.props.header}</h1>
				<p style={this.props.active ? styles.active : styles.inactive}>{this.props.message}</p>
			</div>
		);
	}
}

ReactDOM.render(
	<Provider store={createStore(toggleAccordion)}>
		<Accordion header="blah, blah, blah" />
	</Provider>,
	document.getElementById('app')
);
