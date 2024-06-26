import {
  ActionIcon,
  Box,
  Button,
  CloseButton,
  Flex,
  Group,
  Progress,
  Stack,
  Text,
  Title,
  Tooltip,
} from "@mantine/core"
import { useState } from "react"
import { useNavigate } from "react-router-dom"
import { Icon } from "~/components"
import useSpeechRecognition from "./voice-interface"
import useSpeechHandler from "./textToVoice"

const question = {
  type: "repeat_sentece",
  content: "Bonjour! ça va?",
  feedback: "feedback",
}

type RepeatSentenceLessonProps = {
  question: typeof question
  goToNextQuestion: () => void
}

const textSpeechProcesing = (text: string, sentence: string) => {
  if (text.length === 0) return false
  const textClean = cleanSymbols(sentence)
  return text === textClean
  // if (text === textClean) {
  //   return true;
  // }
  // return false;
}

const cleanSymbols = (cadena: string) => {
  cadena = cadena.toLowerCase()
  return cadena.replace(/[!"#$%&'()*+,\-./:;<=>?@[\\\]^_`{|}~]/g, "")
}
const RepeatSentenceLesson = ({
  question,
  goToNextQuestion,
}: RepeatSentenceLessonProps) => {
  const navigate = useNavigate()
  const sentence = "Bonjour! ça va?"

  const [checkAnswer, setCheckAnswer] = useState(false)
  const { readText, isSpeaking } = useSpeechHandler()
  const {
    text,
    isListening,
    startListening,
    stopListening,
    hasRecognitionSupport,
  } = useSpeechRecognition()
  const isMicrophoneOn = Boolean(text)
  const validation = textSpeechProcesing(text, question.content)
  // const [isSpeaking, setIsSpeaking] = useState(false);/*  */

  return (
    <Flex
      direction="column"
      gap="sm"
    >
      <Group justify="space-between" mb="xl">
        <Title order={2}>Repite la siguiente oración</Title>
        <CloseButton
          style={{ borderRadius: 30, border: "2px solid #093b81" }}
          size="lg"
          onClick={() => navigate("/home")}
        />
      </Group>
      <Box
        w="100%"
        mx="auto"
        maw={1000}
        p="xs"
        style={{
          //   border: "2px solid #DAE1EA",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          //   gap: "10",
        }}
      >
        <Box w='100%' maw={700}>
          <Group justify="flex-end" mb='sm'>
            <Tooltip label="Gramatica">
              <ActionIcon
                variant="subtle"
                aria-label="Settings"
                onClick={() => navigate("/grammar")}
              >
                <Icon type="grammar" size={30}></Icon>
              </ActionIcon>
            </Tooltip>
            <Tooltip label="Vocabulario">
              <ActionIcon
                variant="subtle"
                aria-label="Settings"
                onClick={() => navigate("/vocabulary")}
              >
                <Icon type="vocabulary" size={30}></Icon>
              </ActionIcon>
            </Tooltip>
          </Group>
          {hasRecognitionSupport ? (
            <Box
              style={{ border: "2px solid #DAE1EA", borderRadius: 6 }}
              p="xl"
            >
              <Group justify="center" mb="sm">
                <ActionIcon
                  variant="subtle"
                  aria-label="Settings"
                  onClick={() => {
                    readText(question.content)
                  }}
                // disabled={isSpeaking() ? true : false}
                >
                  <Icon type="speaker" size={30}></Icon>
                </ActionIcon>
                {/* <Button
                  onClick={() => {
                    // isSpeaking;
                    console.log(isSpeaking(), typeof isSpeaking);
                  }}
                >
                  no
                </Button> */}
                <Text>{question.content}</Text>
              </Group>
              <Group justify="center">
                {isListening ? (
                  <ActionIcon
                    variant="subtle"
                    aria-label="Settings"
                    onClick={stopListening}
                    disabled={isMicrophoneOn}
                  >
                    <Icon
                      type="stopMicrophone"
                      size={30}
                      color="#ff5555"
                    ></Icon>
                  </ActionIcon>
                ) : (
                  <ActionIcon
                    variant="subtle"
                    aria-label="Settings"
                    onClick={startListening}
                    disabled={checkAnswer}
                  >
                    <Icon
                      type="microphone"
                      size={30}
                    // color={isListening ? "#ff5555" : "#23559a"}
                    ></Icon>
                  </ActionIcon>
                )}

                {/* <Stack> */}
                <Text c={isMicrophoneOn && validation ? "black" : "dimmed"}>
                  {question.content}
                </Text>
                {/* </Stack> */}
              </Group>
              {Boolean(text) && (
                <Group justify="center">
                  <Icon type="voiceToText" size={27} color="#23559a" />
                  <Text>{text}</Text>
                </Group>
              )}
            </Box>
          ) : (
            <Text>No tiene soporte uwu</Text>
          )}
        </Box>
        <Button
          mt="lg"
          onClick={() => {
            // navigate("/questionLesson");
            checkAnswer ? goToNextQuestion() : setCheckAnswer(true)
          }}
          disabled={isListening}
        >
          {checkAnswer ? "Continuar" : "Verificar"}
        </Button>
      </Box>
      {checkAnswer && (
        <Box
          mt='lg'
          p="xl"
          style={{
            border: "2px solid #DAE1EA",
            borderRadius: 6,
            display: "flex",
            flexDirection: "column",
            // alignItems: "center",
            justifyContent: "space-around",
            // gap: "10",
          }}
        >
          <Text>{validation ? "Correcto" : "Incorrecto"}</Text>
          <Text>{question.feedback}</Text>
        </Box>
      )}
    </Flex>
  )
}

export default RepeatSentenceLesson
