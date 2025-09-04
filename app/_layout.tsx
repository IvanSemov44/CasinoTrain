import { QuizProvider } from "@/context/QuizContext";
import { Stack } from "expo-router";
import { StatusBar } from "expo-status-bar";

export default function RootLayout() {
  return (
    <QuizProvider>
      <StatusBar style="light" />

      <Stack
        screenOptions={{
          headerStyle: {
            backgroundColor: '#007bff'
          },
          headerTintColor: "#fff",
          headerTitleStyle: {
            fontWeight: 'bold'
          }
        }}
      >

        <Stack.Screen
          name="(tabs)"
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="quiz/[id]"
          options={{
            title: 'Quiz',
            presentation: 'card'
          }}
        />
        <Stack.Screen
          name="quiz/results"
          options={{
            title: 'Results',
            presentation: 'card',
            headerLeft: () => null
          }}
        />
      </Stack>
    </QuizProvider>
  );
}
