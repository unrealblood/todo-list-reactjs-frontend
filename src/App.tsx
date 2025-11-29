import { AuthHeader } from "./components/header/AuthHeader";
import { AllRoutes } from "./routes/AllRoutes";
import { UnauthHeader } from "./components/header/UnauthHeader";
import { Footer } from "./components/footer/Footer";
import { useAuthStore } from "./zustand/store";

function App() {
  const accessToken = useAuthStore((state) => state.accessToken);

  return (
    <div className="p-2 flex flex-col min-h-screen">
      {accessToken ? <AuthHeader /> : <UnauthHeader />}

      <div className="flex-1 overflow-auto">
        <AllRoutes />
      </div>
      
      <Footer />
    </div>
  );
}

export default App