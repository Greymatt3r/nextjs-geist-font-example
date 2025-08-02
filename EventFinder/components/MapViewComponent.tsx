import React from 'react';
import { StyleSheet, View, Text } from 'react-native';
import MapView, { Marker, PROVIDER_DEFAULT } from 'react-native-maps';

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

interface MapViewComponentProps {
  events: EventType[];
  currentLocation: LocationType | null;
}

const MapViewComponent: React.FC<MapViewComponentProps> = ({
  events,
  currentLocation,
}) => {
  if (!currentLocation) {
    return (
      <View style={styles.loadingContainer}>
        <Text style={styles.loadingText}>Loading map...</Text>
      </View>
    );
  }

  const region = {
    latitude: currentLocation.latitude,
    longitude: currentLocation.longitude,
    latitudeDelta: 0.05,
    longitudeDelta: 0.05,
  };

  const getMarkerColor = (eventType: string): string => {
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

  return (
    <View style={styles.container}>
      <MapView
        style={styles.map}
        provider={PROVIDER_DEFAULT}
        region={region}
        showsUserLocation={true}
        showsMyLocationButton={true}
        showsCompass={true}
        showsScale={true}
      >
        {/* Current location marker */}
        <Marker
          coordinate={currentLocation}
          title="Your Location"
          description="You are here"
          pinColor="blue"
        />

        {/* Event markers */}
        {events.map((event) => (
          <Marker
            key={event.id}
            coordinate={event.location}
            title={event.title}
            description={`${event.type} • ${event.distance}`}
            pinColor={getMarkerColor(event.type)}
          >
            <View style={[styles.customMarker, { backgroundColor: getMarkerColor(event.type) }]}>
              <Text style={styles.markerText}>{event.type.charAt(0)}</Text>
            </View>
          </Marker>
        ))}
      </MapView>

      {/* Legend */}
      <View style={styles.legend}>
        <Text style={styles.legendTitle}>Event Types</Text>
        <View style={styles.legendItems}>
          <View style={styles.legendItem}>
            <View style={[styles.legendColor, { backgroundColor: '#ff6b6b' }]} />
            <Text style={styles.legendText}>Music</Text>
          </View>
          <View style={styles.legendItem}>
            <View style={[styles.legendColor, { backgroundColor: '#4ecdc4' }]} />
            <Text style={styles.legendText}>Sports</Text>
          </View>
          <View style={styles.legendItem}>
            <View style={[styles.legendColor, { backgroundColor: '#45b7d1' }]} />
            <Text style={styles.legendText}>Art</Text>
          </View>
          <View style={styles.legendItem}>
            <View style={[styles.legendColor, { backgroundColor: '#96ceb4' }]} />
            <Text style={styles.legendText}>Theater</Text>
          </View>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    position: 'relative',
  },
  map: {
    flex: 1,
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#f8f9fa',
  },
  loadingText: {
    fontSize: 16,
    color: '#666666',
    fontWeight: '500',
  },
  customMarker: {
    width: 30,
    height: 30,
    borderRadius: 15,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 2,
    borderColor: '#ffffff',
    shadowColor: '#000000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  markerText: {
    color: '#ffffff',
    fontSize: 14,
    fontWeight: 'bold',
  },
  legend: {
    position: 'absolute',
    top: 10,
    right: 10,
    backgroundColor: 'rgba(255, 255, 255, 0.95)',
    padding: 12,
    borderRadius: 8,
    shadowColor: '#000000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  legendTitle: {
    fontSize: 14,
    fontWeight: '600',
    color: '#333333',
    marginBottom: 8,
  },
  legendItems: {
    flexDirection: 'column',
  },
  legendItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 4,
  },
  legendColor: {
    width: 12,
    height: 12,
    borderRadius: 6,
    marginRight: 8,
  },
  legendText: {
    fontSize: 12,
    color: '#666666',
    fontWeight: '500',
  },
});

export default MapViewComponent;
