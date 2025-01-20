import React, { useEffect, useState } from 'react';
import { View, Text, TextInput, Button, FlatList, StyleSheet } from 'react-native';
import axios from 'axios';
import io from 'socket.io-client';

const socket = io('http://192.168.11.122:3001'); // WebSocket URL

const ChatAppx = ({ route }: any) => {
  const [messages, setMessages] = useState([]); // List of messages
  const [message, setMessage] = useState(''); // Current message input
  const [sender, setSender] = useState(route.params.sender); // Sender from route params
  const [receiver, setReceiver] = useState(route.params.receiver); // Receiver's username

  // Create chat session if it doesn't exist
  useEffect(() => {
    const createChatSession = async () => {
      try {
        await axios.post('http://192.168.11.122:3000/chat/create', { sender, receiver });
      } catch (error) {
        console.error('Error creating chat session:', error.message);
      }
    };
    createChatSession();
  }, [sender, receiver]);

  // Fetch messages and set up WebSocket listener
  useEffect(() => {
    if (!receiver) {
      console.warn('Receiver is not defined. Skipping message fetch.');
      return;
    }

    const fetchMessages = async () => {
      try {
        const response = await axios.get(
          `http://192.168.11.122:3000/chat/all/${sender}/${receiver}`
        );
        setMessages(response.data); // Set initial messages
      } catch (error) {
        console.error('Failed to fetch messages:', error.message);
      }
    };

    fetchMessages();

    // Listen for new incoming messages via WebSocket
    const handleNewMessage = (newMessage: any) => {
      setMessages((prevMessages: any) => [...prevMessages, newMessage]);
    };

    socket.on('receiveMessage', handleNewMessage);

    return () => {
      socket.off('receiveMessage', handleNewMessage); // Cleanup WebSocket listener
    };
  }, [receiver, sender]);

  // Send message logic
  const sendMessage = async () => {
    if (message) {
      try {
        const newMessage = { sender, receiver, content: message };

        // Emit the message via WebSocket
        socket.emit('sendMessage', newMessage);

        // Save the message to the backend
        await axios.post('http://192.168.11.122:3000/chat/create', newMessage);

        // Update UI with the new message
        setMessages((prevMessages): any => [...prevMessages, newMessage]);
        setMessage(''); // Clear the input field
      } catch (error) {
        console.error('Error sending message:', error.message);
      }
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Chat with {receiver}</Text>

      <FlatList
        data={messages}
        keyExtractor={(item, index) => index.toString()}
        renderItem={({ item }) => (
          <View
            style={[
              styles.messageContainer,
              item.sender === sender ? styles.sentMessage : styles.receivedMessage,
            ]}
          >
            <Text style={styles.messageText}>{item.content}</Text>
          </View>
        )}
      />

      <TextInput
        style={styles.input}
        placeholder="Type your message..."
        value={message}
        onChangeText={(text) => setMessage(text)}
      />

      <Button title="Send" onPress={sendMessage} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20, backgroundColor: '#f5f5f5' },
  header: { fontSize: 24, fontWeight: 'bold', marginBottom: 20, textAlign: 'center' },
  messageContainer: {
    padding: 10,
    marginBottom: 10,
    borderRadius: 5,
    maxWidth: '70%',
  },
  sentMessage: {
    alignSelf: 'flex-end',
    backgroundColor: '#d1fcd3',
  },
  receivedMessage: {
    alignSelf: 'flex-start',
    backgroundColor: '#f1f0f0',
  },
  messageText: { fontSize: 16 },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    padding: 10,
    borderRadius: 5,
    marginBottom: 10,
    backgroundColor: '#fff',
  },
});

export default ChatAppx;
