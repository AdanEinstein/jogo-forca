import { Button, HStack, VStack } from "native-base";
import { useContext } from "react";
import { IWordContext, WordContext } from "../data/contexts/WordContext";


export default function Keyboard() {
    const { loseChance, word, letters, setLetters, chances } = useContext(WordContext) as IWordContext
    const letras = [[...'ABCDEFG'.split('')],
    [...'HIJKLMN'.split('')],
    [...'OPQRSTU'.split('')],
    [...'VWXYZ'.split('')]]
    return (
        <VStack>
            {letras.map((g, i) => {
                return (
                    <HStack key={i}>
                        {g.map((l, index) => {
                            return (
                                <Button _pressed={{
                                    backgroundColor: 'muted.500'
                                }} flex={1} key={index} p={3}
                                    bg={'muted.700'}
                                    borderRadius={"none"} _text={{
                                        fontSize: "2xl",
                                        fontWeight: "bold"
                                    }}
                                    onPress={() => {
                                        setLetters((prevLetters: string[]) => {
                                            const letter = prevLetters?.filter(le => l == le)
                                            if (!letter?.length){
                                                return [...letters, l]
                                            } else {
                                                return [...letters]
                                            }
                                        })
                                    }}
                                >
                                    {l}
                                </Button>
                            )
                        })}
                    </HStack>
                )
            })}
        </VStack>
    )
}