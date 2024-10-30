import React, { useState, useForm } from 'react';
import { Text, View, Button, Alert, Pressable, TextInput, StyleSheet } from 'react-native';
import DocumentPicker from 'react-native-document-picker';
import AsyncStorage from '@react-native-async-storage/async-storage';
import RNFS from 'react-native-fs';


const AddSong = ({ navigation }) => {

    const styles = StyleSheet.create({
        container: {
            flex: 1,
            padding: 20,
            justifyContent: 'space-between'
        },
        inputContainer: {
            marginBottom: 20,
        },
        label: {
            fontSize: 16,
            marginBottom: 5,
        },
        textInput: {
            borderWidth: 1,
            borderColor: '#ccc',
            borderRadius: 5,
            padding: 10,
        },
        button: {
            marginTop: 20,
        },
        selectButton: {
            backgroundColor: '#eee',
            padding: 10,
            borderRadius: 5,
            marginTop: 20,
            borderColor: '#ccc',
            borderWidth: 1,
        },
        textContainer: {
            display: 'flex',
            flexDirection: 'row'
        },
        selectButtonText: {
            fontSize: 16,
            justifyContent: 'space-between',
        },
    });

    const [filePath, setFilePath] = useState(''); // Manage file path state
    const [name, setName] = useState('')

    const uploadFile = async () => {
        try {
            const res = await DocumentPicker.pick({
                type: [DocumentPicker.types.audio],
            });
            console.log('Selected file:', res[0].uri);

            // Copy file to app's document directory
            const newPath = `${RNFS.DocumentDirectoryPath}/${res[0].name}`;
            await RNFS.copyFile(res[0].uri, newPath);
            setFilePath(newPath); // Update the state with the new path
        } catch (err) {
            if (DocumentPicker.isCancel(err)) {
                console.log('User cancelled the picker');
            } else {
                console.error('Error picking or copying file:', err);
                Alert.alert('Error', 'Failed to pick or copy file. Please try again.');
            }
        }
    };



    const onSubmit = async () => {
        try {
            // Validate if both name and filePath are provided
            if (name !== '' && filePath !== '') {
                const songId = name;
                const songData = {
                    filePath: filePath,
                    name: name
                };

                console.log('songData:', songData); // Verify object content

                const stringifiedData = JSON.stringify(songData);

                await AsyncStorage.setItem(songId, stringifiedData);

                Alert.alert('Success', 'Song saved to local storage');
                setName('');
                setFilePath('');
                navigation.navigate('Main');
            } else {
                Alert.alert('A Field is empty', 'Please fill out a name or pick a file.');
            }
        } catch (error) {
            console.error('Error saving song to local storage:', error);
            Alert.alert('Error', 'Failed to save song');
        }
    };



    return (
        <View style={styles.container}>
            <View style={styles.inputContainer}>
                <Text style={styles.label}>Name:</Text>
                <TextInput
                    style={styles.textInput}

                    onChangeText={(text) => setName(text)}
                    value={name}
                    placeholder="Enter song name"
                />

                <Pressable style={styles.selectButton} onPress={uploadFile}>
                    <Text style={styles.textContainer}><Text style={styles.selectButtonText}>Select Music File</Text> <Text>{'>'}</Text></Text>
                </Pressable>
            </View>
            <Button title="Submit" onPress={onSubmit} style={styles.button} />
        </View>
    );
};

export default AddSong;
