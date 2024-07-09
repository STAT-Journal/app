import { StyleSheet } from "react-native";
import {
  heightPercentageToDP,
  widthPercentageToDP,
} from "react-native-responsive-screen";

export const AudioCaptureStyles = StyleSheet.create({
  container: {
    alignItems: "center",
    justifyContent: "center",
    padding: 0,
  },
  recordingsContainer: {
    marginTop: 10,
    maxHeight: 40,
  },
  recording: {
    padding: 10,
    marginHorizontal: 5,
    alignItems: "center",
    justifyContent: "center",
  },
});

export const ImageCaptureStyles = StyleSheet.create({
  container: {
    minHeight: heightPercentageToDP("20%"),
  },
  camera: {
    justifyContent: "space-between",
  },
  buttonContainer: {},
  swapButton: {
    alignSelf: "flex-start",
    margin: 30,
  },
  captureButton: {
    justifyContent: "center",
    alignContent: "center",
    alignSelf: "center",
    margin: 30,
  },
  text: {
    fontSize: 18,
  },
  previewContainer: {
    maxHeight: 50,
  },
  previewContentContainer: {
    alignItems: "center",
    padding: 4,
  },
  previewImage: {
    width: 45,
    height: 45,
    margin: 4,
  },
  fullSizePreviewContainer: {
    justifyContent: "center",
    alignItems: "center",

    minHeight: heightPercentageToDP("100%"),
  },
  fullSizePreviewImage: {
    width: "100%",
    height: "100%",
    resizeMode: "contain",
  },
});

export const ImageGalleryStyles = StyleSheet.create({
  container: {},
  fullSizePreviewContainer: {
    justifyContent: "center",
    alignItems: "center",

    minHeight: heightPercentageToDP("100%"),
  },
  fullSizePreviewImage: {
    width: "100%",
    height: "100%",
    resizeMode: "contain",
  },
});

export const ImagePreviewStyles = StyleSheet.create({
  previewContainer: {
    maxHeight: 50,
  },
  previewContentContainer: {
    alignItems: "center",
    padding: 4,
  },
  previewImage: {
    width: 45,
    height: 45,
    margin: 4,
  },
});

export const SpeedDialStyles = StyleSheet.create({
  fab: {
    position: "relative",
    margin: 0,
    right: 0,
    bottom: heightPercentageToDP(-9),
    alignContent: "center",
    justifyContent: "center",
  },
  group: {
    paddingBottom: heightPercentageToDP(17),
    paddingRight: widthPercentageToDP(7),
  },
});

export const DraggableStyles = StyleSheet.create({
  emoji: {
    fontSize: 100,
  },
});

export const ScrapbookEntryStyles = StyleSheet.create({
  container: {
    flex: 1,
    width: "100%",
  },
  canvas: {
    flex: 1,
    position: "relative",
  },
  emoji: {
    position: "absolute",
    fontSize: 100,
  },
  selectedEmoji: {
    fontSize: 30,
    color: "#000",
    textAlign: "center",
    marginTop: 20,
  },
  modalContainer: {},
  closeButton: {
    position: "absolute",
    bottom: 10,
  },
  emojiMenuContainer: {
    width: "100%",
    height: "100%",
  },
});

export const ScrapbookMenuStyles = StyleSheet.create({
  row: {
    flexDirection: "row",
    alignItems: "center",
  },
  clearButton: {
    borderColor: "red",
    borderWidth: 1,
  },
  clearLabel: {
    color: "red",
    fontSize: 20,
  },
  emojiLabel: {
    fontSize: 20,
    marginLeft: 10,
  },
});

export const CalendarEventsStyles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
    alignItems: "center",
    justifyContent: "space-around",
  },
  buttonContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-around",
    width: "100%",
    marginBottom: 20,
  },
  eventsTitle: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 10,
  },
  eventsContainer: {
    alignItems: "center",
    flexDirection: "row",
  },
  eventText: {
    fontSize: 16,
    marginBottom: 5,
  },
  noEventsText: {
    fontSize: 16,
    fontStyle: "italic",
    marginBottom: 5,
  },
});

export const EditScreenInfoStyles = StyleSheet.create({
  getStartedContainer: {
    alignItems: "center",
    marginHorizontal: 50,
  },
  homeScreenFilename: {
    marginVertical: 7,
  },
  codeHighlightContainer: {
    borderRadius: 3,
    paddingHorizontal: 4,
  },
  getStartedText: {
    fontSize: 17,
    lineHeight: 24,
    textAlign: "center",
  },
  helpContainer: {
    marginTop: 15,
    marginHorizontal: 20,
    alignItems: "center",
  },
  helpLink: {
    paddingVertical: 15,
  },
  helpLinkText: {
    textAlign: "center",
  },
});

export const StreakTrackerStyles = StyleSheet.create({
  container: {
    justifyContent: "center",
    alignItems: "center",
    padding: 16,
  },
  cardContent: {
    flexDirection: "row",
    alignItems: "center",
    color: "black",
  },
});

export const ModalScreenStyles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
  },
  separator: {
    marginVertical: 30,
    height: 1,
    width: "80%",
  },
});

export const ExportStyles = StyleSheet.create({
  container: {
    flex: 1,

    justifyContent: "flex-start",
    alignItems: "center",
    padding: 20,
  },
  description: {
    fontSize: 13,
    marginBottom: 20,
    textAlign: "center",
    fontWeight: "bold",
  },
  card: {
    width: "85%",
    height: "50%",

    borderRadius: 10,
    padding: 20,
  },
  cardTwo: {
    width: "85%",
    height: "45%",

    borderRadius: 10,
    padding: 20,
    marginBottom: 20,
  },
  cardThree: {
    width: "85%",
    height: "25%",

    borderRadius: 10,
    padding: 20,
    marginBottom: 20,
  },
  button: {
    marginVertical: 10,
    width: "100%",
    borderRadius: 10,
  },
});

export const IndexStyles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 0,
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 20,
  },
  separator: {
    marginVertical: 20,
    height: 1,
    width: "100%",
  },
});

export const MentalHelpStyles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  card: {
    marginBottom: 20,
  },
  cardTwo: {
    marginBottom: 20,
  },
  description: {
    fontSize: 16,
    marginBottom: 10,
    fontWeight: "bold",
  },
});

export const UserStyles = StyleSheet.create({
  container: {
    flex: 1,

    padding: 0,
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 20,
  },
  separator: {
    marginVertical: 20,
    height: 1,
    width: "100%",
  },
});
