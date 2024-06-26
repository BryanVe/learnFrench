import {
  ActionIcon,
  Box,
  Button,
  Center,
  Flex,
  Group,
  RingProgress,
  Stack,
  Text,
  Title,
} from "@mantine/core"
import { useNavigate } from "react-router-dom"
import { Icon } from "~/components"

const FinishLesson = () => {
  const navigate = useNavigate()
  return (
    <Box
      w="100%"
      style={{
        //   border: "2px solid #DAE1EA",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        //   gap: "10",
      }}
    >
      <Box
        w="100%"
        style={{
          border: "2px solid #DAE1EA",
          borderRadius: 6,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",

          justifyContent: "center",
        }}
        p="xl"
      >
        <Title order={2}>Leccion Terminada </Title>

        <RingProgress
          m="sm"
          sections={[{ value: 100, color: "teal" }]}
          label={
            <Center>
              <ActionIcon
                color="teal"
                variant="light"
                radius="xl"
                size="xl"
              >
                <Icon type="check"></Icon>
              </ActionIcon>
            </Center>
          }
        />
        <Stack justify="center" align="center">
          <Text>Puntaje: 30</Text>
          <Text>¡Felicitaciones!</Text>
          <Text>Ya puede iniciar la siguiente leccion</Text>
        </Stack>
      </Box>
      <Group mt="xl">
        <Button onClick={() => navigate("/completeLesson")}>
          Reiniciar Leccion
        </Button>
        <Button onClick={() => navigate("/home")}>Siguiente Leccion</Button>
      </Group>
    </Box>
  )
}

export default FinishLesson
