import React, { useState, useEffect } from 'react'; // Added useState import
import { Alert, SafeAreaView, ScrollView, StyleSheet, Text, Platform, Linking } from 'react-native';
import DocumentPicker from 'react-native-document-picker'; // Import DocumentPicker
import AddFab from './components/AddFab';
import DeleteFab from './components/DeleteFab';
import PlayButtons from './components/PlayButtons';
import { request, PERMISSIONS } from 'react-native-permissions';

const HomeScreen = ({ navigation, isUpdated }) => {
    const [deleteBool, setDeleteBool] = useState(false)


    // useEffect(() => {
    //     const requestStoragePermission = async () => {
    //         try {
    //             const granted = await request(

    //                 PERMISSIONS.ANDROID.WRITE_EXTERNAL_STORAGE,

    //             );

    //             if (granted === 'granted') {
    //                 console.log('Storage permission granted');
    //             } else {
    //                 console.log('Storage permission denied');
    //                 Linking.openSettings().catch(err => {
    //                     console.error('Error opening settings:', err);
    //                 });
    //                 // Handle permission denied case, e.g., show a message to the user
    //             }
    //         } catch (err) {
    //             console.error('Error requesting storage permission:', err);
    //         }
    //     };
    //     requestStoragePermission();
    // }, []);


    return (
        <SafeAreaView style={styles.container}>
            <Text style={styles.text}>Saved Audio Clips</Text>
            <ScrollView>
                <PlayButtons updated={isUpdated} deleteBool={deleteBool} />
            </ScrollView>
            <DeleteFab deleteBool={deleteBool} onPress={() => {
                if (deleteBool == false) {
                    setDeleteBool(true)
                } else {
                    setDeleteBool(false)
                }

            }} />
            <AddFab onPress={() => { navigation.navigate('Add'); }} />
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#f2f2f2',
    },
    text: {
        fontSize: 23,
        textAlign: 'center',
        color: '#000000',
        marginTop: 10,
    },
});

export default HomeScreen;
