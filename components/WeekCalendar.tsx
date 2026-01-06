import { StyleSheet, Text, View } from "react-native";
import { formatDayShort } from "../utils/dateHelpers";

interface WeekCalendarProps {
  weekDates: Date[];
  completedDates: Date[];
}

export default function WeekCalendar({
  weekDates,
  completedDates,
}: WeekCalendarProps) {
  const isCompleted = (date: Date) => {
    return completedDates.some(
      (completedDate) =>
        completedDate.toDateString() === date.toDateString()
    );
  };

  return (
    <View style={styles.container}>
      {weekDates.map((date, index) => {
        const completed = isCompleted(date);
        return (
          <View key={index} style={styles.dayContainer}>
            <Text style={styles.dayName}>{formatDayShort(date)}</Text>
            <View
              style={[
                styles.dayCircle,
                completed && styles.dayCircleCompleted,
              ]}
            >
              <Text
                style={[
                  styles.dayNumber,
                  completed && styles.dayNumberCompleted,
                ]}
              >
                {date.getDate()}
              </Text>
            </View>
          </View>
        );
      })}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingVertical: 10,
  },
  dayContainer: {
    alignItems: "center",
    flex: 1,
  },
  dayName: {
    fontSize: 12,
    color: "#666",
    marginBottom: 5,
  },
  dayCircle: {
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: "#f0f0f0",
    justifyContent: "center",
    alignItems: "center",
  },
  dayCircleCompleted: {
    backgroundColor: "#34C759",
  },
  dayNumber: {
    fontSize: 14,
    color: "#333",
    fontWeight: "500",
  },
  dayNumberCompleted: {
    color: "#fff",
    fontWeight: "600",
  },
});

