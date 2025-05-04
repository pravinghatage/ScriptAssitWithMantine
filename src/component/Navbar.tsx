import { Link } from 'react-router-dom';
import { Group, Button, Box } from '@mantine/core';
import { isAuthenticated, logout } from '../utils/auth';
import { useNavigate } from 'react-router-dom';

export default function Navbar() {
  const navigate = useNavigate();
  const isAuth = isAuthenticated();

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  return (
    <Box p="md" bg="gray.1">
      <Group justify='space-between'>
        <Group  color="blue">
          <Link to="/">Home</Link>
          <Link to="/resources">Resources</Link>
          {isAuth && <Link to="/dashboard">Dashboard</Link>}
        </Group>
        <Group>
          {!isAuth ? (
            <Link to="/login">Dashboard</Link>
          ) : (
            <Button size="xs" onClick={handleLogout}>
              Logout
            </Button>
          )}
        </Group>
      </Group>
    </Box>
  );
}
