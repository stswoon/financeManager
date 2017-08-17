import Admin from "./admin"
import Hello from "./Hello"
import Login from "./login/LoginForm"
import Dashboard from "./dashboard/Dashboard"

const routes = [
    {
        path: "/q",
        component: Login,
        exact: true
    },
    {
        path: "/",
        component: Dashboard,
    },
    {
        path: "/hello",
        component: Hello,
    },
    {
        path: "/admin",
        component: Admin
    }
];
export default routes;