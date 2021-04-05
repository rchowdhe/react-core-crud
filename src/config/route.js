import  LoginForm from "../pages/login/LoginForm";

const routes = [
    {
        path: '/login',
        component: <LoginForm />,
        exact: true
    },
    {
        path: '/units',
        component: <LoginForm />,
        exact: true
    },
    {
        path: '/unit/add',
        component: <LoginForm />,
        exact: true
    },
    {
        path: '/unit/:id/edit',
        component: <LoginForm />,
        exact: true
    },
    {
        path: '/items',
        component: <LoginForm />,
        exact: true
    },
    {
        path: '/item/add',
        component: <LoginForm />,
        exact: true
    },
    {
        path: '/item/:id/upload',
        component: <LoginForm />,
        exact: true
    },
    {
        path: '/item/:id/edit',
        component: <LoginForm />,
        exact: true
    },
    {
        path: '/stocks',
        component: <LoginForm />,
        exact: true
    },
    {
        path: '/stock/add',
        component: <LoginForm />,
        exact: true
    },
    {
        path: '/stock/:id/edit',
        component: <LoginForm />,
        exact: true
    },
    {
        path: '/',
        component: <LoginForm />,
        exact: true
    },
    {
        path: '*',
        component: <LoginForm />,
        exact: false
    }
]

export default routes