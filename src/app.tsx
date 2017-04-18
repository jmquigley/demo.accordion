import * as loremIpsum from 'lorem-ipsum';
import * as React from 'react';
import * as ReactDOM from 'react-dom';
import {createStore} from 'redux';
import {connect, Provider} from 'react-redux';

require('./styles.css');

interface Action<T> {
	readonly type?: string;
	readonly payload?: T;
}

interface ActionCreator<T> {
	(payload?: T): Action<T>;
}

interface DispatchFn {
	(): void;
}

interface State {
	active?: boolean;
}

interface Dispatch {
	toggle?: DispatchFn;
}

interface AccordionProps extends State, Dispatch {
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

const defaultProps: AccordionProps = {
	header: "Lorem Ipsum",
	message: loremIpsum({units: 'paragraphs', random: null})
};

const nilAction: Action<string> = {
	type: 'UNKNOWN',
	payload: 'Unknown action'
}

/* Action creator function */
const actionToggle: ActionCreator<undefined> = () => {
	// This action has no payload, so the template is "undefined"
	return {
		type: 'TOGGLE'
	}
}

/* Reducer function for toggling current state */
const reducer = (state: State = {}, action: Action<any> = nilAction): State => {
	switch(action.type) {
		case '@@redux/INIT':
			console.log('Init toggle');
			return {
				...state,
				active: true
			}

		case 'TOGGLE':
			console.log(`toggling current state from ${state.active} to ${!state.active}`);
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
	// This maps functions to their corresponding dispatch mechanism
	return {
		toggle: () => {
			dispatch(actionToggle());
		}
	}
}

/* Component definition - presentation */
const AccordionComponent = (props: AccordionProps) => (
	<div>
		<h1 onClick={props.toggle}>{props.header}</h1>
		<p style={props.active ? styles.active : styles.inactive}>{props.message}</p>
	</div>
);

/* Container definition - logic */
@connect(mapStateToProps, mapDispatchToProps)
class Accordion extends React.Component<AccordionProps, any> {

	constructor(props: AccordionProps) {
		super(props);
	}

	render() {
		return <AccordionComponent
			active={this.props.active}
			toggle={this.props.toggle}
			header={this.props.header}
			message={this.props.message} />
	}
}

ReactDOM.render(
	<Provider store={createStore(reducer)}>
		<Accordion header="blah, blah, blah" />
	</Provider>,
	document.getElementById('app')
);
