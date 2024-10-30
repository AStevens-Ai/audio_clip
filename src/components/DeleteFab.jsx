import { Alert, Pressable, StyleSheet, Text, View } from 'react-native'
import React, { Component } from 'react'

export default class DeleteFab extends Component {
    render() {
        const { onPress, deleteBool } = this.props
        return (
            <Pressable style={styles.container} onPress={onPress}>
                <Text style={styles.title}>{deleteBool ? 'Save' : 'Delete'}</Text>
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
        left: 30,
        backgroundColor: "red",
        paddingHorizontal: 20,
        paddingVertical: 10,
    },
    title: {
        fontSize: 18,
        color: "#fff",
        fontWeight: "bold",
    }
})