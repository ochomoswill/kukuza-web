import React from "react";
import {connect} from "react-redux";
import {initialEntityVal} from "./constants";
import {ActionTypeStatus, IActionTypeStatus, IActionTypeSubString, IMakeAction, makeAction} from "redux/flexi/actions";
import {EntityPropertyTypes} from "redux/helpers";
import {IAPIRequestParams} from "redux/flexi/services";


const Container = ({children, ...rest}) => children(rest);

function mapStateToProps({flexiReducer}, ownProps) {
    let stateProps = {};
    const {entityObject} = ownProps;

    Object.entries(entityObject).forEach(([entityKey, entityValue]) => {
        Object.entries(entityValue).forEach(([entityPropertyKey, entityPropertyValue]) => {
            if (entityPropertyValue) {
                let statePropName = `${entityKey}`;
                // stateProps[statePropName] = flexiReducer[statePropName] ? flexiReducer[statePropName][`${entityPropertyKey}`] : initialEntityVal
                stateProps[statePropName] = flexiReducer[statePropName] ? flexiReducer[statePropName] : initialEntityVal
            }
        });
    });

    return stateProps;
}

/*export interface IHandleRequestArgs {
    typeSubString: IActionTypeSubString
    reqParams?: IAPIRequestParams
    entity: string
    multiple?: boolean
    status?: IActionTypeStatus
}*/


function mapDispatchToProps(dispatch) {
    return {
        handleRequest(options) {
            const {typeSubString, entity, multiple, status, reqParams} = options;

            dispatch(
                makeAction(
                    {
                        typeSubString: typeSubString,
                        status: status ? status  : ActionTypeStatus.loading,
                        multiple: multiple ? multiple : false
                    }, {
                        payload: reqParams ? reqParams : undefined,
                        entity
                    }
                )
            );
        },
    };
}

const ConnectedChildren = connect(
    mapStateToProps,
    mapDispatchToProps,
)(Container);


/*interface IActionContainerProps {
    entityObject: IEntityObject
}*/

class ActionContainer extends React.Component {
    render() {
        return (
            <ConnectedChildren {...this.props}/>
        );
    }
}

export default ActionContainer;
