import { BrowserRouter, Route, Switch } from "react-router-dom";

import { Home } from "./pages/Home";
import { NewRoom } from "./pages/NewRoom";
import { AuthContextProvider } from "./contexts/AuthContext";
import { Room } from "./pages/Room";

function App() {
  return (
    <BrowserRouter>
      <AuthContextProvider>
        <Switch>
          {" "}
          {/* Switch vai alternar entre as rotas, não vai permitir que 2 sejam chamadas ao mesmo tempo*/}
          <Route path="/" exact={true} component={Home} />
          <Route path="/rooms/new" component={NewRoom} />
          <Route path="/rooms/:id" component={Room} />
        </Switch>
      </AuthContextProvider>
    </BrowserRouter>
  );
}

export default App;
