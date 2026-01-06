import { StyleSheet, Text, View } from "react-native";
import { Habit } from "../types/interfaces";
import WeekCalendar from "./WeekCalendar";

interface HabitCardProps {
  habit: Habit;
  weekDates: Date[];
  completedDates: Date[];
  progress: number;
}

const WEEKDAY_LABELS = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];

const formatWeekDays = (weekDays: number[]): string => {
  if (weekDays.length === 0) {
    return "No days selected";
  }
  if (weekDays.length === 7) {
    return "Every day";
  }
  const dayLabels = weekDays
    .sort((a, b) => a - b)
    .map((day) => WEEKDAY_LABELS[day]);
  return dayLabels.join(", ");
};

export default function HabitCard({
  habit,
  weekDates,
  completedDates,
  progress,
}: HabitCardProps) {
  return (
    <View style={styles.card}>
      <View style={styles.header}>
        <Text style={styles.habitName}>{habit.name}</Text>
        <Text style={styles.frequency}>
          {formatWeekDays(habit.weekDays)}
        </Text>
      </View>

      <WeekCalendar weekDates={weekDates} completedDates={completedDates} />

      <View style={styles.progressContainer}>
        <View style={styles.progressBar}>
          <View
            style={[styles.progressFill, { width: `${progress}%` }]}
          />
        </View>
        <Text style={styles.progressText}>{progress}%</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: "#fff",
    borderRadius: 12,
    padding: 16,
    marginBottom: 12,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 12,
  },
  habitName: {
    fontSize: 18,
    fontWeight: "600",
    color: "#333",
    flex: 1,
  },
  frequency: {
    fontSize: 14,
    color: "#007AFF",
    fontWeight: "500",
  },
  progressContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 12,
  },
  progressBar: {
    flex: 1,
    height: 8,
    backgroundColor: "#f0f0f0",
    borderRadius: 4,
    overflow: "hidden",
    marginRight: 10,
  },
  progressFill: {
    height: "100%",
    backgroundColor: "#34C759",
    borderRadius: 4,
  },
  progressText: {
    fontSize: 14,
    fontWeight: "600",
    color: "#333",
    width: 45,
    textAlign: "right",
  },
});

