import Admin from "./admin"
import Hello from "./Hello"
import Login from "./login/LoginForm"

const routes = [
    {
        path: "/",
        component: Login,
        exact: true
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