import React from 'react';
// old
// const SignUp1 = React.lazy(() => import('./Demo/Authentication/SignUp/SignUp1'));
// const Signin1 = React.lazy(() => import('./Demo/Authentication/SignIn/SignIn1'));

const Signin = React.lazy(() => import('./App/components/SignIn/SignIn'));
const Register = React.lazy(() => import('./App/components/Register/Register'));

const route = [
    { path: '/auth/signup', exact: true, name: 'Signup', component: Register },
    { path: '/auth/signin', exact: true, name: 'Signin', component: Signin }
];

export default route;