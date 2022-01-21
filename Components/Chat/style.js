import { StyleSheet } from "react-native"

const style = StyleSheet.create({
  item: {
    backgroundColor: "#FFF",
    padding: 15,
    borderRadius: 10,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
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
    backgroundColor: "#D0FF6C",
    opacity: 0.4,
    borderRadius: 5,
    marginRight: 15,
  },
  itemText: {
    maxWidth: "80%",
    fontSize: 18,
  },
  circular: {
    width: 12,
    height: 12,
    borderColor: "#D0FF6C",
    borderWidth: 2,
    borderRadius: 5,
  },
  container: {
    flexDirection: "row",
    margin: 10,
    alignItems: "flex-end",
  },
  mainContainer: {
    flexDirection: "row",
    backgroundColor: "#f7f7f7",
    padding: 10,

    borderRadius: 50,
    flex: 1, //it take everything it take as possible
    alignItems: "flex-end",
  },
  btnContainer: {
    backgroundColor: "#000",
    borderRadius: 50,
    height: 45,
    width: 45,
    justifyContent: "center",
    alignItems: "center",
  },
  textInput: {
    marginHorizontal: 10,
    flex: 1,
  },
})
export default style
