import React from 'react';
import { ActivityIndicator, Dimensions, ScrollView, StyleSheet, Text, View } from 'react-native';
import { ContributionGraph } from 'react-native-chart-kit';
import { HeatmapData } from '../../services/stats';
import { chartConfig } from './chartConfig';

const screenWidth = Dimensions.get('window').width;

interface HabitHeatmapProps {
  data: HeatmapData[] | undefined;
  isLoading?: boolean;
}

export default function HabitHeatmap({ data, isLoading }: HabitHeatmapProps) {
  if (isLoading) {
    return (
      <View style={styles.container}>
        <View style={styles.header}>
          <Text style={styles.title}>Activity Heatmap</Text>
        </View>
        <View style={styles.loadingContainer}>
          <ActivityIndicator size="large" color="#007AFF" />
        </View>
      </View>
    );
  }

  if (!data || data.length === 0) {
    return (
      <View style={styles.container}>
        <View style={styles.header}>
          <Text style={styles.title}>Activity Heatmap</Text>
        </View>
        <View style={styles.emptyState}>
          <Text style={styles.emptyText}>No activity data yet</Text>
          <Text style={styles.emptySubtext}>Complete habits to see your activity pattern</Text>
        </View>
      </View>
    );
  }

  // Convert data to format expected by ContributionGraph
  const heatmapValues = data.map(d => ({
    date: d.date,
    count: d.count,
  }));

  // Get the date range
  const today = new Date();
  const endDate = new Date(today);

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Activity Heatmap</Text>
        <Text style={styles.subtitle}>Last 90 days habit completion</Text>
      </View>
      <ScrollView horizontal showsHorizontalScrollIndicator={false}>
        <ContributionGraph
          values={heatmapValues}
          endDate={endDate}
          numDays={90}
          width={screenWidth * 1.5}
          height={220}
          chartConfig={{
            ...chartConfig,
            color: (opacity = 1) => `rgba(0, 122, 255, ${opacity})`,
          }}
          style={styles.chart}
        />
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#fff',
    borderRadius: 16,
    padding: 20,
    marginTop: 20,
    marginBottom: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 5,
  },
  header: {
    marginBottom: 16,
  },
  title: {
    fontSize: 18,
    fontWeight: '600',
    color: '#333',
    marginBottom: 4,
  },
  subtitle: {
    fontSize: 14,
    color: '#666',
  },
  chart: {
    borderRadius: 16,
  },
  loadingContainer: {
    height: 220,
    justifyContent: 'center',
    alignItems: 'center',
  },
  emptyState: {
    height: 220,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 20,
  },
  emptyText: {
    fontSize: 16,
    color: '#999',
    marginBottom: 8,
  },
  emptySubtext: {
    fontSize: 14,
    color: '#bbb',
    textAlign: 'center',
  },
});
