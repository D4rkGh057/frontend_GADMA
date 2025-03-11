import "./App.css";
import { AppRouter } from "./AppRouter";
import { TramitesProvider } from "./context/TramitesProvider";

function App() {
  return (
    <TramitesProvider>
        <AppRouter />
    </TramitesProvider>
  );
}

export default App;
