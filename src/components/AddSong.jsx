import React, { useState, useForm } from 'react';
import { Text, View, Button, Alert, Pressable, TextInput, StyleSheet } from 'react-native';
import DocumentPicker from 'react-native-document-picker';
import AsyncStorage from '@react-native-async-storage/async-storage';
import RNFS from 'react-native-fs';
import { Dropdown } from 'react-native-element-dropdown';


const AddSong = ({ navigation }) => {

    const dropDownOptions = [
        { label: 'Blue', value: 'blue' },
        { label: 'Red', value: 'red' },
        { label: 'Yellow', value: 'yellow' },
        { label: 'Green', value: 'green' },
        { label: 'Orange', value: 'orange' },
        { label: 'Purple', value: 'purple' },
    ]

    const styles = StyleSheet.create({
        container: {
            flex: 1,
            padding: 20,
            justifyContent: 'space-between'
        },
        section: {
            marginBottom: 4,
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

        dropdown: {
            height: 50,
            borderColor: 'gray',
            borderWidth: 0.5,
            borderRadius: 8,
            paddingHorizontal: 8,
        },
        icon: {
            marginRight: 5,
        },

        placeholderStyle: {
            fontSize: 16,
        },
        selectedTextStyle: {
            fontSize: 16,
        },
        iconStyle: {
            width: 20,
            height: 20,
        },
        inputSearchStyle: {
            height: 40,
            fontSize: 16,
        },
    });

    const [filePath, setFilePath] = useState(''); // Manage file path state
    const [name, setName] = useState('')
    const [color, setColor] = useState('')
    const [isFocus, setIsFocus] = useState(false);

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
            if (name !== '' && filePath !== '' && color !== '') {
                const songId = name;
                const songData = {
                    filePath: filePath,
                    name: name,
                    color: color
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
                <View style={styles.section}>
                    <Text style={styles.label}>Name:</Text>
                    <TextInput
                        style={styles.textInput}
                        onChangeText={(text) => setName(text)}
                        value={name}
                        placeholder="Enter song name"
                    />
                </View>
                <View style={styles.section}>
                    <Text style={styles.label}>Color of box:</Text>
                    <Dropdown maxHeight={300} onBlur={() => setIsFocus(false)} onFocus={() => setIsFocus(true)} style={[styles.dropdown, isFocus && { borderColor: 'blue' }]}
                        placeholderStyle={styles.placeholderStyle}
                        selectedTextStyle={styles.selectedTextStyle}
                        inputSearchStyle={styles.inputSearchStyle} data={dropDownOptions} value={color} search mode='modal' labelField="label" valueField="value" searchPlaceholder='pick color...' onChange={item => {
                            setColor(item.value);
                            setIsFocus(false)
                        }} />
                </View>
                <Pressable style={styles.selectButton} onPress={uploadFile}>
                    <Text style={styles.textContainer}><Text style={styles.selectButtonText}>Select Music File</Text> <Text>{'>'}</Text></Text>
                </Pressable>
            </View>
            <Button title="Submit" onPress={onSubmit} style={styles.button} />
        </View>
    );
};



export default AddSong;
