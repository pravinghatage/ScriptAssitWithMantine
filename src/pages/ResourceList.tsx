import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import { fetchLaunches } from '../api/launches';
import {
  Table,
  TextInput,
  Title,
  Loader,
  Box,
  Group,
  ScrollArea,
} from '@mantine/core';
import { useEffect, useState } from 'react';

export default function ResourceList() {
  const navigate = useNavigate();
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const searchQuery = searchParams.get('search') || '';

  const { data, isLoading } = useQuery({queryKey:['launches'], queryFn:fetchLaunches});
  const [search, setSearch] = useState(searchQuery);

  useEffect(() => {
    if (search) {
      navigate(`/resources?search=${search}`);
    } else {
      navigate('/resources');
    }
  }, [search, navigate]);

  if (isLoading) {
    return <Loader />;
  }

  const filtered = data.filter((launch: any) =>
    launch.name.toLowerCase().includes(search.toLowerCase())
  );

  const rows = filtered.map((launch: any) => (
    <tr key={launch.id}>
      <td>
        <Link to={`/resources/${launch.id}`}>{launch.name}</Link>
      </td>
      <td>{new Date(launch.date_utc).toLocaleDateString()}</td>
      <td>{launch.success ? '✅' : '❌'}</td>
    </tr>
  ));

  return (
    <Box>
      <Group  mb="md">
        <Title order={2}>SpaceX Launches</Title>
        <TextInput
          placeholder="Search by name"
          value={search}
          onChange={(e) => setSearch(e.currentTarget.value)}
        />
      </Group>

      <ScrollArea>
        <Table striped highlightOnHover >
          <thead>
            <tr>
              <th>Name</th>
              <th>Date</th>
              <th>Success</th>
            </tr>
          </thead>
          <tbody>{rows}</tbody>
        </Table>
      </ScrollArea>
    </Box>
  );
}
