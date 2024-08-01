import {useRoutes} from 'react-router-dom';

// set a filterded routes to react router dom
const Router = ({allRoutes}) => {
    const routes = useRoutes([...allRoutes]);
    return routes;
};

export default Router;