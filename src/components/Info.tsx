import { Box, Button, FavouriteIcon, HStack, Heading, Text, VStack } from "native-base";
import { useContext, useState } from "react";
import nextId from "react-id-generator";
import { IWordContext, WordContext } from "../data/contexts/WordContext";

interface IInfoProps {
    flexGrow?: number
}

export default function Info({flexGrow}: IInfoProps) {
    const { refresh, setRefresh, chances } = useContext(WordContext) as IWordContext

    function renderChances(chances: number) {
        const c = []
        for (let i = 0; i < chances; i++) {
            c.push(
                <FavouriteIcon key={nextId()} size={'lg'} color="secondary.600" />
            )
        }
        return c
    }

    return (
        <HStack  flexGrow={flexGrow} mx={4} alignItems={"flex-end"} justifyContent={"space-evenly"}>
            <VStack flex={2} space={2}>
                <Button
                    width={"1/2"}
                    _text={{fontSize:"md"}}
                    onPress={() => {
                        setRefresh(!refresh)
                    }}
                >
                    Reiniciar
                </Button>
                <Heading>Chances:</Heading>
            </VStack>
            <HStack space={"1.5"}>{renderChances(chances)}</HStack>
        </HStack>
    )
}