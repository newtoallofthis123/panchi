import {AntDesign} from '@expo/vector-icons';
import {CameraType, CameraView, useCameraPermissions, CameraCapturedPicture} from 'expo-camera';
import {Audio} from 'expo-av';
import {useRef, useState} from 'react';
import {Button, StyleSheet, Text, TouchableOpacity, View} from 'react-native';

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#000', // Dark background for a modern look
    },
    camera: {
        flex: 1,
    },
    topMessageContainer: {
        position: 'absolute',
        top: 50,
        left: 0,
        right: 0,
        alignItems: 'center',
        zIndex: 1,
    },
    topMessageText: {
        fontSize: 18,
        fontWeight: '600',
        color: '#ffffff',
        paddingVertical: 8,
        paddingHorizontal: 16,
        backgroundColor: 'rgba(0, 0, 0, 0.7)',
        borderRadius: 10,
        textAlign: 'center',
    },
    buttonContainer: {
        position: 'absolute',
        bottom: 100, // Adjusted to move up
        alignSelf: 'center',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: 'transparent',
    },
    button: {
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#1e90ff', // Stylish blue
        borderRadius: 40,
        padding: 16,
        elevation: 4, // Shadow effect for modern touch
    },
    uploadButton: {
        alignSelf: 'center',
        position: 'absolute',
        bottom: 30, // Adjusted to center it above the bottom bar
        paddingVertical: 12,
        paddingHorizontal: 24,
        backgroundColor: '#32cd32', // Fresh green color
        borderRadius: 8,
        elevation: 3,
    },
    uploadButtonText: {
        fontSize: 16,
        fontWeight: 'bold',
        color: '#fff',
        textAlign: 'center',
    },
});

export default function CameraScreen({navigation}: any) {
    const [facing, setFacing] = useState<CameraType>('back');
    const [permission, requestPermission] = useCameraPermissions();
    const [isCapturing, setIsCapturing] = useState(false);
    const cameraRef = useRef<CameraView | null>(null);
    const [isLoading, setIsLoading] = useState(false);
    const [photoArray, setPhotoArray] = useState<CameraCapturedPicture[]>([]);

    if (!permission) {
        return <View/>;
    }

    if (!permission.granted) {
        return (
            <View style={styles.container}>
                <Text style={{textAlign: 'center'}}>We need your permission to show the camera</Text>
                <Button onPress={requestPermission} title="Grant Permission"/>
            </View>
        );
    }

    const handleTakePhotos = async () => {
        if (cameraRef.current && !isCapturing) {
            setIsCapturing(true);
            setPhotoArray([]);
            const newPhotos: CameraCapturedPicture[] = [];
            for (let i = 1; i <= 3; i++) {
                if (!cameraRef.current) break;

                try {
                    const options = {quality: 1, base64: true, exif: false};
                    const photo = await cameraRef.current.takePictureAsync(options);
                    if (photo) newPhotos.push(photo);
                    console.log(`Captured photo ${i} of 3`);
                } catch (error) {
                    console.error('Error taking photo:', error);
                    break;
                }
            }
            setPhotoArray(newPhotos);
            console.log("Captured photos:", newPhotos.map((photo) => photo.uri));
            setIsCapturing(false);
        }
    };

    const sendFilesToAPI = async () => {
        const formData = new FormData();

        photoArray.forEach((photo, index) => {
            formData.append(`images`, {
                uri: photo.uri,
                name: `photo${index + 1}.jpg`,
                type: 'image/jpeg',
            } as any);
        });

        try {
            setIsLoading(true);
            const response = await fetch('http://172.20.33.241:5000/img/predict', {
                method: 'POST',
                body: formData,
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
            });
            const data = await response.json();
            console.log('Upload response:', data);
            navigation.navigate('card', {data: data});
        } catch (error) {
            console.error('Error uploading files:', error);
        }
    };

    return (
        <View style={styles.container}>
            {isCapturing && (
                <View style={styles.topMessageContainer}>
                    <Text style={styles.topMessageText}>Hold still... taking photos</Text>
                </View>
            )}
            <CameraView style={styles.camera} facing={facing} ref={cameraRef}>
                <View style={styles.buttonContainer}>
                    <TouchableOpacity style={styles.button} onPress={handleTakePhotos}>
                        <AntDesign name="search1" size={32} color="white"/>
                    </TouchableOpacity>
                </View>
            </CameraView>
            <TouchableOpacity style={styles.uploadButton} onPress={sendFilesToAPI}>
                <Text style={styles.uploadButtonText}>Upload Files</Text>
            </TouchableOpacity>
        </View>
    );
}
