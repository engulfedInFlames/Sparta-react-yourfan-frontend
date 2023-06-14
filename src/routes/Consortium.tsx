import {
  Box,
  Button,
  ButtonGroup,
  Divider,
  Flex,
  Grid,
  GridItem,
  HStack,
  Heading,
  IconButton,
  ListItem,
  Text,
  UnorderedList,
  VStack,
} from "@chakra-ui/react";
import React, { useState } from "react";
import { Link } from "react-router-dom";
import {
  HiChevronDoubleLeft,
  HiChevronLeft,
  HiChevronRight,
  HiChevronDoubleRight,
} from "react-icons/hi";
import ForumTabs from "../components/Forum/ForumTabs";

export default function Consortium() {
  const [btnIndex, setBtnIndex] = useState(1);
  const handlePageBtn = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
    const curBtn = event.currentTarget;
    const curBtnId = Number(curBtn.id);
    setBtnIndex(curBtnId);
  };
  return (
    <VStack w={"80%"} minH={"660px"} my={24} mx={"auto"}>
      <ForumTabs />
      <Heading py={8}>컨소시움</Heading>
      <Box w={"full"}>
        <Grid
          minH={"760px"}
          gridAutoFlow={"row"}
          gridAutoRows={"1fr"}
          bgColor={"white"}
          borderRadius={"lg"}
          shadow={"lg"}
          p={8}
        >
          {Array.from({ length: 15 }, (v, i) => i + 1).map((v, i) => (
            <GridItem key={i}>
              <Link to="#">
                <Grid
                  gridAutoFlow={"column"}
                  templateColumns={"0.5fr 3fr 1fr 1fr"}
                  gap={4}
                  fontSize={"xl"}
                  py={2}
                >
                  <Text textAlign={"center"} whiteSpace={"nowrap"}>
                    {i}
                  </Text>
                  <Text textAlign={"center"} whiteSpace={"nowrap"}>
                    This is Post Title
                  </Text>
                  <Text textAlign={"center"} whiteSpace={"nowrap"}>
                    Author
                  </Text>
                  <Text textAlign={"center"} whiteSpace={"nowrap"}>
                    2023-06-14
                  </Text>
                </Grid>
              </Link>
              <Divider />
            </GridItem>
          ))}
        </Grid>
        <HStack justifyContent={"center"} pt={8}>
          <ButtonGroup>
            <IconButton
              icon={<HiChevronDoubleLeft />}
              aria-label=""
              variant={"ghost"}
            />
            <IconButton
              icon={<HiChevronLeft />}
              aria-label="이전 페이지 버튼"
              variant={"ghost"}
            />
          </ButtonGroup>
          <ButtonGroup>
            {Array.from({ length: 5 }, (v, i) => i + 1).map((v, i) => (
              <Button
                isActive={v === btnIndex ? true : false}
                onClick={handlePageBtn}
                key={i}
                id={String(v)}
                bgColor={"white"}
                shadow={"lg"}
              >
                {v}
              </Button>
            ))}
          </ButtonGroup>
          <ButtonGroup>
            <IconButton
              icon={<HiChevronRight />}
              aria-label="다음 페이지 버튼"
              variant={"ghost"}
            />
            <IconButton
              icon={<HiChevronDoubleRight />}
              aria-label=""
              variant={"ghost"}
            />
          </ButtonGroup>
        </HStack>
      </Box>
    </VStack>
  );
}
