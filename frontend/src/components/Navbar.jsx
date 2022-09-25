import React from "react";
import { Flex } from "@chakra-ui/react";
import { NavLink } from "react-router-dom";
import {StarIcon} from "@chakra-ui/icons"
const Navbar = () => {
  return (
    <Flex
      height="10vh"
      boxShadow="md"
      alignItems="center"
      justify="space-around"
      padding="1rem"
      boxSizing="border-box"
    >
      <Flex
        flex="1"
        fontWeight={"bold"}
        fontSize="26px"
        fontStyle="italic"
        backgroundColor="lightgoldenrodyellow"
        alignItems="center"
        justifyContent="center"
        borderRadius="1rem 2rem"
      >
        <NavLink to="/">ICLO<StarIcon fontSize="14px" color="goldenrod" /></NavLink>
      </Flex>
      <Flex flex="3" justifyContent="space-evenly" alignItems={"center"}>
        <NavLink
          style={({isActive})=>(isActive?{color:"lightgreen",fontSize:"15px"}:{})}
          to="/feed"
        >
          MyFeeds
        </NavLink>
        <NavLink
          style={({isActive})=>(isActive?{color:"lightgreen",fontSize:"15px"}:{})}
          to="/login"
        >
          Login
        </NavLink>
        <NavLink
          style={({isActive})=>(isActive?{color:"lightgreen",fontSize:"15px"}:{})}
          to="/signup"
        >
          Signup
        </NavLink>
      </Flex>
    </Flex>
  );
};

export default Navbar;
