import React from 'react'
import { Helmet } from 'react-helmet'
import Authorize from 'components/LayoutComponents/Authorize'
import {withRouter} from 'react-router-dom'


class MyProfile extends React.Component {
  render() {

    return (

      <div>
        {/*<Authorize roles={['admin']} redirect to="/dashboard/beta">*/}
          <Helmet title="My Profile" />
          <div className="utils__title utils__title--flat mb-3">
            <strong className="text-uppercase font-size-16">My Profile</strong>
          </div>
          <div className="row">
            <div className="col-lg-12">
              <div className="card">
                <div className="card-body">
                  [src\pages\contributions\MyProfile\index.js]
                </div>
              </div>
            </div>
          </div>
        </div>
      /*</Authorize>*/
    )
  }
}

export default withRouter(MyProfile)
