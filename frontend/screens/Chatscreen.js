import { useContext, useEffect } from "react";
import {
  FlatList,
  Pressable,
  StyleSheet,
  Text,
  View,
} from "react-native";
import { GlobalContext } from "../context";
import AntDesign from "react-native-vector-icons/AntDesign";
import Chatcomponent from "../components/Chatcomponent";
import NewGroupModal from "../components/Modal";
import { socket } from "../utils";

export default function Chatscreen({ navigation }) {
  const {
    currentUser,
    allChatRooms,
    setAllChatRooms,
    modalVisible,
    setModalVisible,
    setCurrentUser,
    setShowLoginView,
  } = useContext(GlobalContext);

  useEffect(() => {
    socket.emit("getAllGroups");

    socket.on("groupList", (groups) => {
      console.log(groups, "Group list received");
      setAllChatRooms(groups);
    });

    // Clean up on unmount
    return () => socket.off("groupList");
  }, []);

  function handleLogout() {
    setCurrentUser("");
    setShowLoginView(false);
  }

  useEffect(() => {
    if (currentUser.trim() === "") navigation.navigate("Homescreen");
  }, [currentUser]);

  return (
    <View style={styles.mainWrapper}>
      <View style={styles.topContainer}>
        <View style={styles.header}>
          <Text style={styles.heading}>Welcome {currentUser}</Text>
          <View style={styles.logoutIconWrapper}>
            <Pressable onPress={handleLogout}>
              <AntDesign name="logout" size={22} color={"black"} />
            </Pressable>
          </View>
        </View>

      </View>

      <View style={styles.listContainer}>
        {allChatRooms && allChatRooms.length > 0 && (
          <FlatList
            data={allChatRooms}
            renderItem={({ item }) => <Chatcomponent item={item} />}
            keyExtractor={(item) => item.id}
          />
        )}
      </View>

      <View style={styles.bottomContainer}>
        <Pressable onPress={() => setModalVisible(true)} style={styles.button}>
          <Text style={styles.buttonText}>Create New Group</Text>
        </Pressable>
      </View>

      {modalVisible && <NewGroupModal />}
    </View>
  );
}

const styles = StyleSheet.create({
  mainWrapper: {
    backgroundColor: "#eee",
    flex: 1,
  },
  topContainer: {
    backgroundColor: "#fff",
    width: "100%",
    padding: 20,
    justifyContent: "center",
    marginBottom: 15,
    flex: 0.24,
  },
  header: {
    marginTop: 14,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    position: "relative",
  },
  heading: {
    fontSize:25,
    fontWeight: "bold",
  },
  logoutIconWrapper: {
    position: "absolute",
    right: 2, 
  },
  listContainer: {
    flex: 3.4,
    paddingHorizontal: 10,
  },
  bottomContainer: {
    flex: 0.3,
    padding: 10,
    marginBottom:15,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
  },
  button: {
    backgroundColor: "#FF4F5A",
    padding: 12,
    width: "70%",
    elevation: 1,
    borderRadius: 50,
   
  },
  buttonText: {
    textAlign: "center",
    color: "#fff",
    fontWeight: "bold",
    fontSize: 20,
  },
});
