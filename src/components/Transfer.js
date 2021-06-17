import { Text, Box, Input, Button, Image, Spacer } from "@chakra-ui/react"
import {
  FormLabel,
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
import transfert from "../assets/images/transfer.jpg"
import AlertPop from "./AlertPop";
import { CircularProgress } from "@chakra-ui/react"


const Transfer = () => {
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
    <Text align="center" fontSize="3xl">Transfert</Text>
      <Box maxW="md" borderWidth="2px" borderRadius="lg" boxShadow="dark-lg" overflow="hidden">
        <Image src={transfert} alt="image"  />
        <Box w="75%">
        <form onSubmit={handleSubmit(handleSubmitButton)} id="first-name" m={2}>
          <FormLabel>To address</FormLabel>
          <Input placeholder="Receiveir" mb={2} isRequired
          {...register("transfer", {
                minLength: { value: 42, message: "Please enter a valid address" },
                maxLength: { value: 42, message: "Please enter a valid address" },
            })}
          />
          {errors.transfer && <AlertPop title={errors.transfer.message} />}
          <FormLabel>Amount</FormLabel>
            <NumberInput isRequired min={1} mb={4} >
              <NumberInputField {...register("amount")}/>
              <NumberInputStepper>
                <NumberIncrementStepper />
                <NumberDecrementStepper />
              </NumberInputStepper>
            </NumberInput>
            <Button type="submit" colorScheme="teal" variant="solid" w="50%" m={2} mb={3}>{loading ? (<><CircularProgress fontSize="15px" isIndeterminate size="30px" color="green.300" /><Spacer /><p>Sending...</p></>) : "Send"}</Button>
         </form>
        </Box>
      </Box>
  </>
  )
}

export default Transfer;
