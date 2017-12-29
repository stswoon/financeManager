import React, { Component, PropTypes } from 'react';
import localeService from './locale.service'

const WithLocaleHOC = (reload) => (WrappedComponent) => {
    return class WithLocaleHOC extends Component {
        static contextTypes = {
            i18next: PropTypes.object
        };

        componentDidMount() {
            //if (reload) {
                this.index = localeService.subscribe(() => {
                    //this.forceUpdate()
                    const component = this.wrappedComponent || this;
                    component.forceUpdate();
                });
            //}
        }

        componentWillUnmount() {
            localeService.unsubscribe(this.index);
        }

        //https://medium.com/@franleplant/react-higher-order-components-in-depth-cf9032ee6c3e
        proc(wrappedComponent) {
            this.wrappedComponent = wrappedComponent;
        }

        render() {
            const { i18next } = this.context;
            return <WrappedComponent {...this.props} i18next={i18next} ref={this.proc.bind(this)}/>
        }
    }
};

export default WithLocaleHOC;