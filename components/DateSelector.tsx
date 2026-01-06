import { isTodayDate } from "@/utils/dateHelpers";
import { Ionicons } from "@expo/vector-icons";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";

interface DateSelectorProps {
  selectedDate: Date;
  onPreviousDay: () => void;
  onNextDay: () => void;
  onTodayPress: () => void;
  showTodayButton: boolean;
  completedCount?: number;
  totalCount?: number;
}

export default function DateSelector({
  selectedDate,
  onPreviousDay,
  onNextDay,
  onTodayPress,
  showTodayButton,
  completedCount = 0,
  totalCount = 0,
}: DateSelectorProps) {

  function formatDisplayDate(date: Date): string {
    if (isTodayDate(date)) {
      return "Today";
    }

    const yesterday = new Date();
    yesterday.setDate(yesterday.getDate() - 1);
    if (
      date.getDate() === yesterday.getDate() &&
      date.getMonth() === yesterday.getMonth() &&
      date.getFullYear() === yesterday.getFullYear()
    ) {
      return "Yesterday";
    }

    return date.toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
      year: "numeric",
    });
  }

  function getWeekdayName(date: Date): string {
    return date.toLocaleDateString("en-US", { weekday: "long" });
  }

  function isFutureDate(date: Date): boolean {
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    const checkDate = new Date(date);
    checkDate.setHours(0, 0, 0, 0);
    return checkDate > today;
  }

  const isNextDisabled = isFutureDate(
    new Date(selectedDate.getTime() + 24 * 60 * 60 * 1000)
  );

  const showSummary = totalCount > 0;

  return (
    <>
      {/* Date Selector */}
      <View style={styles.dateSelector}>
        <TouchableOpacity
          style={styles.dateButton}
          onPress={onPreviousDay}
          activeOpacity={0.7}
        >
          <Ionicons name="chevron-back" size={24} color="#007AFF" />
        </TouchableOpacity>

        <View style={styles.dateDisplay}>
          <Text style={styles.dateText}>{formatDisplayDate(selectedDate)}</Text>
          <Text style={styles.dateSubtext}>{getWeekdayName(selectedDate)}</Text>
        </View>

        <TouchableOpacity
          style={[styles.dateButton, isNextDisabled && styles.dateButtonDisabled]}
          onPress={onNextDay}
          disabled={isNextDisabled}
          activeOpacity={0.7}
        >
          <Ionicons
            name="chevron-forward"
            size={24}
            color={isNextDisabled ? "#ccc" : "#007AFF"}
          />
        </TouchableOpacity>
      </View>

      {/* Jump to Today Button */}
      {showTodayButton && (
        <TouchableOpacity style={styles.todayButton} onPress={onTodayPress}>
          <Ionicons name="today" size={16} color="#007AFF" />
          <Text style={styles.todayButtonText}>Jump to Today</Text>
        </TouchableOpacity>
      )}

      {/* Completion Summary */}
      {showSummary && (
        <View style={styles.summaryContainer}>
          <Text style={styles.summaryText}>
            {completedCount} of {totalCount} completed
          </Text>
          <View style={styles.progressBar}>
            <View
              style={[
                styles.progressFill,
                {
                  width: `${totalCount > 0 ? (completedCount / totalCount) * 100 : 0}%`,
                },
              ]}
            />
          </View>
        </View>
      )}
    </>
  );
}

const styles = StyleSheet.create({
  dateSelector: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    padding: 16,
    backgroundColor: "#fff",
    borderBottomWidth: 1,
    borderBottomColor: "#f0f0f0",
  },
  dateButton: {
    padding: 8,
  },
  dateButtonDisabled: {
    opacity: 0.5,
  },
  dateDisplay: {
    alignItems: "center",
    flex: 1,
  },
  dateText: {
    fontSize: 20,
    fontWeight: "600",
    color: "#333",
  },
  dateSubtext: {
    fontSize: 14,
    color: "#666",
    marginTop: 2,
  },
  todayButton: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    padding: 12,
    backgroundColor: "#E3F2FD",
    gap: 6,
  },
  todayButtonText: {
    fontSize: 14,
    fontWeight: "600",
    color: "#007AFF",
  },
  summaryContainer: {
    padding: 16,
    backgroundColor: "#fff",
    borderBottomWidth: 1,
    borderBottomColor: "#f0f0f0",
  },
  summaryText: {
    fontSize: 14,
    color: "#666",
    marginBottom: 8,
    textAlign: "center",
  },
  progressBar: {
    height: 8,
    backgroundColor: "#f0f0f0",
    borderRadius: 4,
    overflow: "hidden",
  },
  progressFill: {
    height: "100%",
    backgroundColor: "#34C759",
    borderRadius: 4,
  },
});

