import { Ionicons } from "@expo/vector-icons";
import { useState } from "react";
import {
  KeyboardAvoidingView,
  Modal,
  Platform,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";

interface CreateHabitModalProps {
  visible: boolean;
  onClose: () => void;
  onSave: (name: string, weekDays: number[]) => void;
}

const WEEKDAYS = [
  { label: "Mon", value: 0 },
  { label: "Tue", value: 1 },
  { label: "Wed", value: 2 },
  { label: "Thu", value: 3 },
  { label: "Fri", value: 4 },
  { label: "Sat", value: 5 },
  { label: "Sun", value: 6 },
];

export default function CreateHabitModal({
  visible,
  onClose,
  onSave,
}: CreateHabitModalProps) {
  const [habitName, setHabitName] = useState("");
  const [selectedWeekDays, setSelectedWeekDays] = useState<number[]>([]);

  const toggleWeekDay = (dayValue: number) => {
    setSelectedWeekDays((prev) =>
      prev.includes(dayValue)
        ? prev.filter((day) => day !== dayValue)
        : [...prev, dayValue].sort((a, b) => a - b)
    );
  };

  const handleSave = () => {
    if (habitName.trim() && selectedWeekDays.length > 0) {
      onSave(habitName.trim(), selectedWeekDays);
      setHabitName("");
      setSelectedWeekDays([]);
      onClose();
    }
  };

  const handleCancel = () => {
    setHabitName("");
    setSelectedWeekDays([]);
    onClose();
  };

  return (
    <Modal
      visible={visible}
      animationType="slide"
      transparent={true}
      onRequestClose={handleCancel}
    >
      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        style={styles.overlay}
      >
        <View style={styles.modalContainer}>
          <View style={styles.header}>
            <Text style={styles.title}>Create New Habit</Text>
            <TouchableOpacity onPress={handleCancel}>
              <Ionicons name="close" size={28} color="#333" />
            </TouchableOpacity>
          </View>

          <View style={styles.content}>
            <Text style={styles.label}>Habit Name</Text>
            <TextInput
              style={styles.input}
              placeholder="e.g., Exercise, Read, Meditate"
              value={habitName}
              onChangeText={setHabitName}
              placeholderTextColor="#999"
            />

            <Text style={styles.label}>Select Days</Text>
            <View style={styles.weekdaysContainer}>
              {WEEKDAYS.map((day) => {
                const isSelected = selectedWeekDays.includes(day.value);
                return (
                  <TouchableOpacity
                    key={day.value}
                    style={[
                      styles.weekdayButton,
                      isSelected && styles.weekdayButtonSelected,
                    ]}
                    onPress={() => toggleWeekDay(day.value)}
                  >
                    <Text
                      style={[
                        styles.weekdayText,
                        isSelected && styles.weekdayTextSelected,
                      ]}
                    >
                      {day.label}
                    </Text>
                  </TouchableOpacity>
                );
              })}
            </View>

            <View style={styles.buttonContainer}>
              <TouchableOpacity
                style={[styles.button, styles.cancelButton]}
                onPress={handleCancel}
              >
                <Text style={styles.cancelButtonText}>Cancel</Text>
              </TouchableOpacity>

              <TouchableOpacity
                style={[
                  styles.button,
                  styles.saveButton,
                  (!habitName.trim() || selectedWeekDays.length === 0) &&
                    styles.saveButtonDisabled,
                ]}
                onPress={handleSave}
                disabled={!habitName.trim() || selectedWeekDays.length === 0}
              >
                <Text style={styles.saveButtonText}>Save</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </KeyboardAvoidingView>
    </Modal>
  );
}

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    backgroundColor: "rgba(0, 0, 0, 0.5)",
    justifyContent: "flex-end",
  },
  modalContainer: {
    backgroundColor: "#fff",
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    paddingBottom: 20,
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    padding: 20,
    borderBottomWidth: 1,
    borderBottomColor: "#f0f0f0",
  },
  title: {
    fontSize: 20,
    fontWeight: "600",
    color: "#333",
  },
  content: {
    padding: 20,
  },
  label: {
    fontSize: 16,
    fontWeight: "500",
    color: "#333",
    marginBottom: 8,
  },
  input: {
    backgroundColor: "#f5f5f5",
    borderRadius: 8,
    padding: 15,
    fontSize: 16,
    marginBottom: 20,
  },
  weekdaysContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 30,
  },
  weekdayButton: {
    flex: 1,
    height: 44,
    borderRadius: 8,
    backgroundColor: "#f5f5f5",
    justifyContent: "center",
    alignItems: "center",
    borderWidth: 2,
    borderColor: "#f5f5f5",
    marginHorizontal: 2,
  },
  weekdayButtonSelected: {
    backgroundColor: "#007AFF",
    borderColor: "#007AFF",
  },
  weekdayText: {
    fontSize: 14,
    fontWeight: "600",
    color: "#666",
  },
  weekdayTextSelected: {
    color: "#fff",
  },
  buttonContainer: {
    flexDirection: "row",
    gap: 12,
  },
  button: {
    flex: 1,
    padding: 15,
    borderRadius: 8,
    alignItems: "center",
  },
  cancelButton: {
    backgroundColor: "#f5f5f5",
  },
  cancelButtonText: {
    color: "#333",
    fontSize: 16,
    fontWeight: "600",
  },
  saveButton: {
    backgroundColor: "#007AFF",
  },
  saveButtonDisabled: {
    backgroundColor: "#ccc",
  },
  saveButtonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "600",
  },
});

