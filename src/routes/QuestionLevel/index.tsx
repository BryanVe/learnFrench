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
} from "@mantine/core";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Icon } from "~/components";
const QuestionLevel = () => {
  const correctAnswer = "opcion1";
  const navigate = useNavigate();
  const completeTextDefault = "________";
  const [completeText, setCompleteText] = useState<string>();
  const [verificate, setVerificate] = useState(false);
  const optionsDisabled = verificate && Boolean(completeText);
  const commentTextDeafault = "Incorrecto";
  const [commentText, setCommentText] = useState<string>();
  return (
    // <div></div>
    <Flex direction="column" w="100%" h="100vh" p="xl" bg="White.4">
      <Flex
        direction="column"
        w="100%"
        mx="auto"
        maw={1720}
        h="100vh"
        py={30}
        gap="sm"
        // bg="#fda1a1"
      >
        <Group justify="space-between" mb="xl" p="sm">
          <Title order={2}>Completa la siguiente oracion</Title>
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
          h={550}
          style={{
            // border: "2px solid #DAE1EA",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            //   gap: "10",
          }}
        >
          <Group m="sm" w="100%" align="center" justify="flex-end">
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
            w="100%"
            mx="auto"
            maw={700}
            style={{ border: "2px solid #DAE1EA", borderRadius: 6 }}
            p="xl"
          >
            <Group justify="center" mb="sm">
              <ActionIcon variant="subtle" aria-label="Settings">
                <Icon type="speaker" size={30}></Icon>
              </ActionIcon>
              <Text>Bonjour! </Text>
              <Text td="underline" tt="uppercase">
                {completeText ?? completeTextDefault}
              </Text>
              <Text>va ?</Text>
              <ActionIcon
                disabled={optionsDisabled}
                onClick={() => {
                  setCompleteText(undefined);
                }}
                variant="subtle"
                aria-label="Settings"
              >
                <Icon type="eraser" size={30}></Icon>
              </ActionIcon>
            </Group>
            <Group justify="center" mt="xl" p="xs" gap="xl">
              <Button
                disabled={optionsDisabled}
                onClick={() => {
                  setCompleteText("opcion1");
                  setCommentText("Correcto");
                }}
              >
                opcion1
              </Button>
              <Button
                disabled={optionsDisabled}
                onClick={() => setCompleteText("opcion2")}
              >
                opcion2
              </Button>
              <Button
                disabled={optionsDisabled}
                onClick={() => setCompleteText("opcion3")}
              >
                opcion3
              </Button>
            </Group>
          </Box>
          <Button
            my="xl"
            onClick={() => {
              if (completeText) setVerificate(true);
              if (optionsDisabled) navigate("/home");
            }}
          >
            {optionsDisabled ? "Finalizar" : "Comprobar"}
          </Button>
        </Box>
        {verificate && completeText !== commentTextDeafault && (
          <Box
            w="100%"
            mx="auto"
            p="lg"
            h="150"
            mt="xl"
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
            <Text>{commentText ?? commentTextDeafault}</Text>
            <Text>
              Ça va ?" is used to ask how it's going. The "ç" is pronounced with
              an "s" sound.
            </Text>
          </Box>
        )}
      </Flex>
    </Flex>
  );
};

export default QuestionLevel;
