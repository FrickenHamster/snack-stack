/**
 * Created by alexanderyan on 7/14/16.
 */

import React from 'react';
import Panel from 'react-bootstrap/lib/Panel';

export class SnackListItem extends React.Component {
	
	constructor(props)
	{
		super(props);
		this.upVote = this.upVote.bind(this);
		this.downVote = this.downVote.bind(this);
		console.log(this.props.snack)
	}

	upVote()
	{
		this.props.voteMethod(this.props.snack, "up");
	}
	
	downVote()
	{
		this.props.voteMethod(this.props.snack, "down");
	}
	
	render()
	{
		return (
			<li>
				<Panel>
					<h4 style={{display: 'inline-block'}}>{this.props.snack.name}</h4>
					<div style={{float: 'right'}}>
						<div className="fa fa-arrow-up" onClick={this.upVote}/>
						<div> {this.props.snack.score} </div>
						<div className="fa fa-arrow-down" onClick={this.downVote}/>
					</div>
				</Panel>
			</li>
		)
	}
}


export class SnackList extends React.Component {
	constructor(props)
	{
		super(props);
		this.state = {
			snacks: this.props.snacks,
		};
		this.voteSnackList = this.voteSnackList.bind(this);
	}

	componentWillReceiveProps(nextProps)
	{
		if (nextProps.snacks !== this.state.snacks)
		{
			console.log('new snacks');
			this.setState({snacks: nextProps.snacks});
		}
	}
	
	voteSnackList(id, vote)
	{
		this.props.voteMethodList(id, vote);
	}

	render()
	{
		var votefunc = this.voteSnackList;
		let snackItems = this.state.snacks.map(function (snack)
		{
			return (
				<SnackListItem
					key={snack.id}
					snack={snack}
					voteMethod={votefunc}
				/>
			)
		});
		return (
			<div>
				<h1>Snack Stack</h1>
				<ul>
					{snackItems}
				</ul>

			</div>
		)
	}
}
