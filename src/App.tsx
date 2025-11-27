import { useState } from "react";
import { AuthHeader } from "./components/header/AuthHeader";
import { AllRoutes } from "./routes/AllRoutes";
import { UnauthHeader } from "./components/header/UnauthHeader";
import { Footer } from "./components/footer/Footer";

function App() {
  const [isAuthUser, setIsAuthUser] = useState<boolean>(true);

  return (
    <div className="p-2 flex flex-col min-h-screen">
      {isAuthUser ? <AuthHeader /> : <UnauthHeader />}

      <div className="flex-1 overflow-auto">
        <AllRoutes />
      </div>
      
      <Footer />
    </div>
  );
}

export default App