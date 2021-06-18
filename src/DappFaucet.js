import Faucet from "./components/Faucet";
import Login from "./components/Login";
import { Box } from "@chakra-ui/react";
import Footer from "./components/Footer";
import { TokenContextProvider } from "./context/TokenContext";


function DappFaucet() {
  return (
    <TokenContextProvider>
      <Box height="100vh" direction="column" alignItems="center" justifyContent="center">
        <Login />
        <Faucet />
      </Box>
      <Footer w="100%" />
    </TokenContextProvider>
  );
}

export default DappFaucet;
