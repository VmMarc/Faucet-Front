import { Grid, GridItem } from "@chakra-ui/react";
import Analytics from "./Analytics";
import Transfer from "./Transfer";
import Approval from "./Approval";
import TransferFrom from "./TransferFrom";

const RobinetToken = () => {
  return (
    <Grid h="75vh" templateRows="repeat(1, 1fr)" templateColumns="repeat(4, 1fr)" gap={4}>
      <GridItem colSpan={1} p={10} bg="tomato" borderRadius="md">
        <Analytics />
      </GridItem>

      <GridItem colSpan={1} align="center">
        <Transfer />
      </GridItem>

      <GridItem colSpan={1} align="center">
        <Approval />
      </GridItem>

      <GridItem colSpan={1} align="center">
        <TransferFrom />
      </GridItem>
    </Grid>
  );
};

export default RobinetToken;
