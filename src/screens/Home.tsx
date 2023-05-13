import { Box, Heading } from "native-base";
import Info from "../components/Info";
import Word from "../components/Word";
import Keyboard from "../components/Keyboard";
import WordProvider from "../data/contexts/WordContext";
import Definition from "../components/Definition";

export default function Home() {
    return (
        <WordProvider>
            <Box safeArea flex={1}>
                <Info/>
                <Word flexGrow={5}/>
                <Definition flexGrow={2}/>
                <Keyboard/>
            </Box>
        </WordProvider>
    )
}