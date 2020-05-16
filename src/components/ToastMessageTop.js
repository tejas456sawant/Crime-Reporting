import { ToastAndroid } from 'react-native';

export default function(message) {
    ToastAndroid.showWithGravityAndOffset(
        message,
        ToastAndroid.LONG,
        ToastAndroid.TOP,
        25,
        50,
    );
}