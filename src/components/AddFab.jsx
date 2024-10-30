import { Alert, Pressable, StyleSheet, Text, View } from 'react-native'
import React, { Component, } from 'react'

export default class AddFab extends Component {

    render() {
        const { onPress } = this.props
        return (
            <Pressable style={styles.container} onPress={onPress}>
                <Text style={styles.title}>Add Audio</Text>
            </Pressable >
        )
    }
}

const styles = StyleSheet.create({
    container: {
        justifyContent: "center",
        alignItems: "center",
        borderRadius: 10,
        position: "absolute",
        bottom: 30,
        right: 30,
        backgroundColor: "#26653A",
        paddingHorizontal: 20,
        paddingVertical: 10,
    },
    title: {
        fontSize: 18,
        color: "#fff",
        fontWeight: "bold",
    },
})