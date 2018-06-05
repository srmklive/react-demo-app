import React, { Component } from 'react';


const aSyncComponent = ( WrappedComponent) => {
    return class extends Component {
        state = {
            component: null
        }

        componentDidMount () {
            WrappedComponent().then(component => {
                this.setState({component: component.default})
            });
        }

        errorConfirmedHandler = () => {
            this.setState( { error: null } );
        }

        render () {
            const C = this.state.component;

            return C ? <C {...this.props} /> : null;
        }
    }
}

export default aSyncComponent;