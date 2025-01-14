import React, { useState, useEffect } from 'react';
import { TouchableOpacity, StyleSheet, View, Alert, PermissionsAndroid, Pressable } from 'react-native';
import Sound from 'react-native-sound';
import RNFS from 'react-native-fs';

const PlayButton = ({ filePath, onPlay }) => {
    const [isPlaying, setIsPlaying] = useState(false);
    const [sound, setSound] = useState(null);

    useEffect(() => {
        // Cleanup function to stop sound on component unmount
        return () => {
            if (sound) {
                sound.release();
            }
        };
    }, [sound]);



    useEffect(() => {
        if (onPlay == true) {
            handlePlayPause()
        } else if (onPlay == false) {
            if (sound) {
                sound.pause()
                setIsPlaying(false)
            }


        }
    }, [onPlay])

    // const requestStoragePermission = async () => {
    //     if (Platform.OS === 'android') {
    //         if (Platform.Version >= 30) {
    //             // Request MANAGE_EXTERNAL_STORAGE on Android 11+
    //             const granted = await PermissionsAndroid.request(
    //                 PermissionsAndroid.PERMISSIONS.MANAGE_EXTERNAL_STORAGE
    //             );

    //             if (granted === PermissionsAndroid.RESULTS.GRANTED) {
    //                 return true;
    //             } else {
    //                 Alert.alert(
    //                     "Permission Required",
    //                     "Storage access is required. Please enable it in Settings.",
    //                     [
    //                         { text: "Cancel", style: "cancel" },
    //                         { text: "Open Settings", onPress: () => Linking.openSettings() },
    //                     ]
    //                 );
    //                 return false;
    //             }
    //         } else {
    //             // Android 10 and below: Request READ_EXTERNAL_STORAGE
    //             const granted = await PermissionsAndroid.request(
    //                 PermissionsAndroid.PERMISSIONS.READ_EXTERNAL_STORAGE,
    //             );

    //             return granted === PermissionsAndroid.RESULTS.GRANTED;
    //         }
    //     }
    //     return true; // Non-Android platforms
    // };


    const getFilePath = async (uri) => {
        if (uri.startsWith('content://')) {
            // Logic to handle content URIs can go here if needed
            return uri;
        }
        return uri;
    };

    const handlePlayPause = async () => {
        // const hasPermission = await requestStoragePermission();
        // if (!hasPermission) {
        //     Alert.alert('Error', 'Storage permission denied');
        //     return;
        // }

        if (isPlaying && sound) {
            sound.stop(() => setIsPlaying(false));
        } else {
            if (filePath) {
                const actualFilePath = await getFilePath(filePath);
                if (actualFilePath) {
                    const newSound = new Sound(actualFilePath, '', (error) => {
                        if (error) {
                            console.error('Failed to load sound:', error);
                            Alert.alert('Error', 'Failed to play audio.');
                            return;
                        }
                        newSound.play((success) => {
                            if (success) {
                                console.log('Playback finished successfully');
                            } else {
                                console.error('Playback failed');
                            }
                            setIsPlaying(false); // Stop playing when finished
                        });
                    });
                    setSound(newSound);
                    setIsPlaying(true);
                } else {
                    Alert.alert('Error', 'Failed to retrieve audio file path.');
                }
            } else {
                Alert.alert('Error', 'No audio file selected');
            }
        }
    };

    return (
        <Pressable style={styles.button} onPress={handlePlayPause} >
            <View style={styles.playIcon(isPlaying)} />
        </Pressable>
    );
};

const styles = StyleSheet.create({
    button: {
        width: 40,
        height: 40,
        justifyContent: 'center',
        alignItems: 'center',
    },
    playIcon: (isPlaying) => ({
        width: 15,
        height: 20,
        backgroundColor: 'transparent',
        borderLeftWidth: isPlaying ? 5 : 20,
        borderTopWidth: isPlaying ? 0 : 10,
        borderBottomWidth: isPlaying ? 0 : 10,
        borderRightWidth: isPlaying ? 5 : 0,
        borderLeftColor: 'white',
        borderTopColor: 'transparent',
        borderRightColor: 'white',
        borderBottomColor: 'transparent',
        borderStyle: 'solid',
    }),
});

export default PlayButton;
