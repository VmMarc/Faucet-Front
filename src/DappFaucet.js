import Faucet from "./components/Faucet";
import Login from "./components/Login";
import { Flex } from "@chakra-ui/react";
import Footer from "./components/Footer";
import { TokenContextProvider } from "./context/TokenContext";


function DappFaucet() {
  return (
    <TokenContextProvider>
      <Login />
      <Flex height="100vh" alignItems="center" justifyContent="center">
        <Faucet />
      </Flex>
      <Footer />
    </TokenContextProvider>
  );
}

export default DappFaucet;
