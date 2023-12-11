import { ChatSection } from "./ChatSection";
import React, { useEffect, useState } from "react";
import { StyleSheet, ScrollView } from "react-native";
import { auth, db } from "../../firebase";
import { getConversations } from "../../services/chatService";

const ChatSections = () => {
  const [conversations, setConversations] = useState(null);
  const [groupChats, setGroupChats] = useState(null);
  useEffect(() => {
    const ref = db.ref("messages").child(auth.currentUser?.uid);
    let listener;
    (async () => {
      listener = await getConversations(ref, setConversations, setGroupChats);
    })();
    return () => {
      if (listener) {
        ref.off("value", listener);
      }
    };
  }, []);

  return (
    <ScrollView
      showsVerticalScrollIndicator={false}
      style={styles.chatsContainer}
    >
      {/* Group Chat */}
      <ChatSection data={groupChats} title="Group Chats" />
      {/* One on One Chat */}
      <ChatSection data={conversations} title="Conversations" />
    </ScrollView>
  );
};

export default ChatSections;

const styles = StyleSheet.create({
  chatsContainer: { flexGrow: 1, marginBottom: 135 }
});
