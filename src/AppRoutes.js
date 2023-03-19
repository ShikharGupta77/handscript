import About from "./pages/about/page.js"
import Hello from './pages/hello/page.js';
import Learn from './pages/learn/page.js';
import Translate from './pages/translate/page.js';
import Development from './pages/development/page.js';
import Test from './pages/test/page.js';

import { useRoutes } from "react-router-dom";

const AppRoutes = () => {
    let routes = useRoutes([
      { path: "/", element: <Hello /> },
      { path: "/about", element: <About /> },
      { path: "/learn", element: <Learn/>},
      { path: "/translate", element: <Translate/>},
      { path: "/development", element: <Development/>},
      { path: "/test", element: <Test/>}
    ]);
    return routes;
  };

export default AppRoutes;