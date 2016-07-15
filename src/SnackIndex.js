/**
 * Created by alexanderyan on 7/14/16.
 */

import React from 'react';
import {SnackList} from './SnackList';
import SnackCreateModal from './SnackCreateModal';
import update from 'react-addons-update';
import FormControl from 'react-bootstrap/lib/FormControl'


import {Panel, Button, Grid, Row, Col} from 'react-bootstrap'

export default class SnackIndex extends React.Component {
	constructor(prop)
	{
		super(prop);
		this.state = {
			createSnackModalVisible: false,
			snacks: [],
			user: ''
		};
		this.showCreateSnackModal = this.showCreateSnackModal.bind(this);
		this.closeCreateSnackModal = this.closeCreateSnackModal.bind(this);
		this.addSnack = this.addSnack.bind(this);
		this.voteSnack = this.voteSnack.bind(this);
	}

	showCreateSnackModal()
	{
		this.setState({createSnackModalVisible: true});
	}

	closeCreateSnackModal()
	{
		this.setState({createSnackModalVisible: false});
	}
	
	voteSnack(snack, vote)
	{
		const form = document.forms.userForm;

		fetch("/api/snack/" + snack._id + "/vote/",
			{
				method: "PUT",
				headers: {"Content-Type": "application/json"},
				body: JSON.stringify({id: snack.id, vote: vote, user: form.name.value
			})
	}).then(res => res.json())
			.then(score =>
			{
				const ind = this.state.snacks.indexOf(snack);

				const modifiedSnack = update(snack, {score: {$set: score}});
				var newSnacks = update(this.state.snacks, {
					$splice: [[ind, 1, modifiedSnack]]
				});
				newSnacks.sort(function(a, b)
				{
					return b.score - a.score;
				});
				this.setState({snacks: newSnacks});
			})
	}

	addSnack(snack)
	{
		fetch("/api/snacks/",
			{
				method: "POST",
				headers: {"Content-Type": "application/json"},
				body: JSON.stringify(snack)
			}).then(res => res.json())
			.then(snack =>
			{
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
		})
	}

	componentDidMount()
	{
		this.loadData();
	}

	render()
	{
		return (
			<Grid>
				<Row className="show-grid">
					<Col>
						<form name="userForm">
							<FormControl
								type="text"
								placeholder="Your Name"
								name="name"
							/>
						</form>
						
						<SnackList
							snacks={this.state.snacks}
							voteMethodList={this.voteSnack}
						/>
						<SnackCreateModal
							showModal={this.state.createSnackModalVisible}
							submitSnack={this.addSnack}
							closeMethod={this.closeCreateSnackModal}
						/>
						<Button
							bsSize="sm"
							bsStyle="primary"
							onClick={this.showCreateSnackModal}
						>
							Stack a New Snack!
						</Button>
					</Col>
				</Row>
			</Grid>

		)
	}
}


