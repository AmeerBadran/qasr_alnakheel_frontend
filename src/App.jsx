import AppRouter from "./router/routers";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import AppWithErrorBoundary from "./ErrorBoundary";
import AppWrapper from "./ChangeLayout";
function App() {
  return (
    <>
      <AppWithErrorBoundary>
        <AppWrapper>
          <AppRouter />
        </AppWrapper>
      </AppWithErrorBoundary>
      <ToastContainer />
    </>
  );
}

export default App;
