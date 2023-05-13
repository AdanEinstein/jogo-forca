import { Box, HStack, Heading, Spinner, Stack, Text, VStack } from "native-base";
import { useContext, useState } from "react";
import nextId from "react-id-generator";
import { IWordContext, WordContext } from "../data/contexts/WordContext";

interface IWordProps {
    flexGrow: number
}

export default function Word({ flexGrow }: IWordProps) {
    const { word, loading, letters } = useContext(WordContext) as IWordContext;
    return (
        <>
            <HStack flexGrow={flexGrow} mx={4} my={3} justifyContent={"center"} space={2} flexWrap={"wrap"}>
                {(word || loading) ? word?.split('').length ? (
                    word.split('').map((l, i) => {
                        return (
                            <Box mt={2} key={i} p={4} borderRadius={"lg"} borderColor={"black"} borderWidth={"1"}>
                                <Text fontWeight={"bold"} fontSize={"2xl"}>{letters?.includes(l.toUpperCase()) ? l.toUpperCase() : ' '}</Text>
                            </Box>
                        )
                    })
                ) : (
                    <Box p={4} borderRadius={"lg"} borderColor={"black"} borderWidth={"1"}>
                        <Text fontSize={"2xl"}>Nenhuma palavra</Text>
                    </Box>
                ) : (
                    <HStack alignItems={"center"} space={2}>
                        <Heading color="primary.500" fontSize="md">
                            Obtendo a palavra
                        </Heading>
                        <Spinner size="lg" />
                    </HStack>
                )}
            </HStack>
            {!!letters?.length && (
                <VStack mx={4}>
                    <Heading size={"sm"}>
                        Tentativas
                    </Heading>
                    <HStack>
                        {letters?.map((l, i) => {
                            return (
                                <Box my={2} key={i} p={2} borderRadius={"lg"} borderColor={"black"} borderWidth={"1"}>
                                    <Text fontWeight={"light"} fontSize={"md"}>{l.toUpperCase()}</Text>
                                </Box>
                            )
                        })}
                    </HStack>
                </VStack>
            )}
        </>

    )
}

// {letters?.length && (
//     <VStack mx={4}>
//         <Heading size={"sm"}>
//             Tentativas
//         </Heading>
//         <HStack>
//             {letters?.map((l, i) => {
//                 return (
//                     <Box my={2} key={i} p={2} borderRadius={"lg"} borderColor={"black"} borderWidth={"1"}>
//                         <Text fontWeight={"light"} fontSize={"md"}>{l.toUpperCase()}</Text>
//                     </Box>
//                 )
//             })}
//         </HStack>
//     </VStack>
// )}