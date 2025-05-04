import { useParams } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import {
  fetchLaunchById,
  fetchRocketById,
  fetchLaunchpadById,
} from '../api/launches';
import {
  Title,
  Text,
  Card,
  Badge,
  Group,
  Image,
  Loader,
  Box,
  Divider,
} from '@mantine/core';

export default function ResourceDetail() {
  const { id } = useParams<{ id: string }>();

  const {
    data: launch,
    isLoading,
  } = useQuery({
    queryKey: ['launch', id],
    queryFn: () => fetchLaunchById(id!),
    enabled: !!id,
  });
  
  const rocketId = launch?.rocket;
  const launchpadId = launch?.launchpad;
  
  const { data: rocket } = useQuery({
    queryKey: ['rocket', rocketId],
    queryFn: () => fetchRocketById(rocketId),
    enabled: !!rocketId,
  });
  
  const { data: launchpad } = useQuery({
    queryKey: ['launchpad', launchpadId],
    queryFn: () => fetchLaunchpadById(launchpadId),
    enabled: !!launchpadId,
  });
  

  if (isLoading || !launch) return <Loader />;

  const {
    name,
    date_utc,
    success,
    details,
    links: { patch, webcast },
  } = launch;

  return (
    <Card shadow="sm" padding="lg" radius="md" withBorder>
      <Group   mb="md">
        <Title order={2}>{name}</Title>
        <Badge color={success ? 'green' : 'red'} size="lg">
          {success ? 'Success' : 'Failure'}
        </Badge>
      </Group>

      <Text size="sm" color="dimmed">
        {new Date(date_utc).toLocaleString()}
      </Text>

      {patch?.large && (
        <Image src={patch.large} alt={`${name} mission patch`} mt="md" width={200} />
      )}

      <Text mt="md">{details || 'No details available.'}</Text>

      {webcast && (
        <Box mt="md">
          <a href={webcast} target="_blank" rel="noopener noreferrer">
            Watch Webcast
          </a>
        </Box>
      )}

      {/* Enrichment: Rocket Info */}
      {rocket && (
        <>
          <Divider my="md" label="Rocket Info" />
          <Title order={4}>{rocket.name}</Title>
          <Text size="sm">{rocket.description}</Text>
        </>
      )}

      {/* Enrichment: Launchpad Info */}
      {launchpad && (
        <>
          <Divider my="md" label="Launchpad Info" />
          <Title order={4}>{launchpad.name}</Title>
          <Text size="sm">{launchpad.locality}, {launchpad.region}</Text>
        </>
      )}
    </Card>
  );
}
