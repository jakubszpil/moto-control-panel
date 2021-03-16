import Geolocalizer from "./features/geolocalizer/Geolocalizer";
import Devmanager from "./features/devmanager/Devmanager";
import { Switch, Route } from "react-router-dom";

import Home from "./pages/Home/Home";

export default function App() {
  return (
    <Geolocalizer>
      <Devmanager>
        <Switch>
          <Route exact path="/" component={Home} />
        </Switch>
      </Devmanager>
    </Geolocalizer>
  );
}
