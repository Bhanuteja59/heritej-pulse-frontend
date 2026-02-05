import React, { useState, useEffect, useRef } from 'react';
import { View, Text, TextInput, TouchableOpacity, Modal, ActivityIndicator, StyleSheet, Platform, KeyboardAvoidingView } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient'; // Keep using LinearGradient as per original design
import { COLORS } from '../utils/theme';

const OTPModal = ({ visible, onClose, onVerify, isLoading, sentTo }) => {
    const [verificationCode, setVerificationCode] = useState("");
    const inputRef = useRef(null);

    // Auto-focus logic
    useEffect(() => {
        if (visible) {
            // Reset code when modal opens
            setVerificationCode("");
            const timer = setTimeout(() => {
                inputRef.current?.focus();
            }, 100);
            return () => clearTimeout(timer);
        }
    }, [visible]);

    const handleConfirm = () => {
        onVerify(verificationCode);
    };

    return (
        <Modal
            animationType="slide"
            transparent={true}
            visible={visible}
            onRequestClose={onClose}
        >
            <View style={styles.modalOverlay}>
                <KeyboardAvoidingView behavior={Platform.OS === "ios" ? "padding" : "height"} style={styles.kav}>
                    <View style={styles.modalContent}>
                        <Text style={styles.modalTitle}>Verification Code ✅</Text>
                        <Text style={styles.modalSubtitle}>
                            You need to enter 4-digit code we send to : {"\n"}
                            <Text style={{ fontWeight: 'bold', color: COLORS.primary }}>{sentTo}</Text>
                        </Text>

                        {/* Wrapper to ensure touches focus the input */}
                        <View style={styles.codeContainer}>
                            <TextInput
                                ref={inputRef}
                                style={styles.hiddenCodeInput}
                                keyboardType="number-pad"
                                maxLength={4}
                                value={verificationCode}
                                onChangeText={setVerificationCode}
                                caretHidden={true}
                                contextMenuHidden={true}
                                selectTextOnFocus={false}
                            />

                            {/* Visual Display of slots */}
                            <TouchableOpacity
                                activeOpacity={1}
                                onPress={() => inputRef.current?.focus()}
                                style={styles.codeSlotsContainer}
                            >
                                {[0, 1, 2, 3].map((index) => (
                                    <View
                                        key={index}
                                        style={[
                                            styles.codeSlot,
                                            (verificationCode.length === index || (index === 3 && verificationCode.length === 4)) && styles.codeSlotActive
                                        ]}
                                    >
                                        <Text style={styles.codeSlotText}>
                                            {verificationCode[index] || ""}
                                        </Text>
                                    </View>
                                ))}
                            </TouchableOpacity>
                        </View>

                        <TouchableOpacity
                            onPress={handleConfirm}
                            activeOpacity={0.8}
                            disabled={isLoading}
                            style={styles.modalButtonWrapper}
                        >
                            <LinearGradient
                                colors={["#EB6A00", "#FF8D28"]}
                                start={{ x: 0, y: 0 }}
                                end={{ x: 1, y: 0 }}
                                style={styles.modalButton}
                            >
                                {isLoading ? (
                                    <ActivityIndicator size="small" color="#FFF" />
                                ) : (
                                    <Text style={styles.modalButtonText}>Confirm</Text>
                                )}
                            </LinearGradient>
                        </TouchableOpacity>

                        {!isLoading && (
                            <TouchableOpacity onPress={onClose} style={styles.cancelButton}>
                                <Text style={styles.cancelButtonText}>Cancel</Text>
                            </TouchableOpacity>
                        )}
                    </View>
                </KeyboardAvoidingView>
            </View>
        </Modal>
    );
};

const styles = StyleSheet.create({
    modalOverlay: {
        flex: 1,
        backgroundColor: 'rgba(0,0,0,0.5)',
        justifyContent: 'center',
        alignItems: 'center',
    },
    kav: {
        width: '100%',
        alignItems: 'center',
        justifyContent: 'center',
    },
    modalContent: {
        backgroundColor: 'white',
        borderRadius: 20,
        padding: 30,
        width: '85%',
        alignItems: 'center',
        elevation: 5,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.25,
        shadowRadius: 4,
    },
    modalTitle: {
        fontSize: 20,
        fontWeight: 'bold',
        color: COLORS.primary,
        marginBottom: 10,
    },
    modalSubtitle: {
        fontSize: 14,
        color: COLORS.secondaryText,
        textAlign: 'center',
        marginBottom: 20,
    },
    codeContainer: {
        width: '100%',
        marginBottom: 20,
        height: 60,
        position: 'relative',
        justifyContent: 'center',
        alignItems: 'center',
    },
    hiddenCodeInput: {
        position: 'absolute',
        width: '100%',
        height: '100%',
        opacity: 0,
        zIndex: 10,
    },
    codeSlotsContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        width: '80%',
        gap: 10,
    },
    codeSlot: {
        width: 50,
        height: 55,
        borderWidth: 1.5,
        borderColor: '#E0E0E0',
        borderRadius: 12,
        backgroundColor: '#F9F9F9',
        justifyContent: 'center',
        alignItems: 'center',
    },
    codeSlotActive: {
        borderColor: COLORS.primary,
        backgroundColor: '#FFF',
        elevation: 2,
        shadowColor: COLORS.primary,
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 4,
    },
    codeSlotText: {
        fontSize: 24,
        fontWeight: 'bold',
        color: COLORS.primary,
    },
    modalButtonWrapper: {
        width: '100%',
        borderRadius: 12,
        overflow: 'hidden',
    },
    modalButton: {
        paddingVertical: 14,
        alignItems: 'center',
        justifyContent: 'center',
    },
    modalButtonText: {
        color: 'white',
        fontSize: 16,
        fontWeight: 'bold',
    },
    cancelButton: {
        marginTop: 15,
        padding: 5,
    },
    cancelButtonText: {
        color: COLORS.secondaryText,
        fontSize: 14,
    },
});

export default OTPModal;
