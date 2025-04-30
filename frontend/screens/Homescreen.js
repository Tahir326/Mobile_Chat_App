import {
  Alert,
  ImageBackground,
  Keyboard,
  Pressable,
  StyleSheet,
  Text,
  TextInput,
  View,
} from "react-native";
import homeImage from "../assets//home-page.jpg";
import { useContext, useEffect } from "react";
import { GlobalContext } from "../context";

export default function Homescreen({ navigation }) {
  const {
    showLoginView,
    setShowLoginView,
    currentUserName,
    setCurrentUserName,
    currentUser,
    setCurrentUser,
    allUsers,
    setAllUsers,
  } = useContext(GlobalContext);

  function handleRegisterAndSignIn(isLogin) {
    if (currentUserName.trim() !== "") {
      const index = allUsers.findIndex(
        (userItem) => userItem === currentUserName
      );

      if (isLogin) {
        if (index === -1) {
          Alert.alert("Please register first");
        } else {
          setCurrentUser(currentUserName);
        }
      } else {
        if (index === -1) {
          allUsers.push(currentUserName);
          setAllUsers(allUsers);
          setCurrentUser(currentUserName);
        } else {
          Alert.alert("Already registered ! Please login");
        }
      }

      setCurrentUserName("");
    } else {
      Alert.alert("User name field is empty");
    }

    Keyboard.dismiss();
  }

  useEffect(() => {
    if (currentUser.trim() !== "") navigation.navigate("Chatscreen");
  }, [currentUser]);

  console.log(allUsers, currentUser);

  return (
    <View style={styles.mainWrapper}>
      <View style={styles.imageContainer}>
        <ImageBackground
          source={homeImage}
          style={styles.homeImage}
      
        />
      </View>
      <View style={styles.content}>
        {showLoginView ? (
          <View style={styles.infoBlock}>
            <View style={styles.loginInputContainer}>
              <Text style={styles.heading}>Enter Your User Name</Text>
              <TextInput
                autoCorrect={false}
                placeholder="Enter your user name"
                placeholderTextColor="gray" 
                style={styles.loginInput}
                onChangeText={(value) => setCurrentUserName(value)}
                value={currentUserName}
              />
            </View>
            <View style={styles.buttonWrapper}>
              <Pressable
                onPress={() => handleRegisterAndSignIn(false)}
                style={styles.button}
              >
                <View>
                  <Text style={styles.buttonText}>Register</Text>
                </View>
              </Pressable>
              <Pressable
                onPress={() => handleRegisterAndSignIn(true)}
                style={styles.button}
              >
                <View>
                  <Text style={styles.buttonText}>Login</Text>
                </View>
              </Pressable>
            </View>
          </View>
        ) : (
          <View style={styles.infoBlock}>
            <Text style={styles.heading}>Connect , Grow and Inspire</Text>
            <Text style={styles.subHeading}>
              Connect people around the world for free
            </Text>
            <Pressable
              style={styles.button}
              onPress={() => setShowLoginView(true)}
            >
              <View>
                <Text style={styles.buttonText}>Get Started</Text>
              </View>
            </Pressable>
          </View>
        )}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  mainWrapper: {
    flex: 1,
  },
  imageContainer: {
    flex: 3, // 75% of screen height
    width: "100%",
  },
  homeImage: {
    width: "100%", // Ensures the image covers the width of the screen
    height: "100%", // Ensures the image fills the container vertically
  },
  content: {
    flex: 1, // 25% of screen height
    alignItems: "center",
    justifyContent: "center",
    width: "100%",
    backgroundColor: "#fff",
  },
  infoBlock: {
    width: "100%",
    alignItems: "center",
    justifyContent: "center",
  },
  heading: {
    fontSize: 28,
    fontWeight: "bold",
    color: "#000",
    marginBottom: 10,
  },
  subHeading: {
    fontSize: 15,
    color: "#acacac",
    marginBottom: 15,
  },
  loginInput: {
    borderRadius: 50,
    borderWidth: 1,
    padding: 8,
    
  },
  button: {
    backgroundColor: "#FF4F59",
    padding: 12,
    marginVertical: 12,
    width: "34%",
    elevation: 1,
    borderRadius: 50,
  },
  buttonWrapper: {
    flexDirection: "row",
    gap: 10,
  },
  buttonText: {
    textAlign: "center",
    color: "#fff",
    fontWeight: "bold",
    fontSize: 15,
  },
});
