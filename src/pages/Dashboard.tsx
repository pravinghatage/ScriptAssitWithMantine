import { Button, Container, Title } from '@mantine/core';
import { logout } from '../utils/auth';
import { useNavigate } from 'react-router-dom';

export default function Dashboard() {
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  return (
    <Container>
      <Title>Welcome to the Dashboard</Title>
      <Button mt="md" onClick={handleLogout}>Logout</Button>
    </Container>
  );
}
