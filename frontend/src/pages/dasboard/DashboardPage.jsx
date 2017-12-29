import React, { PropTypes } from 'react';
import {connect} from "react-redux";
import {bindActionCreators} from 'redux';
import Redirect from "react-router-dom/es/Redirect";
import isEqual from "lodash/isEqual";
const lodash = {isEqual};
import i18next from 'i18next';

import ProjectMenu from "../../components/projectsmenu/ProjectMenu";
import OperationTable from "../../components/operationstable/OperationTable";
import User from "../../components/user/User";
import Lang from "../../components/lang/Lang";
import {dashboardActions} from "./dashboard.actions";

import "./dashboardPage.less";
import DiagramContainer from "../../containers/DiagramContainer";

import enLang from "../../i18n/en.json";
import ruLang from "../../i18n/ru.json";
import localeService from '../../components/localization/locale.service';
import WithLocaleHOC from '../../components/localization/WithLocaleHOC';

function mapStateToProps(state) {
    const {loginReducer, dashboardReducer} = state;

    return {
        userId: loginReducer.authData.userId,
        username: loginReducer.authData.username,
        projects: dashboardReducer.projects,
        currentProjectId: dashboardReducer.currentProjectId,
        operations: dashboardReducer.operations,
        createUpdateLoading: dashboardReducer.createUpdateLoading,
        loading: dashboardReducer.loading,
        language: dashboardReducer.language
    };
}

function mapDispatchToProps(dispatch) {
    return {actions: bindActionCreators(dashboardActions, dispatch)};
}

@connect(mapStateToProps, mapDispatchToProps)
export class DashboardPage extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            projects: [],
            operations: []
        };
        this.i18nextParam = i18next;
    }

    shouldComponentUpdate(nextProps, nextState) {
        let result = !(lodash.isEqual(nextProps, this.props) && lodash.isEqual(nextState, this.state));
        console.log("anneq001::"+result);
        return result;
    }

    componentDidMount() {
        let projectId = this.props.match.params.projectId; //from url
        const currentProjectId = this.props.currentProjectId == null ? null : parseInt(this.props.currentProjectId);
        console.log("anneq411::currentProjectId="+currentProjectId+" projectId="+projectId);
        if (projectId && currentProjectId != projectId) {
            console.info("Set project from url projectId=" + projectId);
            this.props.actions.setCurrentProject(projectId);
        } else {
            if (currentProjectId == null) {
                this.props.actions.restoreCurrentProject();
            }
        }

        console.log("anneq411::this.props.projects="+this.props.projects);
        if (this.props.projects.length === 0) { //SSR
            this.props.actions.loadProjects(this.props.userId);
        }

        this.setLanguage(null, true);
    }

    handleCreateProject = (name) => this.props.actions.createProject(name, this.props.userId);

    handleOperationCreate = (operationData) => {
        this.props.actions.createOperation(operationData, this.props.currentProjectId);
    };

    handleOperationUpdate = (operationData) => {
        this.props.actions.updateOperation(operationData);
    };

    handleOperationRemove = (operationId) => {
        this.props.actions.removeOperation(operationId);
    };

    logout = () => {
        this.props.actions.logout()
        //this.props.dispatch(loginActions.logout());
    };

    refresh = () => this.props.actions.loadOperations(this.props.userId);

    //https://github.com/dmt-13/i18next-example/blob/master/src/containers/App/index.jsx
    setLanguage = (language, skipAction) => {
        if (!language) {
            //https://github.com/iam-peekay/inbox-react-intl.git in index.js
            // language = (navigator.languages && navigator.languages[0]) ||
            //     navigator.language || navigator.userLanguage;
            // language = language.toLowerCase().split(/[_-]+/)[0];
            language = "en"; //todo sync with SSR, async lang load, cache
        }

        i18next.init({
            lng: language,
            //resources: require(`json!../../i18n/${language}.json`)
            resources: language === "en" ? enLang : ruLang
        });

        if (skipAction === true) {
        } else {
            this.props.actions.changeLanguage(language);
            localeService.fire();
        }
    };

    //https://www.youtube.com/watch?v=lxq938kqIss
    getChildContext() {
        return {i18next: this.i18nextParam}
    }

    static childContextTypes = {
        i18next: PropTypes.object
    }

    render() {
        //console.log("anneq302::SSR - dashboard");

        console.debug("projectId=" + this.props.currentProjectId);
        const currentProjectId = this.props.currentProjectId == null ? null : parseInt(this.props.currentProjectId);
        const urlProjectId = this.props.match.params.projectId;
        if (currentProjectId != null && currentProjectId != urlProjectId) {
            return (<Redirect to={"/dashboard/" + currentProjectId}/>);
        }

        let operations = this.props.operations || [];

        //console.log("anneq301::SSR - dashboard::operations.length="+operations.length);
        //console.log("anneq301::SSR - dashboard::currentProjectId="+currentProjectId);
        return (
            <div>
                <div className="navigation">
                    <div className="navigation_item">
                        <ProjectMenu projects={this.props.projects}
                                     onProjectCreate={this.handleCreateProject}
                                     onProjectRemove={this.props.actions.removeProject}
                                     changeProject={this.props.actions.setCurrentProject}
                        />
                    </div>
                    <div className="navigation_right-block">
                        <div className="navigation_item">
                            <Lang onChange={this.setLanguage}/>
                        </div>
                        <div className="navigation_item">
                            <User userName={this.props.username} onLogout={this.logout}/>
                        </div>
                    </div>
                </div>
                <div className="content">
                    {/*<MoneySummary/> todo*/}
                    {currentProjectId && <DiagramContainer projectId={currentProjectId} />}
                    {currentProjectId &&
                    <OperationTable operations={operations}
                                    onRefresh={this.refresh}
                                    loading={this.props.loading}
                                    onOperationCreate={this.handleOperationCreate}
                                    onOperationUpdate={this.handleOperationUpdate}
                                    createUpdateLoading={this.props.createUpdateLoading}
                                    onOperationRemove={this.handleOperationRemove}
                    />}
                </div>
                {/*<div id="i18n-test">{i18next.t('test_message')}</div>*/}
                {/*<div>{i18next.t('amount_of_bananas', {count: 5})}</div>*/}
            </div>
        )
    }
}

//export default WithLocaleHOC(true)(DashboardPage);
//const connected = connect(mapStateToProps, mapDispatchToProps)(WithLocaleHOC(true)(DashboardPage));
//export {connected as DashboardPage};


//const connected = connect(mapStateToProps)(DashboardPage);
//export {connected as DashboardPage};
// https://stackoverflow.com/questions/31079081/programmatically-navigate-using-react-router
// this.props.history.push('/dashboard/' + projectId);
// //context.history.push('/dashboard/' + projectId);
// https://stackoverflow.com/questions/31079081/programmatically-navigate-using-react-router
// Dashboard.contextTypes = {
//     history: React.PropTypes.shape({
//         push: React.PropTypes.func.isRequired
//     })
// }
//export default withRouter(Dashboard); //https://stackoverflow.com/questions/42701129/how-to-push-to-history-in-react-router-v4