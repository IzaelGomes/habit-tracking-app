import React from 'react';
import { ActivityIndicator, Dimensions, StyleSheet, Text, View } from 'react-native';
import { ProgressChart } from 'react-native-chart-kit';
import { TodayStats } from '../../services/stats';
import { chartConfig } from './chartConfig';

const screenWidth = Dimensions.get('window').width;

interface TodayProgressRingProps {
  data: TodayStats | undefined;
  isLoading?: boolean;
}

export default function TodayProgressRing({ data, isLoading }: TodayProgressRingProps) {
  if (isLoading) {
    return (
      <View style={styles.container}>
        <View style={styles.header}>
          <Text style={styles.title}>Today's Progress</Text>
        </View>
        <View style={styles.loadingContainer}>
          <ActivityIndicator size="large" color="#007AFF" />
        </View>
      </View>
    );
  }

  if (!data) {
    return (
      <View style={styles.container}>
        <View style={styles.header}>
          <Text style={styles.title}>Today's Progress</Text>
        </View>
        <View style={styles.emptyState}>
          <Text style={styles.emptyText}>No habits scheduled today</Text>
        </View>
      </View>
    );
  }

  const progressData = {
    labels: ['Today'],
    data: [data.percentage / 100], // Convert percentage to 0-1 range
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Today's Progress</Text>
        <Text style={styles.subtitle}>
          {data.completed} of {data.total} habits completed
        </Text>
      </View>
      <View style={styles.chartContainer}>
        <ProgressChart
          data={progressData}
          width={screenWidth - 80}
          height={180}
          strokeWidth={16}
          radius={50}
          chartConfig={{
            ...chartConfig,
            color: (opacity = 1) => `rgba(0, 122, 255, ${opacity})`,
          }}
          hideLegend={true}
          style={styles.chart}
        />
        <View style={styles.percentageOverlay}>
          <Text style={styles.percentageText}>{data.percentage}%</Text>
          <Text style={styles.percentageLabel}>Complete</Text>
        </View>
      </View>
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
  chartContainer: {
    alignItems: 'center',
    position: 'relative',
  },
  chart: {
    borderRadius: 16,
  },
  percentageOverlay: {
    position: 'absolute',
    top: '50%',
    left: '52%',
    transform: [{ translateX: -40 }, { translateY: -30 }],
    alignItems: 'center',
  },
  percentageText: {
    fontSize: 23,
    fontWeight: 'bold',
    color: '#007AFF',
  },
  percentageLabel: {
    fontSize: 14,
    color: '#666',
    marginTop: 4,
  },
  loadingContainer: {
    height: 180,
    justifyContent: 'center',
    alignItems: 'center',
  },
  emptyState: {
    height: 180,
    justifyContent: 'center',
    alignItems: 'center',
  },
  emptyText: {
    fontSize: 16,
    color: '#999',
  },
});
