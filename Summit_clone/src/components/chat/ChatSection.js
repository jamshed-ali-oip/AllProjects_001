import React from "react";
import { FlatList, StyleSheet, Text, View } from "react-native";
import { ChatItem } from "./ChatItem";
import { RFPercentage } from "react-native-responsive-fontsize";

export function ChatSection({ data, title }) {
  const renderItem = ({ item }) => {
    return <ChatItem item={item} />;
  };
  return (
    <View style={styles.chatSectionContainer}>
      <Text style={styles.title}>{title}</Text>
      <FlatList
        data={data}
        renderItem={renderItem}
        keyExtractor={(item) => item.id.toString()}
        showsHorizontalScrollIndicator={false}
        ListEmptyComponent={
          <Text style={styles.emptyListText}>
            {data?.length === 0 ? "No messages" : "Loading..."}
          </Text>
        }
      />
    </View>
  );
}

const styles = StyleSheet.create({
  title: {
    fontSize: RFPercentage(2.2),
    fontWeight: "bold"
  },
  chatSectionContainer: { marginTop: 10, minHeight: 100 },
  emptyListText: {
    marginLeft: 2
  }
});
