import React from 'react';
import { ActivityIndicator, Dimensions, StyleSheet, Text, View } from 'react-native';
import { BarChart } from 'react-native-chart-kit';
import { TopHabit } from '../../services/stats';
import { chartConfig } from './chartConfig';

const screenWidth = Dimensions.get('window').width;

interface TopHabitsChartProps {
  data: TopHabit[] | undefined;
  isLoading?: boolean;
}

export default function TopHabitsChart({ data, isLoading }: TopHabitsChartProps) {
  if (isLoading) {
    return (
      <View style={styles.container}>
        <View style={styles.header}>
          <Text style={styles.title}>Top Habits</Text>
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
          <Text style={styles.title}>Top Habits</Text>
        </View>
        <View style={styles.emptyState}>
          <Text style={styles.emptyText}>No habit data available yet</Text>
          <Text style={styles.emptySubtext}>Start tracking your habits to see your top performers</Text>
        </View>
      </View>
    );
  }

  const chartData = {
    labels: data.map(h => h.name.length > 10 ? h.name.substring(0, 10) + '...' : h.name),
    datasets: [
      {
        data: data.map(h => h.completionRate),
      },
    ],
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Top Habits</Text>
        <Text style={styles.subtitle}>Best performing habits (last 30 days)</Text>
      </View>
      <BarChart
        data={chartData}
        width={screenWidth - 40}
        height={220}
        chartConfig={chartConfig}
        style={styles.chart}
        yAxisSuffix="%"
        fromZero={true}
        showValuesOnTopOfBars={true}
        withInnerLines={true}
        segments={4}
        yAxisLabel=""
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#fff',
    borderRadius: 16,
    padding: 20,
    marginTop: 20,
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
    marginLeft: -15,
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
