/**
 * Created by alexanderyan on 7/14/16.
 */

import  React from 'react';
import Modal from 'react-bootstrap/lib/Modal';
import Button from 'react-bootstrap/lib/Button';

export class SnackListItem extends React.Component {
	constructor(props)
	{
		super(props);
	}

	render()
	{
		return (
			<li>
				<h3>{this.props.name}</h3>
			</li>
		)
	}
}


export class SnackList extends React.Component {
	constructor(props)
	{
		super(props);
		this.state = {
			snacks: [],
		};
		
		this.openModal = this.openModal.bind(this);
	}

	componentDidMount()
	{
		console.log("snack list did mount")
		this.loadData();
	}

	componentDidUpdate(prevProps)
	{
		//const oldQuery = prevProps.location.query;
		//const newQuery = this.props.location.query;
		// todo: comparing shallow objects -- better way?
		// todo: when do we get called even when there's no change?
		/*if (oldQuery.priority === newQuery.priority &&
		 oldQuery.status === newQuery.status) {
		 console.log('BugList: componentDidUpdate, no change in filter, not updating');
		 return;
		 }*/
		console.log('SnackList: componentDidUpdate, loading data with new filter');
		//this.loadData();
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

	render()
	{
		let snackItems = this.state.snacks.map(function (snack)
		{
			return (
				<SnackListItem
					key={snack.id}
					name={snack.name}
				/>
			)
		});
		return (
			<div>
				<h1>Snack Stack</h1>
				Snacks here
				<ul>
					{snackItems}
				</ul>

			</div>
		)
	}
}
