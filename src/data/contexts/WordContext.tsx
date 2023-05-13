import { PropsWithChildren, createContext, useEffect, useState } from "react"


export interface IWordContext {
    word: string,
    setWord(word: string): void,
    defs: string[],
    setDefs(defs: string[]): void
    letters: string[],
    setLetters(letters: string[] | ((prevLetters: string[]) => void)): void
    refresh: boolean
    setRefresh(refresh: boolean): void
    loading: boolean
    chances: number
    loseChance(): void
}

export const WordContext = createContext<IWordContext | {}>({})

export default function WordProvider({ children }: PropsWithChildren) {
    const [loading, setLoading] = useState<boolean>(false)
    const [word, setWord] = useState<string>()
    const [defs, setDefs] = useState<string[] | null>()
    const [refresh, setRefresh] = useState<boolean>(false)
    const [chances, setChances] = useState<number>(5)
    const [letters, setLetters] = useState<string[]>([])
    const [lose, setLose] = useState<boolean>(false)
    const [win, setWin] = useState<boolean>(false)

    function loseChance() {
        setChances(prevChance => {
            if (prevChance == 0){
                setLose(true)
                return prevChance
            } else {
                return prevChance - 1
            }
        })
    }

    useEffect(() => {
        setLose(false)
        setWin(false)
        setLetters([])
        setChances(5)
        setLoading(true)
        const url = 'https://www.ime.usp.br/~pf/dicios/br-sem-acentos.txt';
        (async () => {
            try {
                const responseRan = await fetch(url)
                const responseRanBody = await responseRan.text()
                const index = Math.floor(Math.random() * responseRanBody.split('\n').length)
                const palavra = responseRanBody.split('\n')[index]
                setWord(palavra)
            } catch (error) {
                setWord('')
            } finally {
                setLoading(false)
            }
        })()
    }, [refresh])

    useEffect(() => {
        setLoading(true)
        if (word) {
            const urlDef = (word: string) => `https://api.dicionario-aberto.net/word/${word}`;
            (async () => {
                try {
                    const responseDef = await fetch(urlDef(word))
                    const responseDefJson = await responseDef.json()
                    setDefs(responseDefJson.map((def: any) => {
                        return def.xml
                    }).map((def: string) => {
                        return /<def>\n(.+)\n<\/def>/.exec(def)
                    }).map((def: string[]) => {
                        return def[1]
                    }))
                } catch (error) {
                    setDefs(null)
                } finally {
                    setLoading(false)
                }
            })()
        }
    }, [word])

    useEffect(() => {
        console.log("Letters: ",letters)
        console.log("Word: ", word)
        if(word && letters?.length){
            const hasLetter = word.split('').map(l => l.toUpperCase()).filter(l => letters.includes(l))
            if (!hasLetter.length){
                loseChance()
            }
        }
    }, [letters])

    return (
        <WordContext.Provider value={{ word, setWord, defs, setDefs, refresh, setRefresh, loading, 
        chances, letters, setLetters}}>
            {children}
        </WordContext.Provider>
    )
}