import AsyncStorage from "@react-native-async-storage/async-storage";
import React, { useEffect, useState } from "react";
import {
  Modal,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";

export default function HomeScreen() {
  const [userName, setUserName] = useState("User");
  const [tasks, setTasks] = useState([
    {
      id: 1,
      title: "Progress Quarterly Sales Report",
      date: "2025-01-05",
      time: "09:00",
      priority: "high",
      completed: false,
    },
    {
      id: 2,
      title: "Call the parents",
      date: "2025-01-05",
      time: "14:00",
      priority: "medium",
      completed: false,
    },
    {
      id: 3,
      title: "Submit presentation",
      date: "2025-01-05",
      time: "16:30",
      priority: "low",
      completed: true,
    },
  ]);

  const [modalVisible, setModalVisible] = useState(false);
  const [showCalendar, setShowCalendar] = useState(false);
  const [newTask, setNewTask] = useState({
    title: "",
    date: "2025-01-05",
    time: "",
    priority: "medium",
  });

  const [selectedDate, setSelectedDate] = useState(new Date(2025, 0, 5));

  // Load user data when component mounts
  useEffect(() => {
    loadUserData();
  }, []);

  const loadUserData = async () => {
    try {
      const name = await AsyncStorage.getItem("userName");
      if (name) {
        setUserName(name);
      }
    } catch (error) {
      console.error("Error loading user data:", error);
    }
  };

  const toggleTaskComplete = (id: number) => {
    setTasks(
      tasks.map((task) =>
        task.id === id ? { ...task, completed: !task.completed } : task
      )
    );
  };

  const addTask = () => {
    if (newTask.title.trim()) {
      setTasks([
        ...tasks,
        {
          id: Date.now(),
          ...newTask,
          completed: false,
        },
      ]);
      setNewTask({
        title: "",
        date: "2025-01-05",
        time: "",
        priority: "medium",
      });
      setModalVisible(false);
    }
  };

  const getDaysInMonth = (date: Date) => {
    const year = date.getFullYear();
    const month = date.getMonth();
    const firstDay = new Date(year, month, 1).getDay();
    const daysInMonth = new Date(year, month + 1, 0).getDate();

    const days: (number | null)[] = [];
    for (let i = 0; i < firstDay; i++) {
      days.push(null);
    }
    for (let i = 1; i <= daysInMonth; i++) {
      days.push(i);
    }
    return days;
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString("en-US", { month: "short", day: "numeric" });
  };

  const monthNames = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];

  return (
    <SafeAreaView style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <Text style={styles.greeting}>Hi {userName}</Text>
        <View style={styles.dateSelector}>
          {["M", "T", "W", "T", "F", "S", "S"].map((day, index) => (
            <View key={index} style={styles.dayItem}>
              <Text style={styles.dayLabel}>{day}</Text>
              <Text
                style={[styles.dayNumber, index === 6 && styles.selectedDay]}
              >
                {index + 3}
              </Text>
            </View>
          ))}
        </View>
      </View>

      {/* Today's Events */}
      <View style={styles.content}>
        <Text style={styles.sectionTitle}>Today&apos;s events</Text>

        <ScrollView
          style={styles.taskList}
          showsVerticalScrollIndicator={false}
        >
          {tasks.map((task) => (
            <View key={task.id} style={styles.taskCard}>
              <View style={styles.taskLeft}>
                <TouchableOpacity
                  style={[
                    styles.checkbox,
                    task.completed && styles.checkboxCompleted,
                  ]}
                  onPress={() => toggleTaskComplete(task.id)}
                >
                  {task.completed && <Text style={styles.checkmark}>✓</Text>}
                </TouchableOpacity>
                <View style={styles.taskInfo}>
                  <Text
                    style={[
                      styles.taskTitle,
                      task.completed && styles.taskTitleCompleted,
                    ]}
                  >
                    {task.title}
                  </Text>
                  <Text style={styles.taskTime}>
                    {formatDate(task.date)} at {task.time}
                  </Text>
                </View>
              </View>
              <View
                style={[
                  styles.priorityBadge,
                  task.priority === "high" && styles.priorityHigh,
                  task.priority === "medium" && styles.priorityMedium,
                  task.priority === "low" && styles.priorityLow,
                ]}
              />
            </View>
          ))}
        </ScrollView>
      </View>

      {/* Add Button */}
      <TouchableOpacity
        style={styles.addButton}
        onPress={() => setModalVisible(true)}
      >
        <Text style={styles.addButtonText}>+</Text>
      </TouchableOpacity>

      {/* Create Task Modal */}
      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => setModalVisible(false)}
      >
        <View style={styles.modalOverlay}>
          <View style={styles.modalContent}>
            <View style={styles.modalHeader}>
              <TouchableOpacity onPress={() => setModalVisible(false)}>
                <Text style={styles.cancelButton}>Cancel</Text>
              </TouchableOpacity>
              <Text style={styles.modalTitle}>New Event</Text>
              <TouchableOpacity onPress={addTask}>
                <Text style={styles.addTextButton}>Add</Text>
              </TouchableOpacity>
            </View>

            <TextInput
              style={styles.input}
              placeholder="Unnamed Event"
              value={newTask.title}
              onChangeText={(text) => setNewTask({ ...newTask, title: text })}
              placeholderTextColor="#999"
            />

            {/* Date and Period */}
            <View style={styles.row}>
              <View style={styles.rowItem}>
                <Text style={styles.label}>Date</Text>
                <TouchableOpacity
                  style={styles.valueButton}
                  onPress={() => setShowCalendar(!showCalendar)}
                >
                  <Text style={styles.valueText}>Today at 2025</Text>
                </TouchableOpacity>
              </View>
              <View style={styles.rowItem}>
                <Text style={styles.label}>Period</Text>
                <TouchableOpacity style={styles.valueButton}>
                  <Text style={styles.valueText}>None</Text>
                </TouchableOpacity>
              </View>
            </View>

            {/* Calendar */}
            {showCalendar && (
              <View style={styles.calendar}>
                <View style={styles.calendarHeader}>
                  <TouchableOpacity>
                    <Text style={styles.calendarNav}>{"<"}</Text>
                  </TouchableOpacity>
                  <Text style={styles.calendarMonth}>
                    {monthNames[selectedDate.getMonth()]}{" "}
                    {selectedDate.getFullYear()}
                  </Text>
                  <TouchableOpacity>
                    <Text style={styles.calendarNav}>{">"}</Text>
                  </TouchableOpacity>
                </View>

                <View style={styles.calendarGrid}>
                  {["S", "M", "T", "W", "T", "F", "S"].map((day, i) => (
                    <Text key={i} style={styles.calendarDayLabel}>
                      {day}
                    </Text>
                  ))}
                  {getDaysInMonth(selectedDate).map((day, index) => (
                    <TouchableOpacity
                      key={index}
                      style={[
                        styles.calendarDay,
                        day === 5 && styles.calendarDaySelected,
                      ]}
                      disabled={!day}
                    >
                      <Text
                        style={[
                          styles.calendarDayText,
                          day === 5 && styles.calendarDayTextSelected,
                        ]}
                      >
                        {day || ""}
                      </Text>
                    </TouchableOpacity>
                  ))}
                </View>
              </View>
            )}

            {/* Priority */}
            <View style={styles.prioritySection}>
              <Text style={styles.label}>Priority</Text>
              <View style={styles.priorityButtons}>
                {["low", "medium", "high"].map((priority) => (
                  <TouchableOpacity
                    key={priority}
                    style={[
                      styles.priorityButton,
                      newTask.priority === priority &&
                        styles.priorityButtonActive,
                    ]}
                    onPress={() => setNewTask({ ...newTask, priority })}
                  >
                    <Text
                      style={[
                        styles.priorityButtonText,
                        newTask.priority === priority &&
                          styles.priorityButtonTextActive,
                      ]}
                    >
                      {priority.charAt(0).toUpperCase() + priority.slice(1)}
                    </Text>
                  </TouchableOpacity>
                ))}
              </View>
            </View>
          </View>
        </View>
      </Modal>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F8F9FA",
  },
  header: {
    backgroundColor: "#FFFFFF",
    paddingHorizontal: 20,
    paddingTop: 20,
    paddingBottom: 15,
  },
  greeting: {
    fontSize: 24,
    fontWeight: "600",
    marginBottom: 20,
    color: "#000",
  },
  dateSelector: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  dayItem: {
    alignItems: "center",
  },
  dayLabel: {
    fontSize: 12,
    color: "#999",
    marginBottom: 5,
  },
  dayNumber: {
    fontSize: 16,
    color: "#333",
  },
  selectedDay: {
    color: "#8B5CF6",
    fontWeight: "bold",
  },
  content: {
    flex: 1,
    paddingHorizontal: 20,
    paddingTop: 20,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: "600",
    marginBottom: 15,
    color: "#000",
  },
  taskList: {
    flex: 1,
  },
  taskCard: {
    backgroundColor: "#FFFFFF",
    borderRadius: 12,
    padding: 15,
    marginBottom: 10,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 2,
    elevation: 2,
  },
  taskLeft: {
    flexDirection: "row",
    alignItems: "center",
    flex: 1,
  },
  checkbox: {
    width: 24,
    height: 24,
    borderRadius: 12,
    borderWidth: 2,
    borderColor: "#DDD",
    marginRight: 12,
    alignItems: "center",
    justifyContent: "center",
  },
  checkboxCompleted: {
    backgroundColor: "#8B5CF6",
    borderColor: "#8B5CF6",
  },
  checkmark: {
    color: "#FFFFFF",
    fontSize: 16,
    fontWeight: "bold",
  },
  taskInfo: {
    flex: 1,
  },
  taskTitle: {
    fontSize: 16,
    color: "#333",
    marginBottom: 4,
  },
  taskTitleCompleted: {
    textDecorationLine: "line-through",
    color: "#999",
  },
  taskTime: {
    fontSize: 12,
    color: "#999",
  },
  priorityBadge: {
    width: 8,
    height: 8,
    borderRadius: 4,
  },
  priorityHigh: {
    backgroundColor: "#EF4444",
  },
  priorityMedium: {
    backgroundColor: "#F59E0B",
  },
  priorityLow: {
    backgroundColor: "#10B981",
  },
  addButton: {
    position: "absolute",
    bottom: 100,
    right: 20,
    width: 56,
    height: 56,
    borderRadius: 28,
    backgroundColor: "#8B5CF6",
    alignItems: "center",
    justifyContent: "center",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  addButtonText: {
    color: "#FFFFFF",
    fontSize: 32,
    fontWeight: "300",
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: "rgba(0, 0, 0, 0.5)",
    justifyContent: "flex-end",
  },
  modalContent: {
    backgroundColor: "#FFFFFF",
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    padding: 20,
    minHeight: "60%",
  },
  modalHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 20,
  },
  cancelButton: {
    color: "#8B5CF6",
    fontSize: 16,
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: "600",
    color: "#000",
  },
  addTextButton: {
    color: "#8B5CF6",
    fontSize: 16,
    fontWeight: "600",
  },
  input: {
    borderBottomWidth: 1,
    borderBottomColor: "#E5E7EB",
    paddingVertical: 12,
    fontSize: 16,
    marginBottom: 20,
    color: "#000",
  },
  row: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 20,
  },
  rowItem: {
    flex: 1,
    marginRight: 10,
  },
  label: {
    fontSize: 14,
    color: "#666",
    marginBottom: 8,
  },
  valueButton: {
    backgroundColor: "#F3F4F6",
    padding: 12,
    borderRadius: 8,
  },
  valueText: {
    fontSize: 14,
    color: "#333",
  },
  calendar: {
    marginBottom: 20,
  },
  calendarHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 15,
    paddingHorizontal: 10,
  },
  calendarNav: {
    fontSize: 18,
    color: "#8B5CF6",
    fontWeight: "600",
  },
  calendarMonth: {
    fontSize: 16,
    fontWeight: "600",
    color: "#000",
  },
  calendarGrid: {
    flexDirection: "row",
    flexWrap: "wrap",
  },
  calendarDayLabel: {
    width: "14.28%",
    textAlign: "center",
    fontSize: 12,
    color: "#999",
    marginBottom: 10,
    fontWeight: "600",
  },
  calendarDay: {
    width: "14.28%",
    aspectRatio: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  calendarDaySelected: {
    backgroundColor: "#8B5CF6",
    borderRadius: 20,
  },
  calendarDayText: {
    fontSize: 14,
    color: "#333",
  },
  calendarDayTextSelected: {
    color: "#FFFFFF",
    fontWeight: "bold",
  },
  prioritySection: {
    marginBottom: 20,
  },
  priorityButtons: {
    flexDirection: "row",
    gap: 10,
  },
  priorityButton: {
    flex: 1,
    padding: 12,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: "#E5E7EB",
    alignItems: "center",
  },
  priorityButtonActive: {
    backgroundColor: "#8B5CF6",
    borderColor: "#8B5CF6",
  },
  priorityButtonText: {
    fontSize: 14,
    color: "#666",
  },
  priorityButtonTextActive: {
    color: "#FFFFFF",
    fontWeight: "600",
  },
});
