import React from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";

const Task = (props) => {
  return (
    // Task Item
    <View style={styles.item}>
      {/* The left side of the task */}
      <View style={styles.itemLeft}>
        {/* The square checkbox */}
        <View style={styles.square}></View>
        {/* The task text */}
        <Text style={styles.text}>{props.text}</Text>
      </View>
      {/* The Task right-side dot */}
      <View style={styles.circular}></View>
    </View>
  );
};

const styles = StyleSheet.create({
  item: {
    backgroundColor: "#fff",
    padding: 15,
    borderRadius: 10,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between", // Allows the right-side dot to push all the way over
    marginBottom: 20,
  },
  itemLeft: {
    flexDirection: "row",
    alignItems: "center",
    flexWrap: "wrap",
  },
  square: {
    width: 24,
    height: 24,
    backgroundColor: "#55BCF6",
    opacity: 0.4,
    borderRadius: 5,
    marginRight: 15,
  },
  text: {
      maxWidth: '80%',
  },
  circular: {
      width: 12,
      height: 12,
      borderColor: '#55BCF6',
      borderWidth: 2,
      borderRadius: 5,
  },
});

export default Task;
