import { useState } from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";

const localeList = ["ko", "en", "ja", "zh"];

export default (props) => {
  const { islocale, setIslocale } = props;
  const insets = useSafeAreaInsets();

  function onPressButton(locVal) {
    setIslocale(locVal.toLowerCase());
  }

  function Button({ text, selected }) {
    return (
      <TouchableOpacity
        style={[
          styles.buttonContainer,
          selected ? styles.selectedButtonStyle : styles.notSelectedButtonStyle,
        ]}
        onPress={() => onPressButton(text)}
      >
        <Text>{text}</Text>
      </TouchableOpacity>
    );
  }

  return (
    <View
      style={{
        ...styles.buttonViewContainer,
        marginBottom: insets.bottom + 30,
      }}
    >
      {localeList.map((item) => {
        return (
          <Button
            key={item}
            text={item.toUpperCase()}
            selected={islocale === item}
          />
        );
      })}
    </View>
  );
};

const styles = StyleSheet.create({
  buttonContainer: {
    backgroundColor: "#F0F0F080",
    borderWidth: 1,
    padding: 5,
    borderRadius: 15,
    paddingHorizontal: 10,
    marginHorizontal: 6,
  },
  buttonViewContainer: {
    alignItems: "center",
    flexDirection: "row",
    justifyContent: "center",
  },
  selectedButtonStyle: {
    borderColor: "blue",
  },
  notSelectedButtonStyle: {
    borderColor: "transparent",
  },
});
