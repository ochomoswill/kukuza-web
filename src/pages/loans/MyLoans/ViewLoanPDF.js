import React from 'react'
import styled from '@react-pdf/styled-components'
import { Document, Font, Image, Page, StyleSheet, Text, View } from '@react-pdf/renderer'
import KukuzaLogo from '../../../assets/images/kukuza-blue-logo.png'
import timeUtils from '../../../utils/datetime'
import { getUserDetails } from '../../../utils/Session'
import moment, { getSumGuarantorAmount } from './index'
import numberUtils from '../../../utils/number'

const PDFTable = styled.View`display: flex; width:auto; borderStyle: solid; borderWidth: 1; borderRightWidth: 0; borderBottomWidth: 0`

const TR = styled.View`
flexDirection: row; margin:auto`

const TD = styled.View`
width: 8.33%; borderStyle: solid; borderWidth: 1; borderLeftWidth: 0; borderTopWidth: 0;'
`

const TH = styled.View`
color: white; background: #292f71; width: 8.33%; borderStyle: solid; borderWidth: 1; borderLeftWidth: 0; borderTopWidth: 0;'
`

const TT = styled.Text`
margin: auto; marginTop: 5; fontSize 8;
`

const tableStyles = StyleSheet.create({
	body: {
		paddingTop: 35,
		paddingBottom: 65,
		paddingHorizontal: 35,
		fontFamily: 'Oswald',
		fontSize: 8,
	},

	logo: {
		float: 'left',
		paddingBottom: 10,
		marginBottom: 10,
		height: 40,
		width: 190,
	},
	title: {
		fontSize: 24,
		textAlign: 'center',
		fontFamily: 'Oswald',
	},
	author: {
		fontSize: 12,
		textAlign: 'center',
		// marginBottom: 40,
	},
	subtitle: {
		fontSize: 18,
		margin: 12,
		fontFamily: 'Oswald',
	},
	text: {
		margin: 12,
		fontSize: 14,
		textAlign: 'justify',
		fontFamily: 'Times-Roman',
	},
	image: {
		marginVertical: 15,
		marginHorizontal: 100,
	},
	header: {
		fontSize: 12,
		marginBottom: 20,
		textAlign: 'center',
		color: 'grey',
	},
	pageNumber: {
		position: 'absolute',
		fontSize: 12,
		bottom: 30,
		left: 0,
		right: 0,
		textAlign: 'center',
		color: 'grey',
	},
})





const LoansReport = ({ statements, startDate, endDate }) => (
	<Document>
		<Page size="A4" style={tableStyles.body} rotate={180}>
			<Image
				style={tableStyles.logo}
				src={KukuzaLogo}
			/>

			<View style={{ marginBottom: 10 }}>
				<Text style={{ marginBottom: 5 }}>{timeUtils.getCurrentFullDate()}</Text>


				{
					getUserDetails() ? (
						<React.Fragment>
							<Text>{`${getUserDetails().firstName} ${getUserDetails().lastName} ${getUserDetails().otherNames}`}</Text>
							<Text>{`(Member ID - ${getUserDetails().accountNumber})`}</Text>
						</React.Fragment>
					) : null
				}


			</View>

			<Text style={{ textDecoration: 'underline', marginBottom: 10 }}>

				{
					startDate === undefined || endDate === undefined ? (
						<React.Fragment>
							ALL LOANS
						</React.Fragment>
					):(
						<React.Fragment>
							LOANS AS FROM {timeUtils.fullDate(moment(startDate))} TO {timeUtils.fullDate(endDate)}
						</React.Fragment>
					)
				}

			</Text>

			<Text style={{ marginBottom: 10 }}>Below is a summary of your loans with Kukuza Empowerment SACCO
				Limited.</Text>

			<PDFTable>
				<TR>
					<TH>
						<TT>Ref.</TT>
					</TH>
					<TH>
						<TT>Status</TT>
					</TH>
					<TH>
						<TT>Status Date</TT>
					</TH>
					<TH>
						<TT>Interest Rate</TT>
					</TH>
					<TH>
						<TT>Interest Accrued</TT>
					</TH>
					<TH>
						<TT>Type</TT>
					</TH>
					<TH>
						<TT>Start Date</TT>
					</TH>
					<TH>
						<TT>End Date</TT>
					</TH>
					<TH>
						<TT>Guaranteed</TT>
					</TH>
					<TH>
						<TT>Amount</TT>
					</TH>
					<TH>
						<TT>Amount Funded</TT>
					</TH>
					<TH>
						<TT>Balance</TT>
					</TH>
				</TR>

				{
					statements !== undefined ? (
						statements.length > 0 ? (
							statements.map((statement, key) => (
								<TR key={key}>
									<TD>
										<TT>{statement.loanReference}</TT>
									</TD>
									<TD>
										<TT>{statement.userLoanStatusByLoanStatusId.ulStatusName}</TT>
									</TD>
									<TD>
										<TT>{timeUtils.fullDate(statement.loanStatusDate)}</TT>
									</TD>
									<TD>
										<TT>{statement.loanInterestRate}</TT>
									</TD>
									<TD>
										<TT>{numberUtils.NumberToKES(numberUtils.zeroNoIsNull(statement.loanInterestAccrued))}</TT>
									</TD>
									<TD>
										<TT>{statement.userLoanTypeByLoanTypeId.loanTypeName}</TT>
									</TD>
									<TD>
										<TT>{timeUtils.fullDate(statement.loanFundDate)}</TT>
									</TD>
									<TD>
										<TT>{timeUtils.fullDate(statement.loanFundDueDate)}</TT>
									</TD>
									<TD>
										<TT>{numberUtils.NumberToKES(getSumGuarantorAmount(statement.guarantorsById))}</TT>
									</TD>
									<TD>
										<TT>{numberUtils.NumberToKES(statement.loanAmountRequested)}</TT>
									</TD>
									<TD>
										<TT>{numberUtils.NumberToKES(statement.amountFundedToLoan)}</TT>
									</TD>
									<TD>
										<TT>{numberUtils.NumberToKES((statement.loanAmountRequested - statement.amountFundedToLoan))}</TT>
									</TD>
								</TR>
							))
						) : <Text>No records found</Text>
					) : <Text>No records found</Text>
				}

			</PDFTable>

			<Text style={{ marginTop: 20, marginBottom: 20 }}>
				Thank you for having us as your investment group of choice.
			</Text>


			<Text style={{ marginTop: 10, marginBottom: 20 }}>Yours sincerely,</Text>

			<Text style={{ marginTop: 10, marginBottom: 10, fontSize: 14 }}>Signature</Text>

			<Text style={{ marginBottom: 20 }}>Kukuza Empowerment SACCO Limited</Text>
			<Text style={tableStyles.pageNumber} render={({ pageNumber, totalPages }) => (
				`${pageNumber} / ${totalPages}`
			)} fixed/>
		</Page>
	</Document>
)


Font.register({
	family: 'Oswald',
	src: 'https://fonts.gstatic.com/s/oswald/v13/Y_TKV6o8WovbUd3m_X9aAA.ttf',
})

export default LoansReport;
