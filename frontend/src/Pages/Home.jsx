import React from "react";
import { Heading,  Flex } from "@chakra-ui/react";
const Home = () => {
  return (
    <Flex
      position="relative"
      height="90vh"
      width="100vw"
      justifyContent="center"
      alignItems="center"
      backgroundImage="url(https://imgs.search.brave.com/9RVbgazAs85sjMkJHh4k5VCG5IuMpyuzrqPPyNmeDfw/rs:fit:759:225:1/g:ce/aHR0cHM6Ly90c2Uy/Lm1tLmJpbmcubmV0/L3RoP2lkPU9JUC5z/c1pmVUk4X3llaHph/Y1puS2xoWTBRSGFF/byZwaWQ9QXBp)"
      backgroundRepeat="no-repeat"
      backgroundPosition="center"
      backgroundSize="cover"
    >
      <Flex position="absolute" direction="column" height={"60%"} width="">
        <Heading color="lightgray" fontStyle="italic">
          -- Post Something New --
        </Heading>
      </Flex>
    </Flex>
  );
};

export default Home;
