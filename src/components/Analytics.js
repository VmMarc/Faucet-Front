import { Text, Divider, Box, Input, Button, Spacer } from "@chakra-ui/react";
import { useToast } from "@chakra-ui/react";
import { useForm } from "react-hook-form";
import { ethers } from "ethers";
import { useToken } from "../context/TokenContext";
import { FaucetContext } from "../App";
import { useContext } from "react";
import Allowance from "./Allowance";
import AlertPop from "./AlertPop";


const Analytics = () => {
  const { token, ownBalance, balance, dispatch } = useToken();
  const {register,handleSubmit,formState: { errors }} = useForm();
  const [robinetToken] = useContext(FaucetContext);

  

  const handleCheckBalance = async (data) => {
    try {
      const newBalance = await robinetToken.balanceOf(data.account);
      dispatch({ type: "SET_BALANCE", payload: ethers.utils.formatEther(newBalance) });
    } catch (e) {
      dispatch({ type: "ERROR", payload: e.message });
    }
  };

  return (
    <>
      <Text align="center" fontSize="3xl" >analytics</Text>
      <Text fontWeight="bold" fontSize="xl">Name</Text>
      <Text>{token.name}</Text>
      <Text fontWeight="bold" fontSize="xl">Symbol</Text>
      <Text>{token.symbol}</Text>
      <Text fontWeight="bold" fontSize="xl">Decimals</Text>
      <Text>{token.decimals}</Text>
      <Text fontWeight="bold" fontSize="xl">total supply</Text>
      <Text>{token.totalSupply}</Text>

      <Divider orientation="horizontal" />

      <Box overflow="hidden" mt={5}>
        <form onSubmit={handleSubmit(handleCheckBalance)}>
          <Text align="center" fontWeight="bold" fontSize="xl">
            check balance
          </Text>
          <Input
            variant="outline"
            w="70%"
            m={2}
            placeholder="Address"
            {...register("account", {
              minLength: { value: 42, message: "Please enter a valid address" },
              maxLength: { value: 42, message: "Please enter a valid address" },
              duration: 1000,
            })}
          />
          <Button colorScheme="teal" variant="solid" w="10%" m={2} mb={3} type="submit">
            👀
          </Button>
          {errors.account && <AlertPop title={errors.account.message} />}
          <Text align="center" fontSize={20} fontWeight="bold">
            Amount: {balance}
          </Text>
        </form>
      </Box>

      <Divider orientation="horizontal" mb={4} />
      <Allowance />
      <Spacer />
      <Text fontSize="xl">
        Your balance : {ownBalance} {token.symbol}
      </Text>
    </>
  );
};

export default Analytics;

/*
import { Text, Divider, Box, Input, Button, Spacer, FormControl } from "@chakra-ui/react";
import { ethers } from "ethers";
import { useToken } from "../context/tokenContext";
import { FaucetContext } from "../App";
import { useState, useContext } from "react";

const Analytics = () => {
  const { token, ownBalance, balance, dispatch, error } = useToken();
  const [robinetToken, faucet] = useContext(FaucetContext);
  const [address, setAddress] = useState(0);
  const [form, setForm] = useState({ owner: "", sender: "" });

  const handleCheckBalance = async () => {
    try {
      const balance = await robinetToken.balanceOf(address);
      dispatch({ type: "SET_BALANCE", payload: ethers.utils.formatEther(balance) });
    } catch (e) {
      dispatch({ type: "ERROR", payload: e.message });
    }
  };

  const handleCheckAllowance = async (e) => {
    try {
      const allowance = await robinetToken.allowance(form.owner, form.sender);
      dispatch({ type: "SET_ALLOWANCE", payload: ethers.utils.formatEther(allowance) });
    } catch (e) {
      dispatch({ type: "ERROR", payload: e.message });
    }
  };

  return (
    <>
      <Text align="center" fontSize="3xl">
        Analytics
      </Text>
      <Text fontSize="2xl">Name</Text>
      <Text>{token.name}</Text>
      <Text fontSize="xl">Symbol</Text>
      <Text>{token.symbol}</Text>
      <Text fontSize="xl">Decimals</Text>
      <Text>{token.decimals}</Text>
      <Text fontSize="xl">Total supply</Text>
      <Text>{token.totalSupply}</Text>

      <Divider orientation="horizontal" />

      <Box overflow="hidden" mt={5}>
        <Text fontSize="xl">Check balance</Text>
        <Input onChange={(e) => setAddress(e.target.value)} variant="outline" w="50%" m={2} placeholder="Address" />
        <Button onClick={handleCheckBalance} colorScheme="teal" variant="solid" w="30%" m={2} mb={3}>
          👀
        </Button>
        <Text>Amount:{balance}</Text>
      </Box>

      <Divider orientation="horizontal" />

      <FormControl id="amount">
        <Text fontSize="xl">Check allowance</Text>
        <Input
          onChange={(e) => setForm({ ...form, owner: e.target.value })}
          name="owner"
          variant="outline"
          w="51%"
          m={2}
          placeholder="Owner"
        />
        <Input
          onChange={(e) => setForm({ ...form, sender: e.target.value })}
          name="sender"
          variant="outline"
          w="51%"
          m={2}
          placeholder="Sender"
        />
        <Spacer />
        <Button onClick={handleCheckAllowance} colorScheme="teal" variant="solid" w="30%" m={2} mb={3}>
          👀
        </Button>
      </FormControl>
      <Spacer />
      <Text fontSize="xl">
        Your balance : {ownBalance} {token.symbol}
      </Text>
    </>
  );
};

export default Analytics;
*/
