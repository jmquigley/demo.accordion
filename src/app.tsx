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
	children?: React.ReactNode;
}

let initialState: State = {
	active: true,
}

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
	console.log(`REDUCER: ${JSON.stringify(state)}`);
	switch(action.type) {
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
	return {
		...ownProps,
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
		<p className={props.active ? "active" : "inactive"}>{props.message}</p>
	</div>
);

/* Container definition - logic */
class AccordionContainer extends React.Component<AccordionProps, any> {

	public static defaultProps: AccordionProps = {
		header: "Lorem Ipsum",
		message: loremIpsum({units: 'paragraphs', random: null})
	};
	
	constructor(props: AccordionProps) {
		super(props);
	}

	private test() {
		console.log('test private function');
	}
	
	render() {
		console.log(`PROPS: ${JSON.stringify(this.props)}`);
		this.test();
		return <AccordionComponent {...this.props} />
	}
}

const Accordion = connect(mapStateToProps, mapDispatchToProps)(AccordionContainer);

ReactDOM.render(
	<Provider store={createStore(reducer, initialState)}>
		<Accordion header="blah, blah, blah" />
	</Provider>,
	document.getElementById('app')
);
