import { useContext, useState } from "react";
import { Web3Context } from "web3-hooks";
import RobinetToken from "./RobinetToken";
import { ethers } from "ethers";
//import { createBreakpoints } from "@chakra-ui/theme-tools";
//import fleches from "../assets/images/fleches.png";
//import { Image } from "@chakra-ui/react";
//  <Image src={fleches} alt="fleches" />

import { Button, Text, Flex, Input } from "@chakra-ui/react";
import { Tabs, TabList, TabPanels, Tab, TabPanel, Stack, rest, Box, Heading, desc } from "@chakra-ui/react";

function Faucet() {
  const [web3State] = useContext(Web3Context);
  const [ethBalance, setEthBalance] = useState(0);
  const [address, setAddress] = useState(ethers.constants.AddressZero);
  const [ethToSend, setEthToSend] = useState(0);

  const handleClickGetBalance = async () => {
    try {
      const balance = await web3State.provider.getBalance(address);
      setEthBalance(ethers.utils.formatEther(balance));
    } catch (e) {
      console.log(e);
    }
  };

  const handleClickSend = async () => {
    const weiAmount = ethers.utils.parseEther(ethToSend);
    try {
      const tx = await web3State.signer.sendTransaction({
        to: address,
        value: weiAmount,
      });
      await tx.await();
      console.log("TX MINED");
    } catch (e) {
      console.log(e);
    }
  };

  return (
    <>
      <Flex direction="column" w="100%" height="100%">
        <Tabs isLazy>
          <Tabs isFitted variant="enclosed" w="100%" height="100%">
            <TabList mb="5em">
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
                <Stack spacing={6}>
                  <Flex flexDirection="column" alignItems="center" m={4} h="300px">
                    <Box p={20} boxShadow="2xl" rounded="md" borderWidth="2px" flex="1" {...rest}>
                      <Heading align="center" fontSize="2xl">
                        Account
                      </Heading>
                      <Text mt={4}>{desc}</Text>
                      <Stack direction="column" spacing={6}>
                        <Button size="lg" height="70px" width="600px">
                          Your account Balance : {web3State.balance} ETH
                        </Button>

                        <label htmlFor="balanceOf">BALANCE OF :</label>
                        <Input
                          id="balanceOf"
                          type="text"
                          value={address}
                          placeholder="ethereum address"
                          onChange={(event) => setAddress(event.target.value)}
                        />

                        <Button onClick={handleClickGetBalance} size="lg" height="70px" width="600px">
                          All your accounts Balance {web3State.address}: {ethBalance} ETH
                        </Button>

                        <label htmlFor="ethTosend">SEND TO : {address}</label>
                        <Input
                          id="ethToSend"
                          type="text"
                          placeholder="ether amount"
                          value={ethToSend}
                          onChange={(event) => setEthToSend(event.target.value)}
                        />

                        <Button onClick={handleClickSend} bg="green.400" size="lg" height="60px" width="300px">
                          Send 100 RBN
                        </Button>
                      </Stack>
                    </Box>
                  </Flex>
                </Stack>
              </TabPanel>
              {/* initially not mounted */}
              <TabPanel>
                <RobinetToken />
              </TabPanel>
            </TabPanels>
          </Tabs>
        </Tabs>
      </Flex>
    </>
  );
}

export default Faucet;
