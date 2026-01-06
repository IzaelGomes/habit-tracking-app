import { Ionicons } from "@expo/vector-icons";
import { useState } from "react";
import { ActivityIndicator, Alert, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import CreateHabitModal from "../../components/CreateHabitModal";
import { useAuth } from "../../context/AuthContext";
import { useCreateHabit } from "../../services/hooks/useCreatehabit";
import { useHabitsCount } from "../../services/hooks/useHabitsCount";

export default function DashboardScreen() {
  const { user } = useAuth();
  const { data: totalHabits, isLoading } = useHabitsCount();
  const [modalVisible, setModalVisible] = useState(false);
  const createHabitMutation = useCreateHabit();

  const currentDate = new Date();
  const monthName = currentDate.toLocaleDateString("en-US", {
    month: "long",
    year: "numeric",
  });

  const handleCreateHabit = (name: string, weekDays: number[]) => {
    createHabitMutation.mutate(
      { name, weekDays },
      {
        onSuccess: () => {
          Alert.alert("Success", "Habit created successfully!");
          setModalVisible(false);
        },
        onError: (error: any) => {
          Alert.alert("Error", error?.response?.data?.message || "Failed to create habit");
        },
      }
    );
  };

  return (
    <View style={styles.container}>
      <View style={styles.content}>
        <View style={styles.headerSection}>
          <Text style={styles.greeting}>Hello, {user?.username || "User"}!</Text>
          <Text style={styles.subtitle}>Track your habits</Text>
        </View>

        {/* Stats Card */}
        <View style={styles.statsCard}>
          <View style={styles.statsHeader}>
            <Ionicons name="calendar" size={32} color="#007AFF" />
            <Text style={styles.monthText}>{monthName}</Text>
          </View>

          <View style={styles.statsBody}>
            {isLoading ? (
              <ActivityIndicator size="large" color="#007AFF" />
            ) : (
              <>
                <Text style={styles.statsNumber}>{totalHabits ?? 0}</Text>
                <Text style={styles.statsLabel}>
                  Total Habits
                </Text>
              </>
            )}
          </View>

          <View style={styles.statsFooter}>
            <Ionicons name="trophy" size={20} color="#34C759" />
            <Text style={styles.statsFooterText}>
              {!isLoading && (totalHabits === 0 || totalHabits === undefined)
                ? "Start tracking your habits today!"
                : "Keep up the great work!"}
            </Text>
          </View>
        </View>
      </View>

      <CreateHabitModal
        visible={modalVisible}
        onClose={() => setModalVisible(false)}
        onSave={handleCreateHabit}
      />

      <TouchableOpacity
        style={styles.fab}
        onPress={() => setModalVisible(true)}
        activeOpacity={0.8}
      >
        <Ionicons name="add" size={32} color="#fff" />
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f5f5f5",
  },
  content: {
    padding: 20,
    paddingTop: 40,
  },
  headerSection: {
    marginBottom: 24,
  },
  greeting: {
    fontSize: 28,
    fontWeight: "bold",
    color: "#333",
    marginBottom: 4,
  },
  subtitle: {
    fontSize: 16,
    color: "#666",
  },
  statsCard: {
    backgroundColor: "#fff",
    borderRadius: 16,
    padding: 24,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 5,
  },
  statsHeader: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 20,
  },
  monthText: {
    fontSize: 18,
    fontWeight: "600",
    color: "#333",
    marginLeft: 12,
  },
  statsBody: {
    alignItems: "center",
    paddingVertical: 20,
    borderTopWidth: 1,
    borderBottomWidth: 1,
    borderColor: "#f0f0f0",
    minHeight: 120,
    justifyContent: "center",
  },
  statsNumber: {
    fontSize: 64,
    fontWeight: "bold",
    color: "#007AFF",
    marginBottom: 8,
  },
  statsLabel: {
    fontSize: 16,
    color: "#666",
    textAlign: "center",
  },
  statsFooter: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    marginTop: 16,
  },
  statsFooterText: {
    fontSize: 14,
    color: "#666",
    marginLeft: 8,
  },
  fab: {
    position: "absolute",
    bottom: 20,
    right: 20,
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: "#007AFF",
    justifyContent: "center",
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 6,
    elevation: 8,
  },
});
