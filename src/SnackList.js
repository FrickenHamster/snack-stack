/**
 * Created by alexanderyan on 7/14/16.
 */

import  React from 'react';

export class SnackListItem extends React.Component {
	constructor(props)
	{
		super(props);
	}

	render ()
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
			snacks: [
				{
					id: 0,
					name: "Blueberries"
				
				},
				{
					id: 1,
					name: "Honest Kids Juice Boxes"
				}
			]
		}
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
