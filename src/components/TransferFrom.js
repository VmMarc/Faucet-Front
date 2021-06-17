import { Text, Box, Input, Button, Image, Spacer } from "@chakra-ui/react";
import { FormLabel } from "@chakra-ui/react";
import transferFrom from "../assets/images/transferFrom.jpg";
import {
  NumberInput,
  NumberInputField,
  NumberDecrementStepper,
  NumberIncrementStepper,
  NumberInputStepper,
} from "@chakra-ui/react"
import { useToken } from "../context/TokenContext";
import { useContext, useState } from "react";
import { useForm } from "react-hook-form";
import { useToast } from "@chakra-ui/react"
import { FaucetContext } from "../App"
import { ethers } from "ethers";
import { CircularProgress } from "@chakra-ui/react"

const TransfertFrom = () => {
  const { dispatch} = useToken()
  const { register, handleSubmit, formState: { errors } } = useForm();
  const [loading, setLoading] = useState(false)
  const toast = useToast()
  const [robinetToken] = useContext(FaucetContext)

  const handleSubmitButton = async (data) => {
    const amount = ethers.utils.parseEther(data.amount)
    try {
      setLoading(true)
      const tx = await robinetToken.transfer(data.transfer, amount)
      await tx.wait()

       toast({
        title: 'Confirmed transaction',
        description: `storage is set with value: \nTransaction hash: ${tx.hash} `,
        status: 'success',
        duration: 9000,
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
        TransferFrom
      </Text>
      <Box maxW="md" borderWidth="2px" borderRadius="md" boxShadow="2xl" p="10" overflow="hidden">
        <Image src={transferFrom} alt="image" />
        <form onSubmit={handleSubmit(handleSubmitButton)} variant="outline" w="75%" m={2} id="first-name" isRequired>
          <FormLabel>From</FormLabel>
          <Input variant="outline" placeholder="Sender" {...register("transferFrom", {
                minLength: { value: 42, message: "Please enter a valid address" },
                maxLength: { value: 42, message: "Please enter a valid address" },
            })} />
          <FormLabel mt={2}>Amount</FormLabel>
          <NumberInput isRequired min={1} mb={4} >
              <NumberInputField {...register("amount")}/>
              <NumberInputStepper>
                <NumberIncrementStepper />
                <NumberDecrementStepper />
              </NumberInputStepper>
            </NumberInput>
          <FormLabel>To</FormLabel>
          <Input variant="outline" placeholder="Receiver" {...register("transferTo", {
                minLength: { value: 42, message: "Please enter a valid address" },
                maxLength: { value: 42, message: "Please enter a valid address" },
            })}/>
          <Button type="submit" colorScheme="teal" variant="solid" w="50%" m={2} mb={3}>{loading ? (<><CircularProgress fontSize="15px" isIndeterminate size="30px" color="green.300" /><Spacer /><p>Sending...</p></>) : "Send"}</Button>
        </form>
      </Box>
    </>
  );
};

export default TransfertFrom;
