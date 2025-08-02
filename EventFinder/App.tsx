import React, { useState, useEffect } from 'react';
import { StyleSheet, View, Text, Alert, StatusBar, SafeAreaView } from 'react-native';
import MapViewComponent from './components/MapViewComponent';
import FilterComponent from './components/FilterComponent';
import EventListComponent from './components/EventListComponent';
import { getCurrentLocation } from './services/LocationService';
import { fetchEvents } from './services/EventScraper';

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

export default function App() {
  const [currentLocation, setCurrentLocation] = useState<LocationType | null>(null);
  const [eventData, setEventData] = useState<EventType[]>([]);
  const [filters, setFilters] = useState<string[]>(['Music', 'Sports', 'Art', 'Theater']);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    initializeApp();
  }, []);

  useEffect(() => {
    if (currentLocation) {
      loadEvents();
    }
  }, [currentLocation, filters]);

  const initializeApp = async () => {
    try {
      setLoading(true);
      const location = await getCurrentLocation();
      setCurrentLocation(location);
      setError(null);
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Failed to get location';
      setError(errorMessage);
      Alert.alert('Location Error', errorMessage);
    } finally {
      setLoading(false);
    }
  };

  const loadEvents = async () => {
    if (!currentLocation) return;
    
    try {
      setLoading(true);
      const events = await fetchEvents(currentLocation, filters);
      setEventData(events);
      setError(null);
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Failed to load events';
      setError(errorMessage);
      Alert.alert('Events Error', errorMessage);
    } finally {
      setLoading(false);
    }
  };

  const handleFilterChange = (newFilters: string[]) => {
    setFilters(newFilters);
  };

  if (loading && !currentLocation) {
    return (
      <SafeAreaView style={styles.container}>
        <StatusBar barStyle="dark-content" />
        <View style={styles.loadingContainer}>
          <Text style={styles.loadingText}>Getting your location...</Text>
        </View>
      </SafeAreaView>
    );
  }

  if (error && !currentLocation) {
    return (
      <SafeAreaView style={styles.container}>
        <StatusBar barStyle="dark-content" />
        <View style={styles.errorContainer}>
          <Text style={styles.errorText}>Unable to get location</Text>
          <Text style={styles.errorSubtext}>{error}</Text>
        </View>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="dark-content" />
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Event Finder</Text>
      </View>
      
      <FilterComponent 
        selectedFilters={filters}
        onChange={handleFilterChange}
      />
      
      <View style={styles.mapContainer}>
        <MapViewComponent 
          events={eventData}
          currentLocation={currentLocation}
        />
      </View>
      
      <View style={styles.listContainer}>
        <EventListComponent 
          events={eventData}
          loading={loading}
        />
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#ffffff',
  },
  header: {
    paddingHorizontal: 20,
    paddingVertical: 15,
    backgroundColor: '#ffffff',
    borderBottomWidth: 1,
    borderBottomColor: '#e0e0e0',
  },
  headerTitle: {
    fontSize: 28,
    fontWeight: '700',
    color: '#000000',
    textAlign: 'center',
  },
  mapContainer: {
    flex: 1,
    minHeight: 300,
  },
  listContainer: {
    flex: 1,
    backgroundColor: '#f8f9fa',
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#ffffff',
  },
  loadingText: {
    fontSize: 18,
    color: '#666666',
    fontWeight: '500',
  },
  errorContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#ffffff',
    paddingHorizontal: 20,
  },
  errorText: {
    fontSize: 20,
    color: '#dc3545',
    fontWeight: '600',
    marginBottom: 10,
    textAlign: 'center',
  },
  errorSubtext: {
    fontSize: 16,
    color: '#666666',
    textAlign: 'center',
    lineHeight: 22,
  },
});
