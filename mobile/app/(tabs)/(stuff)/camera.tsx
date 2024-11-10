import {AntDesign} from '@expo/vector-icons';
import {CameraType, CameraView, useCameraPermissions, CameraCapturedPicture} from 'expo-camera';
import {Audio} from 'expo-av';
import {useRef, useState} from 'react';
import {Button, StyleSheet, Text, TouchableOpacity, View} from 'react-native';

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

    const toggleCameraFacing = () => {
        setFacing((current) => (current === 'back' ? 'front' : 'back'));
    };

    const handleTakePhotos = async () => {
        if (cameraRef.current && !isCapturing) {
            setIsCapturing(true);
            setPhotoArray([]);
            //   await startRecording();

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
            <CameraView style={styles.camera} facing={facing} ref={cameraRef}>
                {
                    isLoading ? (
                        <View style={styles.text}>
                            <Text style={styles.text}>Hold still... taking photos</Text>
                        </View>
                    ) : (
                        <View style={styles.buttonContainer}>
                            <TouchableOpacity style={styles.button} onPress={toggleCameraFacing}>
                                <AntDesign name="retweet" size={44} color="black"/>
                            </TouchableOpacity>
                            <TouchableOpacity style={styles.button} onPress={handleTakePhotos}>
                                <AntDesign name="camera" size={44} color="black"/>
                                {isCapturing && <Text style={styles.text}>Hold still... taking photos</Text>}
                            </TouchableOpacity>
                        </View>
                    )
                }
            </CameraView>
            <Button title="Upload Files" onPress={sendFilesToAPI}/>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
    },
    camera: {
        flex: 1,
    },
    buttonContainer: {
        flex: 1,
        flexDirection: 'row',
        backgroundColor: 'transparent',
        margin: 64,
    },
    button: {
        flex: 1,
        alignSelf: 'flex-end',
        alignItems: 'center',
        marginHorizontal: 10,
        backgroundColor: 'gray',
        borderRadius: 10,
    },
    text: {
        fontSize: 16,
        fontWeight: 'bold',
        color: 'white',
        marginTop: 10,
    },
});
