import React from 'react';
import { View } from 'react-native';
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
    children: React.ReactNode;
}

const Draggable: React.FC<DraggableProps> = ({ onDragStart, onDragEnd, springBack, children }) => {
    const translateX = useSharedValue(0);
    const translateY = useSharedValue(0);
    const offsetX = useSharedValue(0);
    const offsetY = useSharedValue(0);

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
            if (springBack === true) {
                translateX.value = withSpring(0);
                translateY.value = withSpring(0);
                offsetX.value = 0;
                offsetY.value = 0;
            }
            if (onDragEnd) {
                onDragEnd();
            }
        });

    const animatedStyle = useAnimatedStyle(() => {
        return {
            transform: [
                { translateX: translateX.value },
                { translateY: translateY.value },
            ],
        };
    });

    return (
        <GestureDetector gesture={panGesture}>
            <Animated.View style={animatedStyle}>
                {children}
            </Animated.View>
        </GestureDetector>
    );
};

export default Draggable;
