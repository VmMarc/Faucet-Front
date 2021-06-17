import { Text, Box, Input, Button, Image, Spacer } from "@chakra-ui/react";
import {
  FormLabel,
  NumberInput,
  NumberInputField,
  NumberDecrementStepper,
  NumberIncrementStepper,
  NumberInputStepper,
} from "@chakra-ui/react";
import approve from "../assets/images/approve.jpg";
import { useToken } from "../context/TokenContext";
import { useContext, useState } from "react";
import { Web3Context } from "web3-hooks"
import { useForm } from "react-hook-form";
import { useToast } from "@chakra-ui/react"
import { FaucetContext } from "../App"
import { ethers } from "ethers";
import AlertPop from "./AlertPop";
import { CircularProgress } from "@chakra-ui/react"

const Approval = () => {
  const [web3State] = useContext(Web3Context)
  const { dispatch } = useToken()
  const [loading, setLoading] = useState(false)
  const { register, handleSubmit, formState: { errors } } = useForm();
  const toast = useToast()
  const [robinetToken] = useContext(FaucetContext)

  const handleSubmitButton = async (data) => {
    console.log(data)
    const amount = ethers.utils.parseEther(data.amountApprove)
    try {
      setLoading(true)
      const tx = await robinetToken.approve(data.approveAddress, amount)
      await tx.wait()

       toast({
        title: 'Confirmed transaction',
        description: `${data.approveAddress}\n is allowed to spend : ${data.amountApprove}\nfrom the wallet of ${web3State.account} `,
        status: 'success',
        duration: 5000,
        isClosable: true,
      })
    } catch (e) {
      dispatch({type: 'ERROR', payload: e.message})
    } finally {
      setLoading(false)
    }
  }
  return (
    <>
      <Text align="center" fontSize="3xl">
        Approval
      </Text>
      <Box  maxW="md" borderWidth="2px" borderRadius="md" boxShadow="2xl" p="10" overflow="hidden">
        <Image src={approve} alt="image" height="" />
        <form onSubmit={handleSubmit(handleSubmitButton)} id="first-name" m={2}>
          <FormLabel>To address</FormLabel>
          <Input placeholder="Authorize this contract to spend your moula" mb={2} isRequired
          {...register("approveAddress", {
                minLength: { value: 42, message: "Please enter a valid address" },
                maxLength: { value: 42, message: "Please enter a valid address" },
            })}
          />
          {errors.approveAddress && <AlertPop title={errors.approveAddress.message} />}
          <FormLabel>Amount</FormLabel>
            <NumberInput isRequired min={1} mb={4} >
              <NumberInputField {...register("amountApprove")}/>
              <NumberInputStepper>
                <NumberIncrementStepper />
                <NumberDecrementStepper />
              </NumberInputStepper>
            </NumberInput>
            <Button type="submit" colorScheme="teal" variant="solid" w="50%" m={2} mb={3}>{loading ? (<><CircularProgress fontSize="15px" isIndeterminate size="30px" color="green.300" /><Spacer /><p>Approving...</p></>) : "Approve"}</Button>
         </form>
      </Box>
    </>
  );
};

export default Approval;
