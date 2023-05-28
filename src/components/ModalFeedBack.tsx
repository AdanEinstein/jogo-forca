import {
  Alert,
  Box,
  HStack,
  IconButton,
  Modal,
  Text,
  VStack,
} from "native-base";
import { useWord } from "../data/contexts/WordContext";

export default function ModalFeedBack() {
  const { win, lose, word, setRefresh, isConnected } = useWord();
  console.log("isConnected:",isConnected)

  if (win && setRefresh) {
    return (
      <Modal isOpen={win || lose} size={"sm"}>
        <Modal.Content maxH="212">
          <Modal.CloseButton
            onPress={() => setRefresh((prev: boolean) => !prev)}
          />
          <Alert maxW="400" status="success" colorScheme="success">
            <VStack space={2} flexShrink={1} w="100%">
              <HStack
                flexShrink={1}
                space={2}
                alignItems="center"
                justifyContent="space-between"
              >
                <HStack flexShrink={1} space={2} alignItems="center">
                  <Alert.Icon />
                  <Text fontSize="md" fontWeight="medium" color="coolGray.800">
                    Parabéns
                  </Text>
                </HStack>
              </HStack>
              <Box
                pl="6"
                _text={{
                  color: "coolGray.600",
                }}
              >
                Você descobriu a palavra: {word?.toUpperCase()}
              </Box>
            </VStack>
          </Alert>
        </Modal.Content>
      </Modal>
    );
  }

  if (lose && setRefresh) {
    return (
      <Modal isOpen={lose} size={"sm"} closeOnOverlayClick>
        <Modal.Content maxH="212">
          <Modal.CloseButton
            onPress={() => setRefresh((prev: boolean) => !prev)}
          />
          <Alert maxW="400" status="error" colorScheme="error">
            <VStack space={2} flexShrink={1} w="100%">
              <HStack
                flexShrink={1}
                space={2}
                alignItems="center"
                justifyContent="space-between"
              >
                <HStack flexShrink={1} space={2} alignItems="center">
                  <Alert.Icon />
                  <Text fontSize="md" fontWeight="medium" color="coolGray.800">
                    Ops, você perdeu!
                  </Text>
                </HStack>
              </HStack>
              <Box
                pl="6"
                _text={{
                  color: "coolGray.600",
                }}
              >
                Mais sorte da próxima vez a palavra era: {word?.toUpperCase()}
              </Box>
            </VStack>
          </Alert>
        </Modal.Content>
      </Modal>
    );
  }

  if (isConnected == false && setRefresh) {
    return (
      <Modal isOpen={lose} size={"sm"} closeOnOverlayClick>
        <Modal.Content maxH="212">
          <Modal.CloseButton
            onPress={() => setRefresh((prev: boolean) => !prev)}
          />
          <Alert maxW="400" status="warning" colorScheme="warning">
            <VStack space={2} flexShrink={1} w="100%">
              <HStack
                flexShrink={1}
                space={2}
                alignItems="center"
                justifyContent="space-between"
              >
                <HStack flexShrink={1} space={2} alignItems="center">
                  <Alert.Icon />
                  <Text fontSize="md" fontWeight="medium" color="coolGray.800">
                    Aviso
                  </Text>
                </HStack>
              </HStack>
              <Box
                pl="6"
                _text={{
                  color: "coolGray.600",
                }}
              >
                Você não está conectado na internet, Por favor conecte-se
              </Box>
            </VStack>
          </Alert>
        </Modal.Content>
      </Modal>
    );
  }

  return null;
}
