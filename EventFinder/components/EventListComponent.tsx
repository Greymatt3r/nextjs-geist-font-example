import React from 'react';
import { StyleSheet, View, Text, FlatList, TouchableOpacity, Image, Alert } from 'react-native';

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

interface EventListComponentProps {
  events: EventType[];
  loading: boolean;
}

const EventListComponent: React.FC<EventListComponentProps> = ({
  events,
  loading,
}) => {
  const formatDate = (dateString: string): string => {
    const date = new Date(dateString);
    const options: Intl.DateTimeFormatOptions = {
      weekday: 'short',
      month: 'short',
      day: 'numeric',
      hour: 'numeric',
      minute: '2-digit',
    };
    return date.toLocaleDateString('en-US', options);
  };

  const getEventTypeColor = (eventType: string): string => {
    switch (eventType) {
      case 'Music':
        return '#ff6b6b';
      case 'Sports':
        return '#4ecdc4';
      case 'Art':
        return '#45b7d1';
      case 'Theater':
        return '#96ceb4';
      default:
        return '#feca57';
    }
  };

  const handleEventPress = (event: EventType) => {
    Alert.alert(
      event.title,
      `${event.description}\n\nDate: ${formatDate(event.date)}\nDistance: ${event.distance}`,
      [{ text: 'OK', style: 'default' }]
    );
  };

  const renderEventItem = ({ item }: { item: EventType }) => {
    const eventTypeColor = getEventTypeColor(item.type);
    const imageUrl = `https://placehold.co/400x200?text=${encodeURIComponent(
      `${item.type}+event+preview+image+showing+${item.title.replace(/\s+/g, '+')}`
    )}`;

    return (
      <TouchableOpacity
        style={styles.eventCard}
        onPress={() => handleEventPress(item)}
        activeOpacity={0.7}
      >
        <Image
          source={{ uri: imageUrl }}
          style={styles.eventImage}
          onError={() => {
            // Handle image loading error gracefully
            console.log('Image failed to load for event:', item.title);
          }}
        />
        
        <View style={styles.eventContent}>
          <View style={styles.eventHeader}>
            <Text style={styles.eventTitle} numberOfLines={2}>
              {item.title}
            </Text>
            <View style={[styles.eventTypeBadge, { backgroundColor: eventTypeColor }]}>
              <Text style={styles.eventTypeText}>{item.type}</Text>
            </View>
          </View>
          
          <Text style={styles.eventDescription} numberOfLines={3}>
            {item.description}
          </Text>
          
          <View style={styles.eventFooter}>
            <Text style={styles.eventDate}>
              {formatDate(item.date)}
            </Text>
            <Text style={styles.eventDistance}>
              {item.distance}
            </Text>
          </View>
        </View>
      </TouchableOpacity>
    );
  };

  const renderEmptyState = () => (
    <View style={styles.emptyContainer}>
      <Text style={styles.emptyTitle}>No Events Found</Text>
      <Text style={styles.emptyText}>
        {loading 
          ? 'Loading events...' 
          : 'Try adjusting your filters or check back later for new events in your area.'
        }
      </Text>
    </View>
  );

  const renderLoadingState = () => (
    <View style={styles.loadingContainer}>
      <Text style={styles.loadingText}>Finding events near you...</Text>
    </View>
  );

  if (loading && events.length === 0) {
    return renderLoadingState();
  }

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerTitle}>
          {events.length > 0 ? `${events.length} Events Found` : 'Events'}
        </Text>
      </View>
      
      <FlatList
        data={events}
        renderItem={renderEventItem}
        keyExtractor={(item) => item.id}
        contentContainerStyle={styles.listContainer}
        showsVerticalScrollIndicator={false}
        ListEmptyComponent={renderEmptyState}
        refreshing={loading}
        onRefresh={() => {
          // This would trigger a refresh in the parent component
          console.log('Refresh requested');
        }}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f8f9fa',
  },
  header: {
    paddingHorizontal: 20,
    paddingVertical: 15,
    backgroundColor: '#ffffff',
    borderBottomWidth: 1,
    borderBottomColor: '#e0e0e0',
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#333333',
  },
  listContainer: {
    padding: 15,
  },
  eventCard: {
    backgroundColor: '#ffffff',
    borderRadius: 12,
    marginBottom: 15,
    shadowColor: '#000000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
    overflow: 'hidden',
  },
  eventImage: {
    width: '100%',
    height: 160,
    backgroundColor: '#e9ecef',
  },
  eventContent: {
    padding: 15,
  },
  eventHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: 10,
  },
  eventTitle: {
    fontSize: 18,
    fontWeight: '700',
    color: '#000000',
    flex: 1,
    marginRight: 10,
    lineHeight: 24,
  },
  eventTypeBadge: {
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 12,
  },
  eventTypeText: {
    fontSize: 12,
    fontWeight: '600',
    color: '#ffffff',
  },
  eventDescription: {
    fontSize: 14,
    color: '#666666',
    lineHeight: 20,
    marginBottom: 12,
  },
  eventFooter: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  eventDate: {
    fontSize: 14,
    fontWeight: '500',
    color: '#333333',
  },
  eventDistance: {
    fontSize: 14,
    fontWeight: '600',
    color: '#007bff',
  },
  emptyContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 40,
    paddingVertical: 60,
  },
  emptyTitle: {
    fontSize: 20,
    fontWeight: '600',
    color: '#333333',
    marginBottom: 10,
    textAlign: 'center',
  },
  emptyText: {
    fontSize: 16,
    color: '#666666',
    textAlign: 'center',
    lineHeight: 22,
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: 60,
  },
  loadingText: {
    fontSize: 16,
    color: '#666666',
    fontWeight: '500',
  },
});

export default EventListComponent;
