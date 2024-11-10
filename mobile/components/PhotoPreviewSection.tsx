import { Fontisto } from '@expo/vector-icons';
import { CameraCapturedPicture } from 'expo-camera';
import React from 'react';
import { TouchableOpacity, SafeAreaView, Image, StyleSheet, View, ScrollView } from 'react-native';

interface PhotoPreviewSectionProps {
  photos: CameraCapturedPicture[];
  handleRetakePhoto: () => void;
}

const PhotoPreviewSection: React.FC<PhotoPreviewSectionProps> = ({ photos, handleRetakePhoto }) => (
  <SafeAreaView style={styles.container}>
    <ScrollView contentContainerStyle={styles.photoContainer}>
      {photos.map((photo, index) => (
        <View key={index} style={styles.box}>
          <Image style={styles.previewContainer} source={{ uri: 'data:image/jpg;base64,' + photo.base64 }} />
        </View>
      ))}
    </ScrollView>

    <View style={styles.buttonContainer}>
      <TouchableOpacity style={styles.button} onPress={handleRetakePhoto}>
        <Fontisto name="trash" size={36} color="black" />
      </TouchableOpacity>
    </View>
  </SafeAreaView>
);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'black',
    alignItems: 'center',
    justifyContent: 'center',
  },
  photoContainer: {
    alignItems: 'center',
  },
  box: {
    borderRadius: 15,
    padding: 1,
    width: '95%',
    backgroundColor: 'darkgray',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 10,
  },
  previewContainer: {
    width: '95%',
    height: 200,
    borderRadius: 15,
  },
  buttonContainer: {
    marginTop: '4%',
    flexDirection: 'row',
    justifyContent: 'center',
    width: '100%',
  },
  button: {
    backgroundColor: 'gray',
    borderRadius: 25,
    padding: 10,
    alignItems: 'center',
    justifyContent: 'center',
  },
});

export default PhotoPreviewSection;
