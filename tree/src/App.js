import "./App.css";
import { StyledEngineProvider } from "@mui/material/styles";
import Tree from "./component/tree/tree";

function App() {
  return (
    <div className="App">
      <StyledEngineProvider injectFirst>
        <Tree />
      </StyledEngineProvider>
    </div>
  );
}

export default App;
