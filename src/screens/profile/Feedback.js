import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, TextInput, KeyboardAvoidingView, Platform, ScrollView } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useNavigation, SCREENS } from "../../services/NavigationContext";
import { useTheme } from "../../services/ThemeContext";
import Toast from "../../components/Toast";
import BackgroundPattern from "../../components/BackgroundPattern";

const Feedback = () => {
    const { goBack, navigate } = useNavigation();
    const { colors, isDarkMode } = useTheme();
    const [rating, setRating] = useState(0);
    const [feedbackText, setFeedbackText] = useState('');
    const [toastVisible, setToastVisible] = useState(false);

    const handleSubmit = () => {
        if (rating === 0) {
            // Ideally validation logic here
            return;
        }
        setToastVisible(true);
        setTimeout(() => {
            setToastVisible(false);
            if (goBack) goBack();
            else navigate(SCREENS.PROFILE);
        }, 1500);
    };

    const RatingStar = ({ index }) => (
        <TouchableOpacity onPress={() => setRating(index)}>
            <Ionicons
                name={index <= rating ? "star" : "star-outline"}
                size={40}
                color={index <= rating ? "#FFD700" : colors.secondaryText}
                style={{ marginHorizontal: 5 }}
            />
        </TouchableOpacity>
    );

    return (
        <KeyboardAvoidingView
            behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
            style={[styles.container, { backgroundColor: colors.background }]}
        >
            <BackgroundPattern color={isDarkMode ? colors.primary : '#00cdabff'} opacity={isDarkMode ? 0.1 : 0.05} />
            <View style={[styles.header, { borderBottomColor: colors.border }]}>
                <TouchableOpacity
                    onPress={() => goBack ? goBack() : navigate(SCREENS.PROFILE)}
                    style={[styles.backBtn, { backgroundColor: colors.cardBg }]}
                >
                    <Ionicons name="chevron-back" size={24} color={colors.text} />
                </TouchableOpacity>
                <Text style={[styles.title, { color: colors.primary }]}>Feedback</Text>
                <View style={styles.headerSpacer} />
            </View>

            <ScrollView contentContainerStyle={styles.content}>
                <Text style={[styles.question, { color: colors.primary }]}>How was your experience?</Text>
                <View style={styles.starsContainer}>
                    {[1, 2, 3, 4, 5].map((item) => (
                        <RatingStar key={item} index={item} />
                    ))}
                </View>

                <Text style={[styles.label, { color: colors.primary }]}>Tell us more (Optional)</Text>
                <TextInput
                    style={[
                        styles.input,
                        {
                            backgroundColor: colors.cardBg,
                            color: colors.text,
                            borderColor: colors.border
                        }
                    ]}
                    multiline
                    numberOfLines={6}
                    placeholder="Share your thoughts on how we can improve..."
                    placeholderTextColor={colors.secondaryText}
                    value={feedbackText}
                    onChangeText={setFeedbackText}
                    textAlignVertical="top"
                />

                <TouchableOpacity
                    style={[styles.submitButton, { backgroundColor: colors.primary, opacity: rating > 0 ? 1 : 0.6 }]}
                    onPress={handleSubmit}
                    disabled={rating === 0}
                >
                    <Text style={styles.submitButtonText}>Submit Feedback</Text>
                </TouchableOpacity>
            </ScrollView>

            <Toast visible={toastVisible} message="Thank you for your feedback!" onHide={() => setToastVisible(false)} />
        </KeyboardAvoidingView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    header: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        paddingHorizontal: 20,
        paddingVertical: 16,
        borderBottomWidth: 1,
    },
    backBtn: {
        width: 40,
        height: 40,
        borderRadius: 20,
        alignItems: 'center',
        justifyContent: 'center',
    },
    title: {
        fontSize: 20,
        fontWeight: "700",
    },
    headerSpacer: {
        width: 40,
    },
    content: {
        padding: 20,
    },
    question: {
        fontSize: 20,
        fontWeight: 'bold',
        textAlign: 'center',
        marginBottom: 20,
        marginTop: 10,
    },
    starsContainer: {
        flexDirection: 'row',
        justifyContent: 'center',
        marginBottom: 40,
    },
    label: {
        fontSize: 16,
        fontWeight: '600',
        marginBottom: 10,
    },
    input: {
        borderRadius: 16,
        borderWidth: 1,
        padding: 15,
        fontSize: 16,
        minHeight: 150,
    },
    submitButton: {
        marginTop: 30,
        borderRadius: 12,
        paddingVertical: 16,
        alignItems: 'center',
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.2,
        shadowRadius: 4,
        elevation: 3,
    },
    submitButtonText: {
        color: '#FFFFFF',
        fontSize: 16,
        fontWeight: 'bold',
    },
});

export default Feedback;
