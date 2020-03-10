import React from 'react'
import { Helmet } from 'react-helmet'
import Authorize from 'components/LayoutComponents/Authorize'
import {withRouter} from 'react-router-dom'


class ApplyLoan extends React.Component {
  render() {

    return (

      <div>
        {/*<Authorize roles={['admin']} redirect to="/dashboard/beta">*/}
          <Helmet title="Apply Loan" />
          <div className="utils__title utils__title--flat mb-3">
            <strong className="text-uppercase font-size-16">Apply Loan</strong>
          </div>
          <div className="row">
            <div className="col-lg-12">
              <div className="card">
                <div className="card-body">
                  [src\pages\contributions\ApplyLoan\index.js]
                </div>
              </div>
            </div>
          </div>
        </div>
      /*</Authorize>*/
    )
  }
}

export default withRouter(ApplyLoan)
