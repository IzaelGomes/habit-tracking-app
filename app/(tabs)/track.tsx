import { getWeekdayName, isFutureDate, isTodayDate, toISODateString } from "@/utils/dateHelpers";
import { Ionicons } from "@expo/vector-icons";
import { useState } from "react";
import {
  ActivityIndicator,
  FlatList,
  StyleSheet,
  Text,
  View
} from "react-native";
import DateSelector from "../../components/DateSelector";
import TrackHabitCard from "../../components/TrackHabitCard";
import { useDailyHabits } from "../../services/hooks/useDailyHabits";
import { useToggleTracking } from "../../services/hooks/useToggleTracking";

export default function TrackScreen() {
  const [selectedDate, setSelectedDate] = useState(new Date());
  const dateStr = toISODateString(selectedDate);
  const { data, isLoading, error } = useDailyHabits(dateStr);
  const toggleTrackingMutation = useToggleTracking();

  const habits = data?.habits || [];
  const completedCount = habits.filter(h => h.isCompleted).length;
  const totalCount = habits.length;


  // Date navigation functions
  const goToPreviousDay = () => {
    const newDate = new Date(selectedDate);
    newDate.setDate(newDate.getDate() - 1);
    setSelectedDate(newDate);
  };

  const goToNextDay = () => {
    const newDate = new Date(selectedDate);
    newDate.setDate(newDate.getDate() + 1);
    if (!isFutureDate(newDate)) {
      setSelectedDate(newDate);
    }
  };

  const goToToday = () => {
    setSelectedDate(new Date());
  };

  // Toggle habit completion
  const handleToggleHabit = (habitId: string, currentStatus: boolean) => {
    toggleTrackingMutation.mutate({
      habitId,
      completedDate: dateStr,
      checked: !currentStatus,
    });
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Track Habits</Text>
        <Text style={styles.subtitle}>Mark your daily progress</Text>
      </View>

      <DateSelector
        selectedDate={selectedDate}
        onPreviousDay={goToPreviousDay}
        onNextDay={goToNextDay}
        onTodayPress={goToToday}
        showTodayButton={!isTodayDate(selectedDate)}
        completedCount={!isLoading ? completedCount : undefined}
        totalCount={!isLoading ? totalCount : undefined}
      />

        <View style={styles.content}>
          {isLoading ? (
            <View style={styles.loadingContainer}>
              <ActivityIndicator size="large" color="#007AFF" />
              <Text style={styles.loadingText}>Loading habits...</Text>
            </View>
          ) : error ? (
            <View style={styles.emptyState}>
              <Ionicons name="alert-circle" size={64} color="#999" />
              <Text style={styles.emptyStateTitle}>Error Loading Habits</Text>
              <Text style={styles.emptyStateText}>
                Please try again later
              </Text>
            </View>
          ) : habits.length === 0 ? (
            <View style={styles.emptyState}>
              <Ionicons name="calendar-outline" size={64} color="#999" />
              <Text style={styles.emptyStateTitle}>No Habits for This Day</Text>
              <Text style={styles.emptyStateText}>
                You don't have any habits scheduled for{" "}
                {getWeekdayName(selectedDate)}
              </Text>
            </View>
          ) : (
             <FlatList
              data={habits}
              renderItem={({ item }) => (
                <TrackHabitCard habit={item} onToggle={handleToggleHabit} />
              )}
              keyExtractor={(item) => item.id}
            />
          )}
        </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f5f5f5",
  },
  header: {
    padding: 20,
    paddingTop: 40,
    backgroundColor: "#fff",
    borderBottomWidth: 1,
    borderBottomColor: "#f0f0f0",
  },
  title: {
    fontSize: 28,
    fontWeight: "bold",
    color: "#333",
    marginBottom: 4,
  },
  subtitle: {
    fontSize: 16,
    color: "#666",
  },
  scrollView: {
    flex: 1,
  },
  content: {
    padding: 20,
  },
  loadingContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    paddingVertical: 60,
  },
  loadingText: {
    marginTop: 12,
    fontSize: 16,
    color: "#666",
  },
  emptyState: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    paddingVertical: 60,
  },
  emptyStateTitle: {
    fontSize: 22,
    fontWeight: "600",
    color: "#333",
    marginTop: 16,
    marginBottom: 8,
  },
  emptyStateText: {
    fontSize: 16,
    color: "#666",
    textAlign: "center",
    paddingHorizontal: 40,
  },
});
