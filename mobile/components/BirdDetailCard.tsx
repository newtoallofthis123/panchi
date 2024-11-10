import React from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity, Linking } from 'react-native';

const BirdDetailCard = ({ birdName, birdImage, summary, weight, height , url, species, data} : any) => {
  const bird_id = data['res']['id'];
    const user_id = 'PwDyKSqM';
    async function addSighting() {
        const res = await fetch('http://172.20.33.241:5000/new/sighting', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                bird_id: bird_id,
                user_id: user_id,
                location: 'Hyderabad',
            }),
        });
        const resData = await res.json();
        console.log("Data Received: ", resData);
    }
  
  return (
    <View style={styles.container}>
     

      
     
      <View style={styles.imageContainer}>
        <Image
           source={{ uri: birdImage || 'https://res.cloudinary.com/roundglass/image/upload/q_auto/ar_16:9,c_fill/f_auto,g_auto/v1632483652/rg/collective/media/dkuxr2rrmshs0nt8aftd.jpg' }}
          style={styles.birdImage}
        />
      </View>

      
      <Text style={styles.birdName}>{birdName}</Text>
      

      
      <TouchableOpacity style={styles.transferButton}>
        <Text style={styles.transferButtonText}>TRANSFER</Text>
      </TouchableOpacity>

      
      <View style={styles.statsContainer}>
        <View style={styles.stat}>
          <Text style={styles.statLabel}>Type</Text>
          <Text style={styles.statValue}>{species}</Text>
        </View>
        <View style={styles.stat}>
          <Text style={styles.statLabel}>Weight</Text>
          <Text style={styles.statValue}>{weight}</Text>
        </View>
        <View style={styles.stat}>
          <Text style={styles.statLabel}>Height</Text>
          <Text style={styles.statValue}>{height} m</Text>
        </View>
      </View>

      
      <View style={styles.powerUpContainer}>
        <Text style={styles.powerUpText}>
        {summary || 'No summary available'}
        </Text>
        
        <TouchableOpacity
          style={styles.powerUpButton}
          onPress={() => {
            Linking.openURL(`${url}`).catch((err) => {
              console.log(err);
            });
          }}
        >
          <Text style={styles.powerUpButtonText}>Wiki It</Text>
        </TouchableOpacity>
        
        
        <TouchableOpacity style={styles.powerUpButton} onPress={addSighting}>
                        <Text style={styles.powerUpButtonText}>CATCH</Text>
                    </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'white',
    padding: 20,
    alignItems: 'center',
    borderRadius: 20,
    margin: 10,
    shadowColor: '#000',
    shadowOpacity: 0.2,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 10,
  },
  cpText: {
    color: 'white',
    fontSize: 18,
    fontWeight: '600',
    marginBottom: 10,
  },
  imageContainer: {
    width: 210,
    height: 210,
    borderRadius: 100,
    backgroundColor: '#d2f45f',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 10,
  },
  birdImage: {
    width: 180,
    height: 180,
    borderRadius: 100,
  },
  birdName: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#333',
    marginTop: 10,
  },
  hpText: {
    fontSize: 16,
    color: '#77C9F5',
    marginVertical: 5,
  },
  transferButton: {
    backgroundColor: '#2d6105',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 20,
    marginVertical: 10,
  },
  transferButtonText: {
    color: '#fff',
    fontWeight: 'bold',
  },
  statsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    width: '100%',
    marginVertical: 10,
  },
  stat: {
    alignItems: 'center',
  },
  statLabel: {
    color: '#999',
    fontSize: 12,
  },
  statValue: {
    fontSize: 16,
    fontWeight: '600',
    color: '#333',
  },
  powerUpContainer: {
    width: '100%',
    backgroundColor: '#E8F5FE',
    borderRadius: 20,
    padding: 15,
    alignItems: 'center',
    marginTop: 20,
  },
  powerUpText: {
    fontSize: 14,
    color: '#999',
    marginBottom: 5,
  },
  powerUpButton: {
    backgroundColor: '#2d6105',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 20,
    marginTop: 10,
  },
  powerUpButtonText: {
    color: '#fff',
    fontWeight: 'bold',
  },
});

export default BirdDetailCard;
