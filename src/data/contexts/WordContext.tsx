import {
  PropsWithChildren,
  createContext,
  useContext,
  useEffect,
  useState,
} from "react";
import * as Network from "expo-network";

export interface IWordContext {
  word?: string;
  setWord?(word: string): void;
  defs: string[];
  setDefs?(defs: string[]): void;
  letters: string[];
  setLetters?(letters: string[] | ((prevLetters: string[]) => void)): void;
  refresh: boolean;
  setRefresh?(refresh: boolean | any): void;
  loading: boolean;
  chances: number;
  loseChance?(): void;
  win: boolean;
  lose: boolean;
  isConnected?: boolean;
}

export const WordContext = createContext<IWordContext>({
  defs: [],
  letters: [],
  refresh: false,
  loading: false,
  chances: 5,
  win: false,
  lose: false,
});

export default function WordProvider({ children }: PropsWithChildren) {
  const [loading, setLoading] = useState<boolean>(false);
  const [word, setWord] = useState<string>();
  const [defs, setDefs] = useState<string[]>([]);
  const [refresh, setRefresh] = useState<boolean>(false);
  const [chances, setChances] = useState<number>(5);
  const [letters, setLetters] = useState<string[]>([]);
  const [lose, setLose] = useState<boolean>(false);
  const [win, setWin] = useState<boolean>(false);
  const [isConnected, setIsConnected] = useState<boolean>();

  function loseChance() {
    setChances((prevChance) => {
      if (prevChance == 0) {
        setLose(true);
        return prevChance;
      } else {
        return prevChance - 1;
      }
    });
  }

  useEffect(() => {
    if (chances == 0) {
      setLose(true);
    }
  }, [chances]);

  useEffect(() => {
    setLose(false);
    setWin(false);
    setLetters([]);
    setChances(5);
    setLoading(true);
    const url = "https://www.ime.usp.br/~pf/dicios/br-sem-acentos.txt";
    (async () => {
      try {
        const { isConnected } = await Network.getNetworkStateAsync();
        setIsConnected(isConnected);
        const responseRan = await fetch(url);
        const responseRanBody = await responseRan.text();
        const index = Math.floor(
          Math.random() * responseRanBody.split("\n").length
        );
        const palavra = responseRanBody.split("\n")[index];
        setWord(palavra);
      } catch (error) {
        setWord("");
      } finally {
        setLoading(false);
      }
    })();
  }, [refresh]);

  useEffect(() => {
    if (word) {
      const urlDef = (word: string) =>
        `https://api.dicionario-aberto.net/word/${word}`;
      (async () => {
        try {
          setLoading(true);
          const { isInternetReachable } = await Network.getNetworkStateAsync();
          setIsConnected(isInternetReachable);
          const responseDef = await fetch(urlDef(word));
          const responseDefJson = await responseDef.json();
          setDefs(
            responseDefJson
              .map((def: any) => {
                return def.xml;
              })
              .map((def: string) => {
                return /<def>\n(.+)\n<\/def>/.exec(def);
              })
              .map((def: string[]) => {
                return def[1];
              })
          );
        } catch (error) {
          setDefs([]);
        } finally {
          setLoading(false);
        }
      })();
    }
  }, [word]);

  useEffect(() => {
    if (word && letters?.length) {
      letters.filter((l, i) => {
        if (i == letters.length - 1) {
          !word
            .split("")
            .map((le) => le.toUpperCase())
            .includes(l) && loseChance();
        }
      });
    }
    if (word && letters) {
      const allLetters = word
        .split("")
        .filter((l) => letters.includes(l.toUpperCase()));
      if (allLetters.length == word.length) {
        setWin(true);
      }
    }
  }, [letters]);

  // useEffect(() => {
  // }, [letters])

  return (
    <WordContext.Provider
      value={{
        word,
        setWord,
        defs,
        setDefs,
        refresh,
        setRefresh,
        loading,
        chances,
        letters,
        setLetters,
        win,
        lose,
      }}
    >
      {children}
    </WordContext.Provider>
  );
}

export const useWord = () => useContext(WordContext);
