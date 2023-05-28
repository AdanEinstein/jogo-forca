import {
  FlatList,
  HStack,
  Heading,
  Spinner,
  Stack,
  Text,
  VStack,
} from "native-base";
import { useContext, useEffect } from "react";
import { IWordContext, WordContext, useWord } from "../data/contexts/WordContext";
import nextId from "react-id-generator";

interface IDefinitionProps {
  flexGrow: number;
}

export default function Definition(props: IDefinitionProps) {
  const { defs, loading } = useWord();

  if (defs?.length) {
    return (
      <HStack flexGrow={props.flexGrow} justifyContent={"flex-start"}>
        <VStack mx={4} space={2}>
          <Heading>Definições</Heading>
          <FlatList
            scrollEnabled
            keyExtractor={() => nextId()}
            data={defs}
            renderItem={({ item }) => {
              return (
                <Stack
                  _text={{
                    fontSize: "lg",
                  }}
                >
                  <Text>{item}</Text>
                </Stack>
              );
            }}
          />
        </VStack>
      </HStack>
    );
  }

  if (loading) {
    return (
      <HStack flexGrow={props.flexGrow} justifyContent={"center"}>
        <Stack alignItems={"center"} space={2}>
          <Heading color="primary.500" fontSize="md">
            Obtendo as definições
          </Heading>
          <Spinner size="lg" />
        </Stack>
      </HStack>
    );
  }

  return (
    <HStack flexGrow={props.flexGrow} justifyContent={"center"}>
      <Stack alignItems={"center"} space={2}>
        <Heading color="primary.500" fontSize="md">
          Nenhuma definição encontrada!
        </Heading>
      </Stack>
    </HStack>
  );
}
