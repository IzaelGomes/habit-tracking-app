import { Ionicons } from "@expo/vector-icons";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { Habit } from "../services/habits";

interface TrackHabitCardProps {
  habit: Habit;
  onToggle: (habitId: string, currentStatus: boolean) => void;
}

export default function TrackHabitCard({ habit, onToggle }: TrackHabitCardProps) {
  const isCompleted = habit.isCompleted || false;

  return (
    <TouchableOpacity
      style={styles.habitCard}
      onPress={() => onToggle(habit.id, isCompleted)}
      activeOpacity={0.7}
    >
      <View style={[styles.checkbox, isCompleted && styles.checkboxChecked]}>
        {isCompleted && <Ionicons name="checkmark" size={20} color="#fff" />}
      </View>
      <View style={styles.habitInfo}>
        <Text style={[styles.habitName, isCompleted && styles.habitNameCompleted]}>
          {habit.name}
        </Text>
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  habitCard: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#fff",
    padding: 16,
    borderRadius: 12,
    marginBottom: 12,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  checkbox: {
    width: 28,
    height: 28,
    borderRadius: 14,
    borderWidth: 2,
    borderColor: "#007AFF",
    justifyContent: "center",
    alignItems: "center",
    marginRight: 12,
  },
  checkboxChecked: {
    backgroundColor: "#007AFF",
  },
  habitInfo: {
    flex: 1,
  },
  habitName: {
    fontSize: 16,
    fontWeight: "600",
    color: "#333",
  },
  habitNameCompleted: {
    color: "#999",
    textDecorationLine: "line-through",
  },
});

