/**
 * Created by alexanderyan on 7/14/16.
 */

import React from 'react';
import {SnackList} from './SnackList';
import SnackCreateModal from './SnackCreateModal';
import Button from 'react-bootstrap/lib/Button';
import update from 'react-addons-update';

export default class SnackIndex extends React.Component {
	constructor(prop)
	{
		super(prop);
		this.state = {
			createSnackModalVisible: false,
			snacks: []
		};
		this.showCreateSnackModal = this.showCreateSnackModal.bind(this);
		this.addSnack = this.addSnack.bind(this);
	}

	showCreateSnackModal()
	{
		this.setState({createSnackModalVisible: true});
	}
	
	addSnack(snack)
	{
		fetch("/api/snacks/", 
			{
				method: "POST",
				headers: {"Content-Type": "application/json" },
				body: JSON.stringify(snack)
			}).then(res => res.json())
			.then(snack =>
			{
				console.log(snack);
				const modifiedSnacks = update(this.state.snacks, {$push: [snack]});
				this.setState({snacks: modifiedSnacks});
			})
			.catch(err =>
			{
				console.log(err);
			})
	}

	loadData()
	{
		fetch(`/api/snacks/`).then(response =>
			response.json()
		).then(snacks =>
		{
			this.setState({snacks: snacks});
		}).catch(err =>
		{
			console.log(err);
		});
	}

	componentDidMount()
	{
		this.loadData();
	}

	render()
	{
		return (
			<div>
				<SnackList
					snacks={this.state.snacks}
				/>
				<SnackCreateModal
					showModal={this.state.createSnackModalVisible}
					submitSnack={this.addSnack}
				/>
				<Button
					bsSize="sm"
					bsStyle="primary"
					onClick={this.showCreateSnackModal}
				>
					Stack a New Snack!
				</Button>
			</div>
		)
	}
}


