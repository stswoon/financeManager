import Admin from "./admin"
import Hello from "./Hello"

const routes = [
    {
        path: "/",
        component: Hello,
        exact: true
    },
    {
        path: "/admin",
        component: Admin
    }
];
export default routes;