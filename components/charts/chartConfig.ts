import { ChartConfig } from 'react-native-chart-kit/dist/HelperTypes';

export const chartConfig: ChartConfig = {
  backgroundColor: '#fff',
  backgroundGradientFrom: '#fff',
  backgroundGradientTo: '#fff',
  decimalPlaces: 0,
  color: (opacity = 1) => `rgba(0, 122, 255, ${opacity})`, // #007AFF
  labelColor: (opacity = 1) => `rgba(51, 51, 51, ${opacity})`, // #333
  style: {
    borderRadius: 16,
  },
  propsForBackgroundLines: {
    strokeDasharray: '', // solid lines
    stroke: '#f0f0f0',
    strokeWidth: 1,
  },
  propsForLabels: {
    fontSize: 12,
  },
};
