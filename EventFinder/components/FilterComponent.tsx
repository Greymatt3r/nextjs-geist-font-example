import React from 'react';
import { StyleSheet, View, Text, TouchableOpacity, ScrollView } from 'react-native';

interface FilterComponentProps {
  selectedFilters: string[];
  onChange: (filters: string[]) => void;
}

const FilterComponent: React.FC<FilterComponentProps> = ({
  selectedFilters,
  onChange,
}) => {
  const availableFilters = ['Music', 'Sports', 'Art', 'Theater'];

  const toggleFilter = (filter: string) => {
    const isSelected = selectedFilters.includes(filter);
    let newFilters: string[];

    if (isSelected) {
      // Remove filter if already selected
      newFilters = selectedFilters.filter(f => f !== filter);
    } else {
      // Add filter if not selected
      newFilters = [...selectedFilters, filter];
    }

    onChange(newFilters);
  };

  const getFilterColor = (filterType: string): string => {
    switch (filterType) {
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
      <Text style={styles.title}>Event Types</Text>
      <ScrollView 
        horizontal 
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.scrollContainer}
      >
        {availableFilters.map((filter) => {
          const isSelected = selectedFilters.includes(filter);
          const filterColor = getFilterColor(filter);
          
          return (
            <TouchableOpacity
              key={filter}
              style={[
                styles.filterButton,
                isSelected && { 
                  backgroundColor: filterColor,
                  borderColor: filterColor,
                },
              ]}
              onPress={() => toggleFilter(filter)}
              activeOpacity={0.7}
            >
              <Text
                style={[
                  styles.filterText,
                  isSelected && styles.filterTextSelected,
                ]}
              >
                {filter}
              </Text>
            </TouchableOpacity>
          );
        })}
      </ScrollView>
      
      {selectedFilters.length === 0 && (
        <Text style={styles.noFiltersText}>
          Select at least one event type to see results
        </Text>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#ffffff',
    paddingVertical: 15,
    paddingHorizontal: 20,
    borderBottomWidth: 1,
    borderBottomColor: '#e0e0e0',
  },
  title: {
    fontSize: 16,
    fontWeight: '600',
    color: '#333333',
    marginBottom: 12,
  },
  scrollContainer: {
    paddingRight: 20,
  },
  filterButton: {
    paddingHorizontal: 20,
    paddingVertical: 10,
    marginRight: 12,
    borderRadius: 25,
    borderWidth: 2,
    borderColor: '#e0e0e0',
    backgroundColor: '#ffffff',
    minWidth: 80,
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: '#000000',
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 2,
  },
  filterText: {
    fontSize: 14,
    fontWeight: '600',
    color: '#666666',
  },
  filterTextSelected: {
    color: '#ffffff',
  },
  noFiltersText: {
    fontSize: 12,
    color: '#999999',
    fontStyle: 'italic',
    marginTop: 8,
    textAlign: 'center',
  },
});

export default FilterComponent;
