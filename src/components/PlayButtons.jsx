import React, { useState, useEffect } from 'react';
import { Text, View, Pressable, StyleSheet, Alert } from 'react-native';
import PlayButton from './PlayButton';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useFocusEffect } from '@react-navigation/native';

const PlayButtons = ({ deleteBool }) => {
    const [songs, setSongs] = useState([]);
    const styles = StyleSheet.create({
        button: {
            backgroundColor: '#333333',
            padding: 20,
            flexDirection: 'row',
            justifyContent: 'space-between',
            borderRadius: 10,
            borderWidth: 2,
            marginLeft: 30,
            marginRight: 30,
            marginTop: 20,
        },
        text: {
            color: 'white',
            fontSize: 20,
            textAlign: 'center',
        },
        textRed: {
            display: deleteBool ? 'block' : 'none',
            color: 'red',
            fontSize: 20,
            textAlign: 'center',
        },
    });
    useEffect(() => {
        fetchSongs();
    }, []);


    const onDelete = async (key) => {

        const deleteItem = async () => {
            try {
                await AsyncStorage.removeItem(key)
            } catch (err) {
                console.log(err)
            }
        }
        Alert.alert('Are You Sure?', 'This audio clip will be deleted if you continue.', [
            {
                text: 'Cancel',
                style: 'cancel',
            },
            {
                text: 'OK', onPress: () => {
                    deleteItem()
                    fetchSongs()
                }
            },
        ]);
    }

    const fetchSongs = async () => {
        const keys = await AsyncStorage.getAllKeys();
        const storedSongs = await Promise.all(
            keys.map(async (key) => {
                const songData = await AsyncStorage.getItem(key);
                return JSON.parse(songData);
            })
        );
        setSongs(storedSongs.filter(song => song)); // Filter out any null values
    };


    useFocusEffect(
        React.useCallback(() => {
            fetchSongs();
        }, [])
    );

    return (
        <View>
            {songs.map((song) => (
                <Pressable style={styles.button} key={song.name}>
                    <PlayButton filePath={song.filePath} />
                    <Text style={styles.text}>{song.name}</Text>
                    <Pressable onPress={() => { onDelete(song.name) }}><Text style={styles.textRed}>{deleteBool ? 'X' : '   '}</Text></Pressable>
                </Pressable>
            ))}
        </View>
    );
};



export default PlayButtons;
