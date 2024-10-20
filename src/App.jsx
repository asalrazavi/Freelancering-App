import { Route, Routes } from "react-router-dom";
import { Toaster } from "react-hot-toast";
import Auth from "./pages/Auth";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import CompleteProfile from "./pages/CompleteProfile";

const queryClient = new QueryClient();

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <div className="container xl:max-w-screen-xl">
        <Routes>
          <Route path="/auth" element={<Auth />}></Route>
          <Route path="/complete-profile" element={<CompleteProfile />}></Route>
          <Route path="/" element={}/>
          <Route path="*" element={}/>
        </Routes>
        <Toaster />
      </div>
    </QueryClientProvider>
  );
}

export default App;
