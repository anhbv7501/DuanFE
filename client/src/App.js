import { BrowserRouter as Router } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "slick-carousel/slick/slick-theme.css";
import "slick-carousel/slick/slick.css";
import { ConfirmDialog, MessageDialog } from "./components/Dialog";
import Loading from "./components/Loading";
import LookScreen from "./components/LockScreen";
import Routes from "./routers/Routes";
import "./sass/index.scss";


function App() {
  return (
    <div className="App">
      {/* <ThemeProvider theme={theme}> */}
      <Router>
        <Routes />
      </Router>
      <Loading />
      <LookScreen />
      <MessageDialog />
      <ConfirmDialog />
      {/* </ThemeProvider> */}

      <ToastContainer
        position="top-right"
        autoClose={2000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
      />
    </div>
  );
}

export default App;
