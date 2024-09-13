import { useState, useEffect } from 'react';
import { Card, Image, Group, Title, Modal, Center, Loader } from '@mantine/core';

interface CardItemProps {
  imageUrl: string;
  title: string;
  position:string;
}

export function CardItem({ imageUrl, title,position }: CardItemProps) {
  const [loading, setLoading] = useState(true);
  const [overlayVisible, setOverlayVisible] = useState(false);

  
  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        setOverlayVisible(false);
      }
    };

    document.addEventListener('keydown', handleKeyDown);

    return () => {
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, []);

  return (
    <>
      {/* Card Item */}
      <div
        className="card-item"
        onClick={() => setOverlayVisible(true)} 
        style={{ cursor: 'pointer' }}
      >
        <Card shadow="sm" padding="lg" radius="md" withBorder>
          <Card.Section>
            {/* Show spinner while the image is loading */}
            {loading && (
              <Center style={{ height: 160 }}>
                <div className="loader">
                  <Loader />
                </div>
              </Center>
            )}

            <Image
              src={imageUrl}
              height={160}
              alt={title}
              style={{ display: loading ? 'none' : 'block' }} 
              onLoad={() => setLoading(false)} 
            />
          </Card.Section>

          <Group justify="space-between" mt="md" mb="xs">
            <Title order={4}>{title}</Title>
            <Title order={4}>{position}</Title>
          </Group>
        </Card>
      </div>

      {/* Overlay */}
      <Modal
        opened={overlayVisible}
        closeOnClickOutside={false} 
        onClose={() => setOverlayVisible(false)}
        size="lg" 
        // overlayOpacity={0.6}
        centered
        withCloseButton={false} 
      >
        <Center>
          <Image
            src={imageUrl}
            alt={title}
            style={{
              maxWidth: '90vw', 
              maxHeight: '80vh', 
              objectFit: 'contain', 
            }}
          />
        </Center>
      </Modal>
    </>
  );
}
