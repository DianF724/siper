import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity, ActivityIndicator } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import { useNavigation, useRoute } from '@react-navigation/native';
import { ref, onValue } from 'firebase/database';
import { database } from './firebase'; // Ensure the correct path to your firebase.js file

export default function Info() {
  const navigation = useNavigation();
  const route = useRoute();

  // Correctly access 'ruangan' object from route.params
  const { ruangan } = route.params || {}; // Destructure the ruangan object

  if (!ruangan || !ruangan.id || !ruangan.nama) {
    // Handle case where 'ruangan' or 'ruangan.id' or 'ruangan.nama' is missing
    return (
      <View style={styles.container}>
        <Text style={styles.errorMessage}>Ruangan data is missing or undefined.</Text>
      </View>
    );
  }

  // Sanitize the ruangan.id to avoid any invalid characters in Firebase path
  const sanitizedRuanganId = ruangan.id.replace(/[.#$\[\]]/g, '_'); // Replaces invalid characters with '_'

  const [facilities, setFacilities] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Firebase reference path should now use the sanitized ruangan id
    const facilitiesRef = ref(database, `fasilitas/${sanitizedRuanganId}`);
    const unsubscribe = onValue(facilitiesRef, (snapshot) => {
      const data = snapshot.val();
      if (data) {
        const facilitiesArray = Object.keys(data).map((key) => ({
          nama: key,
          jumlah: data[key],
        }));
        setFacilities(facilitiesArray);
      } else {
        setFacilities([]);
      }
      setIsLoading(false);
    });

    return () => unsubscribe();
  }, [sanitizedRuanganId]); // Re-run the effect if sanitizedRuanganId changes

  if (isLoading) {
    return (
      <View style={styles.container}>
        <ActivityIndicator size="large" color="#2fa5d8" />
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Image
          source={require('./images/kelas.jpg')} // Replace with actual image path or URL
          style={styles.image}
        />

        <TouchableOpacity style={styles.backButton} onPress={() => navigation.navigate('Perlengkapan')}>
          <Icon name="arrow-back" size={24} color="white" />
        </TouchableOpacity>
      </View>

      {/* Display the room name */}
      <View style={styles.roomInfo}>
        <Text style={styles.roomName}>Ruang {ruangan.nama}</Text>
      </View>

      <View style={styles.facilityContainer}>
        <Text style={styles.facilityTitle}>Fasilitas Ruangan</Text>

        <View style={styles.table}>
          <View style={[styles.tableRow, styles.tableHeader]}>
            <Text style={styles.tableHeaderText}>Fasilitas</Text>
            <Text style={styles.tableHeaderText}>Jumlah</Text>
          </View>

          {facilities.map((item, index) => (
            <View
              key={`${item.nama}-${index}`}
              style={[
                styles.tableRow,
                index % 2 === 0 ? styles.tableRowEven : styles.tableRowOdd,
              ]}
            >
              <Text style={styles.tableCell}>{item.nama}</Text>
              <Text style={styles.tableCell}>{item.jumlah}</Text>
            </View>
          ))}
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
  },
  header: {
    position: 'relative',
  },
  image: {
    width: '100%',
    height: 200,
    borderBottomLeftRadius: 40,
    borderBottomRightRadius: 40,
  },
  backButton: {
    position: 'absolute',
    top: 40,
    left: 20,
    backgroundColor: '#2fa5d8',
    padding: 10,
    borderRadius: 20,
  },
  roomInfo: {
    alignItems: 'center',
    marginVertical: 20,
  },
  roomName: {
    fontSize: 22,
    fontFamily: 'Poppins-Bold',
    color: 'black',
  },
  facilityContainer: {
    backgroundColor: '#2fa5d8',
    padding: 20,
    borderRadius: 20,
    marginHorizontal: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 3,
    elevation: 3,
  },
  facilityTitle: {
    fontSize: 18,
    fontFamily: 'Poppins-Bold',
    color: 'white',
    marginBottom: 10,
    textAlign: 'center',
  },
  table: {
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 10,
    overflow: 'hidden',
  },
  tableHeader: {
    backgroundColor: '#A3A3A3',
  },
  tableHeaderText: {
    fontSize: 16,
    fontFamily: 'Poppins-Bold',
    color: 'white',
    flex: 1,
    textAlign: 'center',
    padding: 10,
  },
  tableRow: {
    flexDirection: 'row',
  },
  tableRowEven: {
    backgroundColor: '#f9f9f9',
  },
  tableRowOdd: {
    backgroundColor: '#ffffff',
  },
  tableCell: {
    fontSize: 14,
    fontFamily: 'Poppins',
    color: '#333',
    flex: 1,
    textAlign: 'center',
    padding: 10,
    borderWidth: 1,
    borderColor: '#ddd',
  },
  errorMessage: {
    fontSize: 18,
    color: 'red',
    textAlign: 'center',
    marginTop: 20,
  },
});
