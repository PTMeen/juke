import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import { Provider } from "react-redux";

import { AuthContextProvider } from "./context/AuthContext";
import { store } from "./store/store";
import { PlayerContextProvider } from "./context/PlayerContext";

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <AuthContextProvider>
    <Provider store={store}>
      <PlayerContextProvider>
        <App />
      </PlayerContextProvider>
    </Provider>
  </AuthContextProvider>
);
