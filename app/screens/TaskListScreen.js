import React, { useState } from "react";
import {
  Platform,
  StyleSheet,
  Text,
  View,
  TextInput,
  KeyboardAvoidingView,
  TouchableOpacity,
  Keyboard,
} from "react-native";
import { ReadTaskList, SaveTaskToDB } from "../components/Firestore";

import Task from "../components/Task";

let init = false;

function TaskListScreen(props) {
  // Creates a state in a functional component, stateVariable/stateSetter()
  const [task, setTask] = useState();
  const [taskItems, setTaskItems] = useState([]);

  // Adding Tasks
  const handleAddTask = () => {
    // Re-hides the keyboard on mobile
    Keyboard.dismiss();
    // ...taskItems represents ALL other items in the array
    setTaskItems([...taskItems, task]);
    // sets task as null so that the text input empties
    setTask("");

    SaveTaskToDB({
      done: false,
      title: task,
    });
  };

  // Removing Tasks
  const completeTask = (index) => {
    let itemsCopy = [...taskItems];
    let task = itemsCopy[index];
    itemsCopy.splice(index, 1); // removes the one task index
    setTaskItems(itemsCopy);

    SaveTaskToDB({
      done: true,
      title: task,
    });
  };

  if (!init) {
    init = true;
    loadInitialTasks(taskItems, setTaskItems);
  }

  return (
    <View style={styles.container}>
      <View style={styles.taskWrapper}>
        <Text style={styles.sectionTitle}>Today's Tasks</Text>

        <View style={styles.items}>
          {/* this is where the task array gets shown */}
          {taskItems.map((item, index) => {
            return (
              <TouchableOpacity key={index} onPress={() => completeTask(index)}>
                <Task text={item} />
              </TouchableOpacity>
            );
          })}
        </View>
      </View>

      {/* Write a task */}
      {/* KeyboardAvoidingView allows the screen to "avoid" the keyboard when open on mobile */}
      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        style={styles.writeTaskWrapper}
      >
        <TextInput
          style={styles.input}
          placeholder={"Write a task"}
          value={task}
          onChangeText={(text) => setTask(text)}
        />
        {/* TouchableOpacity is a button */}
        <TouchableOpacity onPress={() => handleAddTask()}>
          <View style={styles.addWrapper}>
            <Text style={styles.addText}>+</Text>
          </View>
        </TouchableOpacity>
      </KeyboardAvoidingView>
    </View>
  );
}

// Load Initial Tasks
async function loadInitialTasks(taskItems, setTaskItems) {
  const docArray = await ReadTaskList();

  setTaskItems(docArray);

  taskItems.forEach((item) => {
    console.log("TASKITEMS: " + item);
  });
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#E8EAED",
  },
  taskWrapper: {
    paddingTop: 30,
    paddingHorizontal: 20,
  },
  sectionTitle: {
    fontSize: 24,
    fontWeight: "bold",
  },
  items: {
    marginTop: 30,
  },
  writeTaskWrapper: {
    position: "absolute",
    bottom: 60,
    width: "100%",
    flexDirection: "row",
    justifyContent: "space-around",
    alignItems: "center",
    paddingLeft: 10,
    paddingRight: 10,
  },
  input: {
    paddingVertical: 15,
    paddingHorizontal: 15,
    width: "90%",
    backgroundColor: "#fff",
    borderRadius: 60,
    borderColor: "#C0C0C0",
    borderWidth: 1,
  },
  addWrapper: {
    width: 60,
    height: 60,
    backgroundColor: "#fff",
    borderRadius: 60,
    justifyContent: "center",
    alignItems: "center",
    borderColor: "#C0C0C0",
    borderWidth: 1,
  },
  addText: {},
});

export default TaskListScreen;
