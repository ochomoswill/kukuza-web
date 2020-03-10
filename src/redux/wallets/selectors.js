export function getAllMyWallets(state) {
    const allWallets = state.walletsReducer.myWallets;

    let pagination = {
        showQuickJumper: true,
        showSizeChanger: true,
        showTotal: (total, range) => `${range[0]}-${range[1]} of ${total} wallets`,
        total: allWallets.totalCount,
        current: allWallets.currentPage,
        pageSize: allWallets.pageSize,
        pageSizeOptions: ['1', '2', '5', '10', '25', '50', '100', '250', '500'],
    };

    let shareCapital = 0;
    let totalContributions = 0;
    let bookBalance = 0;
    let loanAllowable = 0;
    let loan = 0;

    if (allWallets.records !== undefined) {
        if (allWallets.records.length > 0) {
            let myWallet = allWallets.records[0];
            shareCapital = myWallet.shareCapital;
            bookBalance = myWallet.bookBalance;
            if (myWallet) {
                totalContributions = parseInt(myWallet.actualBalance);
                if (myWallet.bookBalance > 0) {
                    loanAllowable = 3 * myWallet.bookBalance
                }
            }
        }
    }

    return {
        name: 'My Wallets',
        tracker: state.walletsReducer.myWalletsTracker,
        timestamp: state.walletsReducer.myWalletsTimestamp,
        data: state.walletsReducer.myWallets.records,
        noRecordMessage: 'No Wallets Found',
        pagination,
        shareCapital,
        totalContributions,
        bookBalance,
        loanAllowable,
        loan,
    }
}

export function getMyWallet(state) {
    return {
        name: 'My Wallet',
        tracker: state.walletsReducer.myWalletTracker,
        timestamp: state.walletsReducer.myWalletTimestamp,
        data: state.walletsReducer.myWallet,
    }
}
