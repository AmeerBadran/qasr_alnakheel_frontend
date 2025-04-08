import AppRouter from "./router/routers";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import AppWithErrorBoundary from "./ErrorBoundary";
function App() {

  return (
    <>
      <AppWithErrorBoundary>
        <AppRouter />
      </AppWithErrorBoundary>
      <ToastContainer />
    </>
  );
}

export default App;
