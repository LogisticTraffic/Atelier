import React, { useEffect, useState } from 'react';
import { View, Text, TextInput, Button, FlatList, StyleSheet } from 'react-native';
import axios from 'axios';
import io from 'socket.io-client';

const socket = io('http://192.168.11.122:3001'); // WebSocket URL

const ChatApp = ({ route }: any) => {
  const [messages, setMessages] = useState([]); // List of messages
  const [message, setMessage] = useState(''); // Current message input
  const [sender, setSender] = useState(route.params.sender); // Sender from route params
  const [receiver, setReceiver] = useState(route.params.receiver); // Receiver's username

  // Fetch receiver based on the sender
  useEffect(() => {

    const create= async()=>{
          // Create chat session if it doesn't exist
          const res= await axios.post(`http://192.168.11.122:3000/chat/create`, {
            sender,
            receiver,
          });
        }
        create();
        
    },[]);

  

  // Fetch messages and listen for new messages via WebSocket
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
        setMessages(response.data); // Update the messages state
      } catch (error) {
        console.error('Failed to fetch messages:', error.message);
      }
    };

    fetchMessages();

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
        // Emit the message via WebSocket
        socket.emit('sendMessage', { sender, receiver, content: message });

        // Save the message to the backend
        await axios.post('http://192.168.11.122:3000/chat/create', {
          sender,
          receiver,
          content: message,
        });

        // Update UI with the new message
        setMessages((prevMessages): any => [...prevMessages, { sender, content: message }]);
        setMessage(''); // Clear the input field
      } catch (error) {
        console.error('Error sending message:', error.message);
      }
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Chat</Text>

      {receiver ? (
        <>
          <FlatList
            data={messages}
            keyExtractor={(item, index) => index.toString()}
            renderItem={({ item }) => (
              <View style={styles.messageContainer}>
                <Text style={styles.messageSender}>{item.sender}:</Text>
                <Text style={styles.messageContent}>{item.content}</Text>
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
        </>
      ) : (
        <Text style={styles.errorText}>
          Receiver not found. Please check your sender information or try again later.
        </Text>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20, backgroundColor: '#f5f5f5' },
  header: { fontSize: 24, fontWeight: 'bold', marginBottom: 20, textAlign: 'center' },
  messageContainer: { flexDirection: 'row', marginBottom: 10 },
  messageSender: { fontWeight: 'bold', marginRight: 5 },
  messageContent: { flex: 1 },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    padding: 10,
    borderRadius: 5,
    marginBottom: 10,
    backgroundColor: '#fff',
  },
  errorText: { textAlign: 'center', color: 'red', marginTop: 20 },
});

export default ChatApp;
