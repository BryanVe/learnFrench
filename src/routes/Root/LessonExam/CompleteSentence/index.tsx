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
import { Fragment, useState } from "react"
import { useNavigate } from "react-router-dom"
import { Icon } from "~/components"

const question = {
  type: "complete_with_options",
  content: "Bonjour! {option} va?",
  options: [
    {
      content: "Opción 1",
      right: true,
      feedback: `Ça va ?" is used to ask how it's going. The "ç" is pronounced with an "s" sound.`,
    },
    {
      content: "Opción 2",
      right: false,
      feedback: `Ça va ?" is used to ask how it's going. The "ç" is pronounced with an "s" sound.2`,
    },
    {
      content: "Opción 3",
      right: false,
      feedback: `Ça va ?" is used to ask how it's going. The "ç" is pronounced with an "s" sound.3`,
    },
  ],
}

type TQuestionOptions = typeof question.options
type TQuestionOption = TQuestionOptions[number]

const defaultAnswer = "________"

type CompleteSentenceLessonProps = {
  question: typeof question
  goToNextQuestion: () => void
}

const CompleteSentenceLesson = ({
  question,
  goToNextQuestion,
}: CompleteSentenceLessonProps) => {
  const [currentSelectedOption, setCurrentSelectedOption] =
    useState<TQuestionOption>()
  const [verificate, setVerificate] = useState(false)
  const optionsDisabled = verificate && Boolean(currentSelectedOption)
  const navigate = useNavigate()

  return (
    <Flex
      direction="column"
      gap="sm"
    >
      <Group justify="space-between" mb="xl">
        <Title order={2}>Completa la siguiente oración</Title>
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
          // border: "2px solid #DAE1EA",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          //   gap: "10",
        }}
      >
        <Box>
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
          <Box
            style={{ border: "2px solid #DAE1EA", borderRadius: 6 }}
            p="xl"
          >
            <Group justify="center">
              <ActionIcon variant="subtle" aria-label="Settings">
                <Icon type="speaker" size={30}></Icon>
              </ActionIcon>
              {/* <Text>Bonjour! </Text>
              <Text td="underline" tt="uppercase">
                {completeText ?? completeTextDefault} */}
              <Text>
                {question.content.split(" ").map((s, index) => (
                  <Fragment key={`${s}-${index}`}>
                    {s === "{option}" ? (
                      <Text component="span" mx="xs" td="underline">
                        {currentSelectedOption?.content ?? defaultAnswer}
                      </Text>
                    ) : (
                      <Text component="span" mx={4}>
                        {s}
                      </Text>
                    )}
                  </Fragment>
                ))}
              </Text>
              {/* <Text>va ?</Text> */}
              <ActionIcon
                disabled={optionsDisabled}
                onClick={() => {
                  setCurrentSelectedOption(undefined)
                }}
                variant="subtle"
                aria-label="Settings"
              >
                <Icon type="eraser" size={30}></Icon>
              </ActionIcon>
            </Group>
            <Group justify="center" mt="xl" p="xs" gap="xl">
              {question.options.map((option) => (
                <Button
                  key={option.content}
                  disabled={optionsDisabled}
                  onClick={() => {
                    setCurrentSelectedOption(option)
                  }}
                >
                  {option.content}
                </Button>
              ))}
            </Group>
          </Box>
        </Box>
        <Button
          mt="lg"
          onClick={() => {
            setVerificate(Boolean(currentSelectedOption?.content))
            if (optionsDisabled) goToNextQuestion()
          }}
        >
          {optionsDisabled ? "Siguiente" : "Comprobar"}
        </Button>
      </Box>
      {verificate && currentSelectedOption && (
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
          <Text>
            {currentSelectedOption.right ? "Correcto" : "Incorrecto"}
          </Text>
          <Text>{currentSelectedOption.feedback}</Text>
        </Box>
      )}
    </Flex>
  )
}

export default CompleteSentenceLesson
