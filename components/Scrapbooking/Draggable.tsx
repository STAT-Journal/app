import React from 'react';
import { View } from 'react-native';
import { Text } from 'react-native';
import { StyleSheet } from 'react-native';
import { Element } from '@/database/models';
import { Gesture, GestureDetector } from 'react-native-gesture-handler';
import Animated, {
    useSharedValue,
    useAnimatedStyle,
    withSpring
} from 'react-native-reanimated';

interface DraggableProps {
    onDragStart?: () => void;
    onDragEnd?: () => void;
    springBack?: boolean;
    element: Element;
}

const Draggable: React.FC<DraggableProps> = ({ onDragStart, onDragEnd, springBack, element }) => {
    const translateX = useSharedValue(element.x);
    const translateY = useSharedValue(element.y);
    const offsetX = useSharedValue(element.x);
    const offsetY = useSharedValue(element.y);
    const scale = useSharedValue(1);
    const baseScale = useSharedValue(element.scale);
    const rotation = useSharedValue(0);
    const baseRotation = useSharedValue(element.rotation);
    const focalY = useSharedValue(0);
    const fontSize = 100; // Assuming the font size is 100 as per styles.emoji

    const panGesture = Gesture.Pan()
        .onBegin(() => {
            if (onDragStart) {
                onDragStart();
            }
        })
        .onUpdate((event) => {
            translateX.value = event.translationX + offsetX.value;
            translateY.value = event.translationY + offsetY.value;
        })
        .onEnd(() => {
            offsetX.value = translateX.value;
            offsetY.value = translateY.value;
            element.x = translateX.value;
            element.y = translateY.value;
            if (onDragEnd) {
                onDragEnd();
            }
        });

    const pinchGesture = Gesture.Pinch()
        .onUpdate((event) => {
            scale.value = baseScale.value * event.scale;
        })
        .onEnd(() => {
            baseScale.value = scale.value;
            element.scale = scale.value;
        });

    const rotateGesture = Gesture.Rotation()
        .onUpdate((event) => {
            rotation.value = baseRotation.value + (event.rotation  * 1);
        })
        .onEnd(() => {
            baseRotation.value = rotation.value;
            element.rotation = rotation.value;
        });

    const animatedStyle = useAnimatedStyle(() => {
        const adjustedTranslateX = translateX.value - (fontSize / 2) * scale.value;
        const adjustedTranslateY = translateY.value - (fontSize / 2) * scale.value;
        return {
            position: 'absolute',
            transform: [
                { translateX: adjustedTranslateX },
                { translateY: adjustedTranslateY },
                { scale: scale.value },
                { rotate: `${rotation.value}rad` },
            ],
        };
    });

    return (
        <GestureDetector gesture={Gesture.Simultaneous(panGesture, pinchGesture, rotateGesture)}>
            <Animated.View style={[{ flex: 1 }, animatedStyle]}>
                <Text style={styles.emoji}>
                    {element.text}
                </Text>
            </Animated.View>
        </GestureDetector>
    );
};

export default Draggable;

const styles = StyleSheet.create({
    emoji: {
        fontSize: 100,
    },
});
