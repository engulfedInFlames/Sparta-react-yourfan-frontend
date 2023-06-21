import {
  Button,
  Flex,
  FormControl,
  FormLabel,
  Input,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalHeader,
  ModalOverlay,
  useToast,
} from "@chakra-ui/react";
import { QueryClient, useMutation } from "@tanstack/react-query";
import React from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { apiUpdateMe } from "../../api";
import { IUpdateMeFormValues } from "../../type";

interface IProps {
  isOpen: boolean;
  onClose: () => void;
  nickname: string;
}

export default function UpdateMeModal({ isOpen, onClose, nickname }: IProps) {
  const { register, handleSubmit, reset } = useForm<IUpdateMeFormValues>();
  const toast = useToast();
  const queryClient = new QueryClient();

  const mutation = useMutation(apiUpdateMe, {
    onSuccess: () => {
      toast({
        title: "회원 정보가 수정됐습니다.",
        status: "success",
        position: "top",
      });
      queryClient.refetchQueries(["me"]);
      reset();
      onClose();
    },
    onError: () => {
      toast({
        title: "회원 정보 수정에 실패했습니다.",
        status: "error",
        position: "top",
      });
    },
  });
  const onSubmit: SubmitHandler<IUpdateMeFormValues> = (data) => {
    mutation.mutate(data);
  };
  return (
    <>
      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>회원 정보 수정</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <form onSubmit={handleSubmit(onSubmit)}>
              <FormControl isDisabled={true} mb={4}>
                <FormLabel>프로필 사진 변경</FormLabel>
                <Input
                  {...register("avatar")}
                  type="file"
                  name={"avatar"}
                  variant={"flushed"}
                />
              </FormControl>
              <FormControl>
                <FormLabel>닉네임 변경</FormLabel>
                <Input
                  {...register("nickname")}
                  type="text"
                  name={"nickname"}
                  defaultValue={nickname}
                  variant={"flushed"}
                />
              </FormControl>
              <Flex justifyContent={"flex-end"} py={4}>
                <Button variant={"solid"} mr={3} onClick={onClose}>
                  닫기
                </Button>
                <Button
                  type={"submit"}
                  bgColor={"primary"}
                  color={"white"}
                  _hover={{ bgColor: "blackAlpha.700", color: "gray.200" }}
                >
                  수정
                </Button>
              </Flex>
            </form>
          </ModalBody>
        </ModalContent>
      </Modal>
    </>
  );
}
