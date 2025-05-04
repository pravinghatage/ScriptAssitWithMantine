import { useState } from 'react';
import { TextInput, PasswordInput, Button, Box, Title, Center } from '@mantine/core';
import { useNavigate } from 'react-router-dom';
import { login } from '../utils/auth';

export default function LoginPage() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleLogin = () => {
    const success = login(username, password);
    if (success) {
      navigate('/dashboard');
    } else {
      setError('Invalid credentials');
    }
  };

  return (
    <Center style={{ height: '100vh' }}>
      <Box maw={400} w="100%">
        <Title order={2} mb="md">Login</Title>
        <Title order={2} mb="md">To acces dashboard u need to login</Title>
        <TextInput
          label="Username"
          value={username}
          onChange={(e) => setUsername(e.currentTarget.value)}
        />
        <PasswordInput
          label="Password"
          mt="md"
          value={password}
          onChange={(e) => setPassword(e.currentTarget.value)}
        />
        {error && <p style={{ color: 'red' }}>{error}</p>}
        <Button fullWidth mt="lg" onClick={handleLogin}>Login</Button>
      </Box>
    </Center>
  );
}
