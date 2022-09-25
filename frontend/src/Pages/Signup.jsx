import React from "react";
import {
  Box,
  Button,
  Flex,
  FormControl,
  FormLabel,
  Heading,
  Input,
  Select,
  Text,
} from "@chakra-ui/react";
import { Link } from "react-router-dom";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { signup } from "../Redux/AuthReducer/actions";

const Signup = () => {
  const dispatch = useDispatch();
  const [data, setData] = useState({});
  const handleChange = (e) => {
    const { name, value } = e.target;
    setData({
      ...data,
      [name]: value,
    });
  };
  const handleSignup = (e) => {
    e.preventDefault();
    dispatch(signup(data)).then((res)=>console.log(res));
  };
  return (
    <Box height="90vh">
      <Heading mt="1rem" size="md" textAlign="center">
        Signup
      </Heading>
      <Flex
        direction="column"
        height="80%"
        width="50%"
        margin="auto"
        textAlign="center"
        justifyContent="center"
        alignItems="space-between"
        padding="1rem"
        borderRadius="1rem"
      >
        <form onSubmit={handleSignup}>
          <Flex
            direction="column"
            margin="auto"
            textAlign="center"
            justifyContent="center"
            alignItems="space-between"
            padding="1rem"
            boxShadow="lg"
            borderRadius="1rem"
            backgroundColor="whiteAlpha.400"
          >
            <FormControl margin="5px 0px">
              <Input
                autoComplete="off"
                required
                size="sm"
                onChange={handleChange}
                type="text"
                name="name"
                placeholder="Enter Your name"
              />
            </FormControl>
            <FormControl margin="5px 0px">
              <Input
                autoComplete="off"
                required
                size="sm"
                onChange={handleChange}
                type="text"
                name="username"
                placeholder="Enter Your username"
              />
            </FormControl>
            <FormControl margin="5px 0px">
              <Input
                autoComplete="off"
                required
                size="sm"
                onChange={handleChange}
                type="text"
                name="email"
                placeholder="Enter Email"
              />
            </FormControl>
            <FormControl margin="5px 0px">
              <Input
                autoComplete="off"
                required
                size="sm"
                onChange={handleChange}
                type="text"
                name="password"
                placeholder="Enter password"
              />
            </FormControl>
            <FormControl margin="5px 0px">
              <Input
                autoComplete="off"
                required
                size="sm"
                onChange={handleChange}
                type="number"
                name="mobile"
                maxLength="10"
                minLength="10"
                placeholder="Enter mobile no."
              />
            </FormControl>
            <FormControl margin="5px 0px">
              <Input
                autoComplete="off"
                required
                onChange={handleChange}
                type="text"
                name="country"
                placeholder="Enter Country"
              />
            </FormControl>
            <Select
              margin="5px 0px"
              required
              size="sm"
              onChange={handleChange}
              name="gender"
              variant="filled"
              placeholder="Select gender"
            >
              <option value="">---</option>
              <option value="male">Male</option>
              <option value="female">Female</option>
            </Select>
            <Button margin="5px 0px" width="100%" type="submit">
              SignUp
            </Button>
          </Flex>
        </form>
        <Text>
          {" "}
          Already a User. Please{" "}
          <span style={{ color: "blue" }}>
            <Link to="/login">Login Here</Link>
          </span>{" "}
        </Text>
      </Flex>
    </Box>
  );
};

export default Signup;
