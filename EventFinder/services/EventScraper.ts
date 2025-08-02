import { calculateDistance } from './LocationService';

export interface EventType {
  id: string;
  title: string;
  description: string;
  type: string;
  date: string;
  location: {
    latitude: number;
    longitude: number;
  };
  distance: string;
}

export interface LocationType {
  latitude: number;
  longitude: number;
}

// Simulated AI-powered event search that would normally scrape search engines
export async function fetchEvents(
  location: LocationType,
  filters: string[]
): Promise<EventType[]> {
  try {
    // Simulate network delay for realistic experience
    await new Promise(resolve => setTimeout(resolve, 2000));

    // Generate realistic dummy events based on location and filters
    const allEvents: Omit<EventType, 'distance'>[] = [
      {
        id: '1',
        title: 'Summer Music Festival',
        description: 'Join us for an amazing outdoor music festival featuring local and international artists. Food trucks, craft beer, and great vibes!',
        type: 'Music',
        date: '2024-08-15T18:00:00Z',
        location: {
          latitude: location.latitude + 0.005,
          longitude: location.longitude + 0.005,
        },
      },
      {
        id: '2',
        title: 'Basketball Championship',
        description: 'Watch the city\'s best teams compete in this exciting basketball tournament. Family-friendly event with concessions available.',
        type: 'Sports',
        date: '2024-08-20T19:30:00Z',
        location: {
          latitude: location.latitude - 0.008,
          longitude: location.longitude + 0.003,
        },
      },
      {
        id: '3',
        title: 'Contemporary Art Exhibition',
        description: 'Explore cutting-edge contemporary art from emerging local artists. Opening reception with wine and appetizers.',
        type: 'Art',
        date: '2024-08-18T17:00:00Z',
        location: {
          latitude: location.latitude + 0.012,
          longitude: location.longitude - 0.007,
        },
      },
      {
        id: '4',
        title: 'Shakespeare in the Park',
        description: 'A magical outdoor performance of Romeo and Juliet under the stars. Bring blankets and enjoy this classic tale.',
        type: 'Theater',
        date: '2024-08-22T20:00:00Z',
        location: {
          latitude: location.latitude - 0.003,
          longitude: location.longitude - 0.009,
        },
      },
      {
        id: '5',
        title: 'Jazz Night at the Lounge',
        description: 'Intimate jazz performance featuring the city\'s finest musicians. Craft cocktails and small plates available.',
        type: 'Music',
        date: '2024-08-17T21:00:00Z',
        location: {
          latitude: location.latitude + 0.007,
          longitude: location.longitude + 0.011,
        },
      },
      {
        id: '6',
        title: 'Soccer Tournament Finals',
        description: 'The championship match of the local soccer league. Exciting gameplay and community spirit guaranteed!',
        type: 'Sports',
        date: '2024-08-25T16:00:00Z',
        location: {
          latitude: location.latitude - 0.015,
          longitude: location.longitude + 0.008,
        },
      },
      {
        id: '7',
        title: 'Pottery Workshop & Exhibition',
        description: 'Learn pottery techniques from master craftspeople and view beautiful ceramic art pieces.',
        type: 'Art',
        date: '2024-08-19T14:00:00Z',
        location: {
          latitude: location.latitude + 0.009,
          longitude: location.longitude - 0.004,
        },
      },
      {
        id: '8',
        title: 'Comedy Theater Show',
        description: 'Laugh out loud with this hilarious comedy performance by award-winning local theater group.',
        type: 'Theater',
        date: '2024-08-21T19:00:00Z',
        location: {
          latitude: location.latitude - 0.006,
          longitude: location.longitude + 0.013,
        },
      },
    ];

    // Filter events based on selected filters
    const filteredEvents = allEvents.filter(event => 
      filters.includes(event.type)
    );

    // Calculate distances and add to events
    const eventsWithDistance: EventType[] = filteredEvents.map(event => {
      const distance = calculateDistance(
        location.latitude,
        location.longitude,
        event.location.latitude,
        event.location.longitude
      );

      return {
        ...event,
        distance: `${distance} miles`,
      };
    });

    // Sort by distance (closest first)
    eventsWithDistance.sort((a, b) => {
      const distanceA = parseFloat(a.distance.split(' ')[0]);
      const distanceB = parseFloat(b.distance.split(' ')[0]);
      return distanceA - distanceB;
    });

    return eventsWithDistance;

  } catch (error) {
    console.error('Error fetching events:', error);
    throw new Error('Failed to fetch events. Please check your internet connection and try again.');
  }
}

// In a real implementation, this would use web scraping and AI to search for events
export async function searchEventsWithAI(
  location: LocationType,
  query: string,
  filters: string[]
): Promise<EventType[]> {
  // This would integrate with a free AI service or web scraping solution
  // For now, we'll use the same dummy data approach
  return fetchEvents(location, filters);
}
