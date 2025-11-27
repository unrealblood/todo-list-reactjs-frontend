import { AuthHeader } from "./components/header/AuthHeader";
import { AllRoutes } from "./routes/AllRoutes";

function App() {
  return (
    <div className="p-2">
      <AuthHeader />
      <AllRoutes />
    </div>
  );
}

export default App