import { Outlet } from 'react-router-dom';
import Navbar from './Navbar';
import { Container } from '@mantine/core';

export default function Layout() {
  return (
    <>
      <Navbar />
      <Container mt="md">
        <Outlet />
      </Container>
    </>
  );
}
