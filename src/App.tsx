import { useState } from "react";
import { AuthHeader } from "./components/header/AuthHeader";
import { AllRoutes } from "./routes/AllRoutes";
import { UnauthHeader } from "./components/header/UnauthHeader";

function App() {
  const [isAuthUser, setIsAuthUser] = useState<boolean>(true);

  return (
    <div className="p-2">
      {isAuthUser ? <AuthHeader /> : <UnauthHeader />}
      <AllRoutes />
    </div>
  );
}

export default App