import React from "react";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { login } from "../Redux/AuthReducer/actions";
import {
  Box,
  Flex,
  FormLabel,
  Input,
  FormControl,
  Button,
  useToast,
} from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";
const Login = () => {
  const [formdata, setFormData] = useState({});
  const [buttonState, setButtonState] = useState(false);
  const dispatch = useDispatch();
  const toast = useToast();
  const navigate = useNavigate();
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formdata,
      [name]: value,
    });
  };
  const handleLogin = () => {
    if (formdata.username && formdata.password) {
      setButtonState(true);
      dispatch(login(formdata)).then((res) => {
        console.log(res);
        if (res.type === "USER_LOGIN_SUCCESS") {
          localStorage.setItem("userId", res.payload.userId);
          localStorage.setItem("token", res.payload.token);
          toast({
            title: "Success",
            description: res.payload.message,
            status: "success",
            isClosable: true,
            duration: 3000,
          });
          setButtonState(false);
          navigate("/feed");
        } else if (res.type === "USER_LOGIN_FAILURE") {
          toast({
            title: "Error",
            description: res.payload?.message,
            status: "error",
            isClosable: true,
            duration: 3000,
          });
          setButtonState(false);
        }
      });
    } else {
      toast({
        title: "Warning",
        description: "Please fill in all the fields",
        status: "warning",
        isClosable: true,
        duration: 3000,
      });
    }
  };
  return (
    <Box position="relative">
      <Flex
        direction="column"
        width="50%"
        margin="auto"
        textAlign="center"
        justifyContent="center"
        alignItems="space-between"
        padding="1rem"
        borderRadius="1rem"
        boxShadow="dark-lg"
        position="absolute"
        transform="translate(50%, 50%)"
      >
        <FormControl margin="5px 0px">
          <FormLabel>UserName</FormLabel>

          <Input
            name="username"
            onChange={handleChange}
            type="text"
            placeholder="Enter username"
            autoComplete="off"
          />
        </FormControl>
        <FormControl margin="5px 0px">
          <FormLabel>Password</FormLabel>
          <Input
            name="password"
            onChange={handleChange}
            type="password"
            placeholder="Enter password"
            autoComplete="off"
          />
        </FormControl>
        <Button isLoading={buttonState} margin="5px 0px" onClick={handleLogin}>
          Login
        </Button>
      </Flex>
    </Box>
  );
};

export default Login;
