import { StyleSheet, Text, View } from "react-native";

export default function Messagecomponent({ currentUser, item }) {
  const currentUserStatus = item.currentUser !== currentUser;

  return (
    <View style={currentUserStatus ? {} : { alignItems: "flex-end" }}>
      <View style={styles.messageItemWrapper}>
        <View style={styles.messageItemInnerWrapper}>
          <View
            style={[
              styles.messageItem,
              currentUserStatus ? {} : { backgroundColor: "#FF4F5A" }
            ]}
          >
            <Text
              style={currentUserStatus ? { color: "#000" } : { color: "#fff" }}
            >
              {item.text}
            </Text>
          </View>
        </View>
        <Text style={styles.messageTime}>{item.time}</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  messageItemWrapper: {
    maxWidth: "80%", // Adjusts overall container width
    marginBottom: 15,
  },
  messageItemInnerWrapper: {
    flexDirection: "row",
    alignItems: "center",
  },
  messageItem: {
    backgroundColor: "#ffffff",
    padding: 12,
    borderRadius: 10,
    marginBottom: 2,
    alignSelf: "flex-start", // Allows width to wrap content
  },
  messageTime: {
    marginLeft: 10,
  },
});
