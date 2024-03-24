import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { HOME, LOGIN, TRANSFER } from "./router/paths";
import { AuthContextProvider } from "./providers/AuthProvider";
import { FeedbackContextProvider } from "./providers/FeedbackProvider";

import Home from "./pages/Home";
import Login from "./pages/Login";
import Transfer from "./pages/Transfer";
import { PublicRouter } from "./router/PublicRouter";
import { PrivateRouter } from "./router/PrivateRouter";

function App() {
  return (
    <FeedbackContextProvider>
      <AuthContextProvider>
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<PublicRouter />}>
              <Route path={LOGIN} element={<Login />} />
            </Route>
            <Route path={HOME} element={<PrivateRouter />}>
              <Route index element={<Home />} />
              <Route path={TRANSFER} element={<Transfer />} />
            </Route>
            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
        </BrowserRouter>
      </AuthContextProvider>
    </FeedbackContextProvider>
  );
}

export default App;
