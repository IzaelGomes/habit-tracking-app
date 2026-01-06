import { Ionicons } from "@expo/vector-icons";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";

interface CheckboxItemProps {
  label: string;
  checked: boolean;
  onToggle: () => void;
  subtitle?: string;
}

export default function CheckboxItem({
  label,
  checked,
  onToggle,
  subtitle,
}: CheckboxItemProps) {
  return (
    <TouchableOpacity style={styles.container} onPress={onToggle}>
      <View
        style={[styles.checkbox, checked && styles.checkboxChecked]}
      >
        {checked && <Ionicons name="checkmark" size={20} color="#fff" />}
      </View>
      <View style={styles.textContainer}>
        <Text style={[styles.label, checked && styles.labelChecked]}>
          {label}
        </Text>
        {subtitle && <Text style={styles.subtitle}>{subtitle}</Text>}
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#fff",
    padding: 16,
    borderRadius: 12,
    marginBottom: 10,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 2,
  },
  checkbox: {
    width: 28,
    height: 28,
    borderRadius: 14,
    borderWidth: 2,
    borderColor: "#ddd",
    justifyContent: "center",
    alignItems: "center",
    marginRight: 12,
  },
  checkboxChecked: {
    backgroundColor: "#34C759",
    borderColor: "#34C759",
  },
  textContainer: {
    flex: 1,
  },
  label: {
    fontSize: 16,
    color: "#333",
    fontWeight: "500",
  },
  labelChecked: {
    color: "#999",
    textDecorationLine: "line-through",
  },
  subtitle: {
    fontSize: 12,
    color: "#999",
    marginTop: 2,
  },
});

