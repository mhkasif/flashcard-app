import React from "react";
import {
  Text,
  View,
  StyleSheet,
  SafeAreaView,
  FlatList,
  Dimensions,
  AsyncStorage,
} from "react-native";
import Card from "../../Components/Cards/Card";
import { getDecks } from "../../Data";

const DecksPage = ({ navigation }) => {
  const [data, setData] = React.useState([]);

  React.useEffect(() => {
    const unsubscribe = navigation.addListener("focus", () => {
      const abc = async () => {
        const cards = await getDecks();
        setData(cards);
      };
      abc();
      return unsubscribe;
    });
  }, [navigation]);
  return (
    <SafeAreaView style={styles.decksPage}>
    {data.length?
      <FlatList
      data={data}
      renderItem={(item) => <Card navigation={navigation} data={item.item} />}
      keyExtractor={(item, idx) => idx.toString()}
      />
    :

    <Text style={{fontSize:25,paddingTop:100}} >No Deck To be Shown.</Text>

  }
    </SafeAreaView>
  );
};
const styles = StyleSheet.create({
  decksPage: {
    flex: 1,
    alignItems: "center",
    width: Dimensions.get("screen").width,
    backgroundColor: "#fff",
  },
});
export default DecksPage;
