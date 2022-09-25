import React, { useState } from "react";
import { useEffect } from "react";
import { useRef } from "react";
import {
  Box,
  Flex,
  Heading,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  useDisclosure,
  Button,
  CircularProgress,
  SimpleGrid,
  Image,
  Text,
  FormControl,
  FormLabel,
  Input,
  useToast,
  Tag,
  HStack,
  AlertDialog,
  AlertDialogBody,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogContent,
  AlertDialogOverlay,
} from "@chakra-ui/react";
import { useDispatch, useSelector } from "react-redux";
import {
  createPost,
  getPosts,
  deletePost,
  updatePost,
} from "../Redux/AppReducer/actions";
import { getLoginCredFromLocalStorage } from "../utils/localStorage";
import { Link, useNavigate } from "react-router-dom";
import { DeleteIcon, EditIcon } from "@chakra-ui/icons";
const Feed = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const {
    isOpen: isOpenUpdate,
    onOpen: onOpenUpdate,
    onClose: onCloseUpdate,
  } = useDisclosure();
  const {
    isOpen: isOpenDelete,
    onOpen: onOpenDelete,
    onClose: onCloseDelete,
  } = useDisclosure();
  const cancelRef = useRef();
  const [data, setData] = useState({});
  const [updated, setUpdated] = useState({});
  const [updatPostId, setUpdatePostId] = useState("");
  const [buttonState, setButtonState] = useState(false);
  const [postid,setPostid] = useState("");
  const inputFile = useRef();
  const inputUpdatedFile = useRef();
  const toast = useToast();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const posts = useSelector((store) => store.appReducer.posts.data);
  const loading = useSelector((store) => store.appReducer.loading);
  const error = useSelector((store) => store.appReducer.error);
  const err = useSelector((store) => store.appReducer.err);
  const userId = getLoginCredFromLocalStorage("userId");
  const token = getLoginCredFromLocalStorage("token");
  const handleChange = (e) => {
    const { name, value } = e.target;
    setData({
      ...data,
      [name]: value,
    });
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("title", data.title);
    formData.append("description", data.description);
    formData.append("tags", data.tags);
    formData.append("image", inputFile.current.files[0]);
    setButtonState(true);
    dispatch(createPost(userId, token, formData)).then((res) => {
      if (res.payload.success) {
        toast({
          title: "Post created!",
          description: res.payload.message,
          status: "success",
          duration: 3000,
          isClosable: true,
        });
        getMyFeeds();
        setButtonState(false);
        onClose();
      } else {
        toast({
          title: "Error",
          description: "Something went wrong",
          status: "error",
          duration: 3000,
          isClosable: true,
        });
        setButtonState(false);
      }
    });
  };
  const handleUpdateChange = (e) => {
    const { name, value } = e.target;
    setUpdated({ ...updated, [name]: value });
  };
  const handleUpdateSubmit = (e) => {
    e.preventDefault();
    setButtonState(true);
    let image = inputUpdatedFile.current.files[0];
    if (image) {
      setUpdated({ ...updated, image: image });
    }

    dispatch(updatePost(userId, updatPostId, token, updated)).then((res) => {
      if (res.payload.success) {
        toast({
          title: "Success",
          description: res.payload.message,
          status: "success",
          duration: 3000,
          isClosable: true,
        });
        getMyFeeds();
        setButtonState(false);
        onCloseUpdate();
      } else {
        toast({
          title: "Failure",
          description: "Not able to update your post",
          status: "error",
          duration: 3000,
          isClosable: true,
        });
        setButtonState(false);
      }
    });
  };
  const deleteMyPost = (postId) => {
    setButtonState(true);
    dispatch(deletePost(userId, postId, token)).then((res) => {
      if (res.payload.success) {
        toast({
          title: "Post deleted!",
          description: res.payload.message,
          status: "success",
          duration: 3000,
          isClosable: true,
        });
        setButtonState(false);
        onCloseDelete();
        getMyFeeds();
      } else {
        toast({
          title: "Error",
          description: "Something went wrong",
          status: "error",
          duration: 3000,
          isClosable: true,
        });
        setButtonState(false);
        onCloseDelete();
      }
    });
  };
  const getMyFeeds = () => {
    dispatch(getPosts(userId, token));
  };
  const logout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("userId");
    navigate("/login");
  };

  useEffect(() => {
    getMyFeeds();
  }, []);
  return (
    <Box padding="1rem">
      <Box>
        {loading ? (
          <Flex alignItems="center" justifyContent="center">
            <CircularProgress value={30} size="120px" />
          </Flex>
        ) : error ? (
          <Flex justifyContent="center" direction="column" alignItems="center">
            <Heading textAlign={"center"}>{err.message}</Heading>
            <Button variant="solid" colorScheme="messenger" m="1rem">
              <Link to="/login">Login</Link>
            </Button>
          </Flex>
        ) : (
          <Box>
            <Flex justifyContent={"space-around"} alignItems="center">
              <Button variant="ghost" colorScheme="blue" onClick={onOpen}>
                {" "}
                Create New Post
              </Button>
              <Button variant="ghost" colorScheme={"orange"} onClick={logout}>
                LogOut
              </Button>
            </Flex>
            <SimpleGrid columns={[2, null, 3]} spacing="40px" marginTop="2rem">
              {posts?.length > 0 &&
                posts
                  ?.slice(0)
                  .reverse()
                  .map((post, index) => {
                    return (
                      <Box
                        key={index}
                        textAlign="center"
                        boxShadow="md"
                        borderRadius="md"
                        padding=".5rem"
                        position="relative"
                      >
                        <Image
                          borderTopRadius=".5rem"
                          src={post.image}
                          alt="userPoster"
                        />
                        <HStack m="5px">
                          {post.tags?.length > 0 &&
                            post.tags?.map((tag) => {
                              return (
                                <Tag
                                  key={tag}
                                  size="sm"
                                  fontSize="13px"
                                  variant="subtle"
                                  colorScheme="cyan"
                                  margin="5px"
                                >
                                  {tag}
                                </Tag>
                              );
                            })}
                        </HStack>
                        <Heading size="md">{post.title}</Heading>
                        <Text fontSize="12px" fontStyle="italic">
                          {post.description}
                        </Text>
                        <Flex justify={"space-around"} alignItems="center">
                          <Button
                            variant={"ghost"}
                            colorScheme="whiteAlpha"
                            onClick={() => {
                              setUpdated({
                                title: post.title,
                                description: post.description,
                                tags: post.tags,
                              });
                              setUpdatePostId(post._id);
                              onOpenUpdate();
                            }}
                          >
                            {" "}
                            <EditIcon color="blue.500" />{" "}
                          </Button>
                          <Text fontSize="8px">
                            Posted on {post.createdAt.slice(0, -5)}
                          </Text>

                          <Button
                            variant={"ghost"}
                            colorScheme="whiteAlpha"
                            onClick={()=>{
                              setPostid(post._id);
                              onOpenDelete();
                            }}
                          
                          >
                            {" "}
                            <DeleteIcon color="red.500" />{" "}
                          </Button>
                        </Flex>
                      </Box>
                    );
                  })}
            </SimpleGrid>
          </Box>
        )}
      </Box>
      {/* DELETE CONFIMATION MODAL */}
      <AlertDialog
        isOpen={isOpenDelete}
        leastDestructiveRef={cancelRef}
        onClose={onCloseDelete}
      >
        <AlertDialogOverlay>
          <AlertDialogContent>
            <AlertDialogHeader>Delete Post</AlertDialogHeader>
            <AlertDialogBody>
              Are you sure you want to delete this post?
            </AlertDialogBody>
            <AlertDialogFooter>
              <Button ref={cancelRef} onClick={onCloseDelete}>
                Cancel
              </Button>
              <Button colorScheme='red' 
              onClick={() => deleteMyPost(postid)}
              isLoading={buttonState}
              ml={3}>
                Delete
              </Button>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialogOverlay>
      </AlertDialog>
      {/* NEW POST MODAL */}
      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>New Post</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <form onSubmit={handleSubmit}>
              <FormControl>
                <FormLabel>Title</FormLabel>
              </FormControl>
              <Input
                autoComplete="off"
                type="text"
                name="title"
                onChange={handleChange}
                placeholder="Enter title"
              />
              <FormControl>
                <FormLabel>Description</FormLabel>
                <Input
                  required
                  autoComplete="off"
                  type="text"
                  name="description"
                  onChange={handleChange}
                  placeholder="Description"
                />
              </FormControl>
              <FormControl>
                <FormLabel>Tags</FormLabel>
                <Input
                  required
                  autoComplete="off"
                  type="text"
                  name="tags"
                  onChange={handleChange}
                  placeholder="Tags"
                />
              </FormControl>
              <FormControl>
                <FormLabel>Post a Picture</FormLabel>
                <Input
                  required
                  autoComplete="off"
                  type="file"
                  ref={inputFile}
                />
              </FormControl>
              <Button
                isLoading={buttonState}
                colorScheme="whatsapp"
                margin="5px 0px"
                type="submit"
              >
                Upload
              </Button>
            </form>
          </ModalBody>
          <ModalFooter>
            <Button colorScheme="orange" onClick={onClose}>
              Cancel
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
      {/* 
      UPDATE MODAL
      */}
      <Modal isOpen={isOpenUpdate} onClose={onCloseUpdate}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Update Post</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <form onSubmit={handleUpdateSubmit}>
              <FormControl>
                <FormLabel>Title</FormLabel>
              </FormControl>
              <Input
                autoComplete="off"
                type="text"
                name="title"
                onChange={handleUpdateChange}
                defaultValue={updated.title}
                placeholder="Enter title"
              />
              <FormControl>
                <FormLabel>Description</FormLabel>
                <Input
                  autoComplete="off"
                  type="text"
                  name="description"
                  onChange={handleUpdateChange}
                  defaultValue={updated.description}
                  placeholder="Description"
                />
              </FormControl>
              <FormControl>
                <FormLabel>Tags</FormLabel>
                <Input
                  autoComplete="off"
                  type="text"
                  name="tags"
                  onChange={handleUpdateChange}
                  defaultValue={updated.tags}
                  placeholder="Tags"
                />
              </FormControl>
              <FormControl>
                <FormLabel>Update Picture</FormLabel>
                <Input autoComplete="off" type="file" ref={inputUpdatedFile} />
              </FormControl>
              <Button
                isLoading={buttonState}
                colorScheme="whatsapp"
                margin="5px 0px"
                type="submit"
              >
                Update
              </Button>
            </form>
          </ModalBody>
          <ModalFooter>
            <Button colorScheme="orange" onClick={onCloseUpdate}>
              Cancel
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </Box>
  );
};

export default Feed;
