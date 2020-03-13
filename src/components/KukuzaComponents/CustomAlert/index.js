import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import { Alert } from 'antd'

class CustomAlert extends PureComponent {
	render() {
		const { show = false, title, description, type, showIcon = true, banner} = this.props;
		return (
			<React.Fragment>
				{
					show ? (
						<Alert
							style={{marginBottom: 20}}
							message={title}
							description={description}
							type={type}
							showIcon={showIcon}
							banner={banner}
						/>
					): null
				}
			</React.Fragment>
		)
	}
}

CustomAlert.propTypes = {
	show: PropTypes.bool,
	title: PropTypes.string,
	description: PropTypes.string,
	type: PropTypes.oneOf(['success', 'error', 'info', 'warning']),
	showIcon: PropTypes.bool,
	banner: PropTypes.bool
}

export default CustomAlert
