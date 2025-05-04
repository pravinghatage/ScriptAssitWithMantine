import { Title, Text, Box } from '@mantine/core';

export default function HomePage() {
  return (
    <Box>
      <Title>Welcome to the SpaceX Explorer</Title>
      <Text mt="sm">
        Use the navigation above to login or explore public resources like the mission list.
      </Text>
    </Box>
  );
}
