import "./App.css";
import { AppRouter } from "./AppRouter";
import { DireccionesProvider } from "./context/DireccionesProvider";
import { TramitesProvider } from "./context/TramitesProvider";

function App() {
  return (
    <DireccionesProvider>
      <TramitesProvider>
        <AppRouter />
      </TramitesProvider>
    </DireccionesProvider>
  );
}

export default App;
