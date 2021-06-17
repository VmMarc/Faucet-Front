import { Web3Context } from "web3-hooks";
import { useContext } from "react";
import { Button, useColorMode, useColorModeValue, Stack } from "@chakra-ui/react";
import { Box, Text, Heading, useDisclosure } from "@chakra-ui/react";

import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
} from "@chakra-ui/react";

function Login({ title, desc, ...rest }) {
  const [web3State, login] = useContext(Web3Context);
  const { toggleColorMode } = useColorMode();
  const { formBackground } = useColorModeValue("gray.100", "gray.300");
  const { isOpen: isOpenLogoutModal, onOpen: onOpenLogoutModal, onClose: onCloseLogoutModal } = useDisclosure();

  const handleClickLogin = () => {
    if (!web3State.isLogged) {
      login();
    } else {
    }
  };

  return (
    <>
      <Modal isOpen={isOpenLogoutModal} onClose={onCloseLogoutModal}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Log out from a Dapp</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <Text>You can not log out from a Dapp.</Text>
            <Text>If you want to log out of this website, do it directly from MetaMask.</Text>
          </ModalBody>

          <ModalFooter>
            <Button colorScheme="teal" mr={3} onClick={onCloseLogoutModal}>
              Close
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>

      <Box
        p={-5}
        shadow="lg"
        borderWidth="1px"
        flex="1"
        borderRadius="md"
        {...rest}
        w="100%"
        h="100px"
        bgGradient="linear(to-l, #3CAADD, #4FAA1B)"
      >
        <Stack direction="row" spacing={6} justifyContent="space-between" p={8}>
          <Button
            colorScheme="tomato"
            bg="green"
            onClick={() => (!web3State.isLogged ? handleClickLogin() : onOpenLogoutModal())}
          >
            {!web3State.isLogged ? "Log in" : 
            web3State.account.split("").splice(0, 6).join("") + "..." +
            web3State.account.split("").splice(-4).join("")}
          </Button>

          <Heading>
            <Text
              alignItems="center"
              bgGradient="linear(to-l, #97266D,#DD6B20)"
              bgClip="text"
              fontSize="4xl"
              fontWeight="extrabold"
            >
              Welcome to Faucet
            </Text>
          </Heading>

          <div background={formBackground} p={12} rounded={10}>
            <Button colorScheme="blue" onClick={toggleColorMode}>
              Dark Mode
            </Button>
          </div>
        </Stack>
      </Box>
    </>
  );
}

export default Login;

// bg entête : bgGradient="linear(to-l, #3CAADD, #4FAA1B)"

//text : bgGradient = "linear(to-l, #7928CA,#FF0080)";
