import React, { Component, PropTypes } from 'react';
import localeService from './locale.service'

const WithLocaleHOC = (WrappedComponent) => {
    return class WithLocaleHOC extends Component {
        static contextTypes = {
            i18next: PropTypes.object
        };

        componentDidMount() {
            localeService.subscribe(() => this.forceUpdate());
        }

        render() {
            const { i18next } = this.context;
            return <WrappedComponent {...this.props} i18next={i18next} />
        }
    }
};

export default WithLocaleHOC;