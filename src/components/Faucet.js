import { useContext, useState, useEffect } from "react";
import { Web3Context } from "web3-hooks";
import RobinetToken from "./TokenFunc";
import { ethers } from "ethers";
import { useToast } from "@chakra-ui/react";
import { useToken } from "../context/TokenContext";
import { FaucetContext } from "../App";

import { Button, Flex } from "@chakra-ui/react";
import { Tabs, TabList, TabPanels, Tab, TabPanel, rest, Box, Heading, Center, Spacer } from "@chakra-ui/react";

function Faucet() {
  const [web3State] = useContext(Web3Context);
  const [robinetToken, faucet] = useContext(FaucetContext);
  const { token, error, ownBalance, balance, dispatch, timer } = useToken();
  const toast = useToast()
  const [loading, setLoading] = useState(false)


  

  const handleClaimToken = async () => {
    setLoading(true)
    try {
      
      const tx = await faucet.claim();
      await tx.wait()
       
       toast({
        title: 'Confirmed transaction',
        description: `Success !! we sent you 100 ${token.symbol}\n tx ${tx.hash}`,
        status: 'success',
        duration: 5000,
        isClosable: true,
      })
    } catch (e) {
      console.log(e);
    } finally {
      setLoading(false)
    }
  };

  return (
      <Center>
        <Tabs isFitted variant="enclosed">
            <TabList>
              <Tab borderWidth="4px" fontSize="2xl">
                Faucet
              </Tab>
              <Tab borderWidth="4px" fontSize="2xl">
                Functionality RBN
              </Tab>
            </TabList>
            <TabPanels>
              {/* initially mounted */}
              <TabPanel>
                  <Flex flexDirection="column" alignItems="center" m={4} p={20} boxShadow="2xl" rounded="md" borderWidth="2px" flex="1" {...rest}>
                      <Heading align="center" fontSize="6xl" mb={20}>
                        🔥 CLAIM {} RIGTH NOW ! 🔥 
                      </Heading>
                      <Spacer />
                        <Box w="500px" p={5} bg="gray.300" rounded="xl" fontWeight="bold" mb={20}>
                          Your RBN balance : {balance}
                        </Box>

                        <Button onClick={handleClaimToken} bg="green.400" size="lg" height="60px" width="300px">
                          Claim 100 RBN
                        </Button>
                  </Flex>
              </TabPanel>
              {/* initially not mounted */}
              <TabPanel>
                <RobinetToken />
              </TabPanel>
            </TabPanels>
        </Tabs>
      </Center>
  );
}

export default Faucet;
