export async function getLeftMenuData() {
  return [
    /*{
      title: 'Settings',
      key: 'settings',
      icon: 'icmn icmn-cog utils__spin-delayed--pseudo-selector',
    },
    {
      title: 'Documentation',
      key: 'documentation',
      url: 'https://docs.cleanuitemplate.com',
      target: '_blank',
      icon: 'icmn icmn-books',
    },
    {
      divider: true,
    },*/
    {
      title: 'Dashboard',
      key: 'dashboardAlpha',
      url: '/dashboard/alpha',
      icon: 'icmn icmn-home',
    },
    {
      divider: true,
    },
    {

      title: 'Contributions',
      key: 'contributions',
      /*url: "/contributions",*/
      icon: 'icmn icmn-coin-dollar',
      children: [
        {
          key: 'makeContributions',
          title: 'Make Contributions',
          url: '/contributions/make',
        },
        {
          key: 'viewContributions',
          title: 'View Contributions',
          url: '/contributions/view',

        },
      ],
    },
    {

      title: 'Loans',
      key: 'loans',
      /*url: "/loans",*/
      icon: 'icmn icmn-drawer',
      children: [
        {
          key: 'applyLoan',
          title: 'Apply Loan',
          url: '/loans/apply',
        },
        /*{
                        key: 'loanStatements',
                        title: 'Loan Statements',
                        url: '/loan-statements',
                    },*/
        {
          key: 'loanStatus',
          title: 'My Loans',
          url: '/loans/view',
        },
        /*{
          key: 'payLoan',
          title: 'Pay Loan',
          url: '/pay-loan',
        },*/
        /*{
                        key: 'loansGuaranteed',
                        title: 'Loans Guaranteed',
                        url: '/loans-guaranteed',
                    },*/
        /*{
                        key: 'myLoanGuarantors',
                        title: 'My Loan Guarantors',
                        url: '/my-loans-guarantors',
                    },*/
        {
          key: 'guarantorshipRequests',
          title: 'Guarantorship Requests',
          url: '/loans/quarantor-requests',

        },
      ],
    },
    {

      divider: true,
    },
    {
      title: 'Kin Details',
      key: 'kinDetails',
      url: '/kins/view',
      icon: 'icmn icmn-address-book',
    },
    /*{
      title: 'Bank Details',
      key: 'bankDetails',
      url: '/bank-details',
      icon: 'icmn icmn-library  ',
    },*/
    /*{
        title: 'Employer Details',
        key: 'employerDetails',
        url: '/empty',
        icon: 'icmn icmn-briefcase',
      },*/

    {
      divider: true,
    },
    {

      title: 'User Profile',
      key: 'userProfile',
      url: '/me/profile',
      icon: 'icmn icmn-user',
    },
    {
      title: 'Change Password',
      key: 'changePassword',
      url: '/me/change-password',
      icon: 'icmn icmn-unlocked',
    },
    {
      title: 'My Documents',
      key: 'myDocuments',
      url: '/me/documents',
      icon: 'icmn icmn-books',
    },
		{
			divider: true,
		},
		{

			title: 'Tools',
			key: 'tools',
			/*url: "/contributions",*/
			icon: 'icmn icmn-briefcase',
			children: [
				{
					key: 'confirmMPESAPayment',
					title: 'Confirm M-PESA Payment',
					url: '/tools/confirm-mpesa-payment',
				}
			],
		},
    /*{
            divider: true
        },
        {
            title: "Users",
            key: "users",
            url: "/users",
            icon: "icmn icmn-unlocked"
        },*/
  ]
}
export async function getTopMenuData() {
  return [
    {
      title: 'Settings',
      key: 'settings',
      icon: 'icmn icmn-cog utils__spin-delayed--pseudo-selector',
    },
    {
      title: 'Docs',
      key: 'documentation',
      url: 'https://docs.cleanuitemplate.com',
      target: '_blank',
      icon: 'icmn icmn-books',
    },
    {
      title: 'Dashboard Alpha',
      key: 'dashboardAlpha',
      url: '/dashboard/alpha',
      icon: 'icmn icmn-home',
    },
  ]
}
