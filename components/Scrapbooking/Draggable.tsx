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
    const scale = useSharedValue(1);
    const baseScale = useSharedValue(1);
    const focalX = useSharedValue(0);
    const focalY = useSharedValue(0);

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

    const pinchGesture = Gesture.Pinch()
        .onUpdate((event) => {
            scale.value = baseScale.value * event.scale;
            focalX.value = event.focalX;
            focalY.value = event.focalY;
        })
        .onEnd(() => {
            baseScale.value = scale.value;
        });

    const animatedStyle = useAnimatedStyle(() => {
        
        const adjustedTranslateY = translateY.value - (focalY.value * (scale.value - 1));

        return {
            transform: [
                { translateX: translateX.value },
                { translateY: adjustedTranslateY },
                { scale: scale.value },
            ],
        };
    });

    return (
        <GestureDetector gesture={Gesture.Simultaneous(panGesture,  pinchGesture,)}>
            <Animated.View style={animatedStyle}>
                {children}
            </Animated.View>
        </GestureDetector>
    );
};

export default Draggable;
