// app/(tabs)/explore.tsx
import React from "react";
import { SafeAreaView, ScrollView, StyleSheet, Text, View } from "react-native";

export default function ExploreScreen() {
  // Sample analytics data
  const stats = {
    completedToday: 8,
    totalTasks: 23,
    completionRate: 65,
    streak: 12,
  };

  const weeklyData = [
    { day: "Mon", completed: 5, total: 8 },
    { day: "Tue", completed: 7, total: 9 },
    { day: "Wed", completed: 6, total: 10 },
    { day: "Thu", completed: 8, total: 11 },
    { day: "Fri", completed: 4, total: 7 },
    { day: "Sat", completed: 3, total: 5 },
    { day: "Sun", completed: 2, total: 4 },
  ];

  const priorityStats = [
    { label: "High", count: 8, color: "#EF4444" },
    { label: "Medium", count: 12, color: "#F59E0B" },
    { label: "Low", count: 3, color: "#10B981" },
  ];

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView
        style={styles.scrollView}
        showsVerticalScrollIndicator={false}
      >
        {/* Header */}
        <View style={styles.header}>
          <Text style={styles.headerTitle}>Analytics</Text>
          <Text style={styles.headerSubtitle}>Your productivity insights</Text>
        </View>

        {/* Stats Cards */}
        <View style={styles.statsGrid}>
          <View style={styles.statCard}>
            <Text style={styles.statNumber}>{stats.completedToday}</Text>
            <Text style={styles.statLabel}>Completed Today</Text>
          </View>
          <View style={styles.statCard}>
            <Text style={styles.statNumber}>{stats.totalTasks}</Text>
            <Text style={styles.statLabel}>Total Tasks</Text>
          </View>
        </View>

        <View style={styles.statsGrid}>
          <View style={styles.statCard}>
            <Text style={styles.statNumber}>{stats.completionRate}%</Text>
            <Text style={styles.statLabel}>Completion Rate</Text>
          </View>
          <View style={styles.statCard}>
            <Text style={styles.statNumber}>{stats.streak} 🔥</Text>
            <Text style={styles.statLabel}>Day Streak</Text>
          </View>
        </View>

        {/* Weekly Progress */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Weekly Progress</Text>
          <View style={styles.chartContainer}>
            <View style={styles.chart}>
              {weeklyData.map((item, index) => {
                const percentage = (item.completed / item.total) * 100;
                return (
                  <View key={index} style={styles.barContainer}>
                    <View style={styles.barWrapper}>
                      <View
                        style={[styles.bar, { height: `${percentage}%` }]}
                      />
                    </View>
                    <Text style={styles.barLabel}>{item.day}</Text>
                    <Text style={styles.barValue}>
                      {item.completed}/{item.total}
                    </Text>
                  </View>
                );
              })}
            </View>
          </View>
        </View>

        {/* Priority Distribution */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Priority Distribution</Text>
          <View style={styles.priorityContainer}>
            {priorityStats.map((item, index) => (
              <View key={index} style={styles.priorityItem}>
                <View style={styles.priorityLeft}>
                  <View
                    style={[
                      styles.priorityDot,
                      { backgroundColor: item.color },
                    ]}
                  />
                  <Text style={styles.priorityLabel}>{item.label}</Text>
                </View>
                <View style={styles.priorityRight}>
                  <View style={styles.priorityBar}>
                    <View
                      style={[
                        styles.priorityBarFill,
                        {
                          width: `${(item.count / 23) * 100}%`,
                          backgroundColor: item.color,
                        },
                      ]}
                    />
                  </View>
                  <Text style={styles.priorityCount}>{item.count}</Text>
                </View>
              </View>
            ))}
          </View>
        </View>

        {/* Recent Activity */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Recent Activity</Text>
          <View style={styles.activityCard}>
            <View style={styles.activityItem}>
              <View style={styles.activityIcon}>
                <Text style={styles.activityIconText}>✓</Text>
              </View>
              <View style={styles.activityInfo}>
                <Text style={styles.activityText}>
                  Completed 3 high priority tasks
                </Text>
                <Text style={styles.activityTime}>2 hours ago</Text>
              </View>
            </View>
            <View style={styles.activityItem}>
              <View style={styles.activityIcon}>
                <Text style={styles.activityIconText}>📊</Text>
              </View>
              <View style={styles.activityInfo}>
                <Text style={styles.activityText}>
                  Reached 65% completion rate
                </Text>
                <Text style={styles.activityTime}>5 hours ago</Text>
              </View>
            </View>
            <View style={styles.activityItem}>
              <View style={styles.activityIcon}>
                <Text style={styles.activityIconText}>🔥</Text>
              </View>
              <View style={styles.activityInfo}>
                <Text style={styles.activityText}>
                  12-day streak milestone!
                </Text>
                <Text style={styles.activityTime}>Today</Text>
              </View>
            </View>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F8F9FA",
  },
  scrollView: {
    flex: 1,
  },
  header: {
    paddingHorizontal: 20,
    paddingTop: 20,
    paddingBottom: 15,
    backgroundColor: "#FFFFFF",
  },
  headerTitle: {
    fontSize: 28,
    fontWeight: "700",
    color: "#000",
    marginBottom: 4,
  },
  headerSubtitle: {
    fontSize: 14,
    color: "#666",
  },
  statsGrid: {
    flexDirection: "row",
    paddingHorizontal: 20,
    marginTop: 15,
    gap: 10,
  },
  statCard: {
    flex: 1,
    backgroundColor: "#FFFFFF",
    borderRadius: 12,
    padding: 20,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 2,
    elevation: 2,
  },
  statNumber: {
    fontSize: 32,
    fontWeight: "700",
    color: "#8B5CF6",
    marginBottom: 4,
  },
  statLabel: {
    fontSize: 12,
    color: "#666",
    textAlign: "center",
  },
  section: {
    marginTop: 25,
    paddingHorizontal: 20,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: "600",
    color: "#000",
    marginBottom: 15,
  },
  chartContainer: {
    backgroundColor: "#FFFFFF",
    borderRadius: 12,
    padding: 20,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 2,
    elevation: 2,
  },
  chart: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "flex-end",
    height: 180,
  },
  barContainer: {
    flex: 1,
    alignItems: "center",
    justifyContent: "flex-end",
  },
  barWrapper: {
    width: "70%",
    height: 140,
    justifyContent: "flex-end",
    marginBottom: 8,
  },
  bar: {
    backgroundColor: "#8B5CF6",
    borderRadius: 4,
    width: "100%",
  },
  barLabel: {
    fontSize: 11,
    color: "#666",
    marginTop: 4,
    fontWeight: "500",
  },
  barValue: {
    fontSize: 10,
    color: "#999",
  },
  priorityContainer: {
    backgroundColor: "#FFFFFF",
    borderRadius: 12,
    padding: 20,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 2,
    elevation: 2,
  },
  priorityItem: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 20,
  },
  priorityLeft: {
    flexDirection: "row",
    alignItems: "center",
    width: 80,
  },
  priorityDot: {
    width: 12,
    height: 12,
    borderRadius: 6,
    marginRight: 10,
  },
  priorityLabel: {
    fontSize: 14,
    color: "#333",
    fontWeight: "500",
  },
  priorityRight: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
  },
  priorityBar: {
    flex: 1,
    height: 8,
    backgroundColor: "#F3F4F6",
    borderRadius: 4,
    overflow: "hidden",
  },
  priorityBarFill: {
    height: "100%",
    borderRadius: 4,
  },
  priorityCount: {
    fontSize: 14,
    color: "#333",
    fontWeight: "600",
    width: 30,
    textAlign: "right",
  },
  activityCard: {
    backgroundColor: "#FFFFFF",
    borderRadius: 12,
    padding: 20,
    marginBottom: 30,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 2,
    elevation: 2,
  },
  activityItem: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 16,
  },
  activityIcon: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: "#F3F4F6",
    alignItems: "center",
    justifyContent: "center",
    marginRight: 12,
  },
  activityIconText: {
    fontSize: 18,
    color: "#8B5CF6",
  },
  activityInfo: {
    flex: 1,
  },
  activityText: {
    fontSize: 14,
    color: "#333",
    marginBottom: 2,
  },
  activityTime: {
    fontSize: 12,
    color: "#999",
  },
});
