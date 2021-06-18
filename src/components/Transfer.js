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
import { useContext, useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { useToast } from "@chakra-ui/react"
import { FaucetContext } from "../App"
import { ethers } from "ethers";
import transfert from "../assets/images/transfer.jpg"
import AlertPop from "./AlertPop";
import { CircularProgress } from "@chakra-ui/react"
import { Web3Context } from "web3-hooks";


const Transfer = () => {
  const [web3State] = useContext(Web3Context);
  const { dispatch, token} = useToken()
  const { register, handleSubmit, formState: { errors } } = useForm();
  const [loading, setLoading] = useState(false)
  const toast = useToast()
  const [robinetToken] = useContext(FaucetContext)

console.log(web3State)
   useEffect(() => {
    // si simpleStorage est pas null alors
    if (robinetToken) {
      const cb = (from, to, amount) => {
          toast({
            title: 'Event DataSet',
            description: `Your transaction of ${ethers.utils.formatEther(amount)} ${token.symbol} has been well executed to ${to}`,
            status: 'info',
            position: 'top-right',
            duration: 9000,
            isClosable: true,
          })
        }
      // ecouter sur l'event DataSet
      robinetToken.on('Transfer', cb)
      return () => {
        // arreter d'ecouter lorsque le component sera unmount
      robinetToken.off('Transfer', cb)
      }
    }
  }, [robinetToken, toast, token])

  const handleSubmitButton = async (data) => {
    const amount = ethers.utils.parseEther(data.amount)
    try {
      setLoading(true)
      const tx = await robinetToken.transfer(data.transfer, amount)
      const network = web3State.networkName.toLowerCase()
      const link = `https://${network}.etherscan.io/tx/${tx.hash}`
      toast({
        title: 'Confirmed transaction',
        render: () => (
            <Box color="white" p={3} bg="green.500" rounded={20}>
              <p style={{fontWeight: "bold", fontSize: "20px"}}>Transaction sent successfully !</p><br />You can view your transaction pending at hash :<br /><a target="blank" href={link}>{tx.hash}</a>
            </Box>),
        duration: 9000,
        isClosable: true,
      })
      await tx.wait()
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
            <Button type="submit" colorScheme="teal" variant="solid" w="50%" m={2} mb={3} disabled={loading}>{loading ? (<><CircularProgress fontSize="15px" isIndeterminate size="30px" color="green.300" /><Spacer /><p>Sending...</p></>) : "Send"}</Button>
         </form>
        </Box>
      </Box>
  </>
  )
}

export default Transfer;
