/**
 * Created by alexanderyan on 7/14/16.
 */

import {SnackList} from './SnackList';
import SnackCreateModal from './SnackCreateModal';


class SnackIndex {
	constructor(prop)
	{
		super(prop);
	}

	render()
	{
		return (
			<div>
				<SnackList/>
				<SnackCreateModal/>
				
			</div>
		)
	}
}


