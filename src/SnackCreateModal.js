/**
 * Created by alexanderyan on 7/14/16.
 */

import React from 'react';
import Modal from 'react-bootstrap/lib/Modal';
import FormGroup from 'react-bootstrap/lib/FormGroup'
import FormControl from 'react-bootstrap/lib/FormControl'
import Button from 'react-bootstrap/lib/Button';

export default class SnackCreateModal extends React.Component {
	constructor(props)
	{
		super(props);
		this.state = {showModal: this.props.showModal};

		this.open = this.open.bind(this);
		this.close = this.close.bind(this);
		this.handleSubmit = this.handleSubmit.bind(this);
	}

	open()
	{
		this.setState({showModal: true});
	}

	close()
	{
		this.setState({showModal: false});
	}

	handleSubmit()
	{
		const form = document.forms.snackAdd;
		console.log(form);
		this.props.submitSnack({name: form.name.value});
		this.state.name = "";
	}

	componentWillReceiveProps(nextProps)
	{
		if (nextProps.showModal !== this.state.showModal)
		{
			this.setState({showModal: nextProps.showModal});
		}
	}

	render()
	{
		return (
			<Modal show={this.state.showModal} onHide={this.close}>
				<Modal.Header>
					<Modal.Title>Create Snack</Modal.Title>
				</Modal.Header>
				<Modal.Body>
					<form name="snackAdd">
						<FormGroup
							controlId="formSnackName"
						>
							<FormControl
								type="text"
								placeholder="snack name"
								name="name"
							/>
						</FormGroup>
					</form>
				</Modal.Body>
				<Modal.Footer>
					<Button
						bsStyle="primary"
						onClick={this.handleSubmit}
					>Stack dat Snack!</Button>

					<Button onClick={this.close}>Close</Button>
				</Modal.Footer>
			</Modal>
		)
	}
}
