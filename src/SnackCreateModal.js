/**
 * Created by alexanderyan on 7/14/16.
 */


export default class SnackCreateModal
{
	constructor(props)
	{
		super(props);
	}

	openModal()
	{
		this.setState({showCreateSnackModal: true});
	}
	
	render ()
	{
		 return (<Modal show={this.state.showCreateSnackModal} onHide={this.close}>
			<Modal.Header closeButton>
				<Modal.Title>Create Snack</Modal.Title>
			</Modal.Header>
			<Modal.Body>
				uguuuu
			</Modal.Body>
		</Modal>
		 )
	}
}
