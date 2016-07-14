/**
 * Created by alexanderyan on 7/14/16.
 */
import  React from 'react';
import ReactDOM from 'react-dom';

class SnackList extends React.Component
{
	render()
	{
		return (
			<div>
				Snacks here
			</div>
		)
	}
}
ReactDOM.render(<SnackList/>, document.getElementById("snacks"));

