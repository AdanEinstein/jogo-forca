import { FlatList, HStack, Heading, Spinner, Stack, Text, VStack } from "native-base";
import { useContext, useEffect } from "react";
import { IWordContext, WordContext } from "../data/contexts/WordContext";
import nextId from "react-id-generator";

interface IDefinitionProps {
    flexGrow: number
}

export default function Definition(props: IDefinitionProps) {
    const { defs, loading } = useContext(WordContext) as IWordContext
    return (
        <HStack flexGrow={props.flexGrow} justifyContent={defs?.length ? "flex-start" : "center"}>
            {(defs || loading) ? defs?.length ? (
                <VStack mx={4} space={2}>
                    <Heading>
                        Definições
                    </Heading>
                    <FlatList
                        scrollEnabled
                        keyExtractor={() => nextId()}
                        data={defs}
                        renderItem={({item}) => {
                            return (
                                <Stack
                                    _text={{
                                        fontSize: "lg"
                                    }}
                                >
                                    <Text>{item}</Text>
                                </Stack>
                            )
                        }}
                    />
                </VStack>
            ) : (
                <Stack alignItems={"center"} space={2}>
                    <Heading color="primary.500" fontSize="md">
                        Obtendo as definições
                    </Heading>
                    <Spinner size="lg" />
                </Stack>
            ) : (
                <Stack alignItems={"center"} space={2}>
                    <Heading color="primary.500" fontSize="md">
                        Nenhuma definição encontrada!
                    </Heading>
                </Stack>
            )}
        </HStack>
    )
}