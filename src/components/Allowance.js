import { Text, Input, Button, VStack } from "@chakra-ui/react";
import { useToast } from "@chakra-ui/react";
import { useForm } from "react-hook-form";
import { ethers } from "ethers";
import { useToken } from "../context/TokenContext";
import { FaucetContext } from "../App";
import { useContext } from "react";
import AlertPop from "./AlertPop"

const Allowance = () => {
  const { dispatch, allowance } = useToken();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const toast = useToast();
  const [robinetToken] = useContext(FaucetContext);

  const handleCheckAllowance = async (data) => {
    try {
      const allowance = await robinetToken.allowance(data.owner, data.sender);
      dispatch({ type: "SET_ALLOWANCE", payload: ethers.utils.formatEther(allowance) });
      toast({
        title: "Submitted!",
        status: "success",
        duration: 3000,
        isClosable: true,
      });
    } catch (e) {
      dispatch({ type: "ERROR", payload: e.message });
    }
  };
  return (
    <form onSubmit={handleSubmit(handleCheckAllowance)}>
      <VStack>
        <Text fontWeight="bold" fontSize={"xl"}>
          check allowance
        </Text>
        <Input
          type="text"
          placeholder="Owner"
          isRequired
          {...register("owner", {
            minLength: { value: 42, message: "Please enter a valid address" },
            maxLength: { value: 42, message: "Please enter a valid address" },
          })}
        />
        {errors.owner && <AlertPop title={errors.owner.message} />}
        <Input
          type="text"
          placeholder="Sender"
          isRequired
          {...register("sender", {
            minLength: { value: 42, message: "Please enter a valid address" },
            maxLength: { value: 42, message: "Please enter a valid address" },
          })}
        />
        {errors.sender && <AlertPop title={errors.sender.message} />}
        <Button borderRadius="md" bg="cyan.600" _hover={{ bg: "cyan.200" }} variant="ghost" type="submit">
          👀
        </Button>
        <Text>{allowance}</Text>
      </VStack>
    </form>
  );
};

export default Allowance;
