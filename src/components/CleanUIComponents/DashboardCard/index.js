import React from 'react'
import style from './style.module.scss'
import { Button, Icon } from 'antd'

class DashboardCard extends React.Component {
	static defaultProps = {
		chartProps: {},
		title: '',
		amount: '',
	}

	render() {
		const { title, amount, link , icon, fontIcon} = this.props
		return (
			<React.Fragment>
				<div className={`card`}>
					<div className={`${style.card}`}>
					{title &&
					<div className={`text-capitalize ${style.title}`}>
						<span>{title}</span>
						{icon && <Icon style={{float: 'right', fontSize: 36, color:"#292e71"}} type={icon}/>}
						{fontIcon && <div style={{float: 'right', fontSize: 36, color:"#292e71"}}><i className={fontIcon} /></div>}
					</div>}
					{amount && <div className={style.amount}>{amount}</div>}


					</div>

					{link && <div style={{
						padding: "5px 0 5px 0",
						background: "aliceblue",
						borderBottomLeftRadius: "7px",
						borderBottomRightRadius: "7px"
					}}>
						<center>
							{link}
						</center>
					</div>}

				</div>

			</React.Fragment>
		)
	}
}

export default DashboardCard
