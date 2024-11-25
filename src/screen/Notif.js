import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, ScrollView, ActivityIndicator } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons'; 
import { useNavigation } from '@react-navigation/native'; 
import { useFonts } from 'expo-font'; 
import { database } from '../../src/screen/firebase.js'; // Ensure the path is correct
import { ref, onValue } from 'firebase/database'; // Import Firebase methods

export default function NotifScreen() {
  const navigation = useNavigation();
  const [fontsLoaded] = useFonts({
    'Poppins': require('./assets/fonts/Poppins-Regular.ttf'),
    'Poppins-Bold': require('./assets/fonts/Poppins-Bold.ttf'),
  });

  const [notifications, setNotifications] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Firebase reference to the 'notifications' node in the database
    const notificationsRef = ref(database, 'notifikasi/');

    // Listen for changes in the notifications data
    const unsubscribe = onValue(notificationsRef, (snapshot) => {
      const data = snapshot.val();
      if (data) {
        // Transform the Firebase data into an array
        const notificationsList = Object.keys(data).map(key => ({
          id: key,
          ...data[key]
        }));
        setNotifications(notificationsList);
      }
      setLoading(false); // Data loaded, stop loading indicator
    });

    // Cleanup listener on component unmount
    return () => unsubscribe();
  }, []);

  if (!fontsLoaded) {
    return <ActivityIndicator size="large" color="#2fa5d8" />;
  }

  if (loading) {
    return <ActivityIndicator size="large" color="#2fa5d8" />;
  }

  // Function to determine the style based on notification type
  const getCardStyle = (type) => {
    switch (type) {
      case 'Peminjaman':
        return styles.cardPeminjaman;
      case 'Pengaduan':
        return styles.cardPengaduan;
      default:
        return styles.cardDefault;
    }
  };

  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <Icon name="arrow-back" size={24} color="white" style={styles.icon} 
          onPress={() => navigation.goBack()} 
        />
        <Icon name="home-outline" size={24} color="white" style={styles.icon} 
          onPress={() => navigation.navigate('Beranda')} 
        />
      </View>

      {/* Main Content (Notifications list) */}
      <ScrollView style={styles.scrollView}>
        <View style={styles.titleContainer}>
          <Text style={styles.title}>Notifikasi</Text>
        </View>

        {notifications.map((notif) => (
          <View key={notif.id} style={[styles.card, getCardStyle(notif.judul)]}>
            <Text style={styles.cardText}>{notif.judul}</Text>
            <Text style={styles.cardDetail}>{notif.pesan}</Text>
            <View style={styles.cardFooter}>
              <Text style={styles.cardDate}>{notif.tgl}</Text>
            </View>
          </View>
        ))}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  
  
  
  
  
  
  cardPeminjaman: {
    backgroundColor: '#2fa5d8', 
  },
  cardPengaduan: {
    backgroundColor: '#22ce83', 
  },
  cardDefault: {
    backgroundColor: '#e0e0e0', // Default gray color
  },
  
  
  




  container: {
    flex: 1,
    backgroundColor: '#2fa5d8',
    paddingHorizontal: 0,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
    justifyContent: 'space-between',
    paddingVertical: 10,
    width: '100%',
    paddingHorizontal: 20,
  },
  icon: {
    padding: 10,
    marginTop: 60,
  },
  scrollView: {
    width: '100%',
    flex: 1,
    backgroundColor: 'white',
    borderTopLeftRadius: 40,
    borderTopRightRadius: 40,
    paddingTop: 20,
    paddingHorizontal: 20,
  },
  card: {
    padding: 15,
    borderRadius: 10,
    marginBottom: 10,
    width: '100%',
  },
  cardText: {
    fontSize: 16,
    color: 'white',
    fontFamily: 'Poppins-Bold', 
  },
  cardDetail: {
    color: 'white',
    fontFamily: 'Poppins', 
  },
  cardFooter: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 10,
  },
  cardDate: {
    color: 'white',
    fontSize: 12,
    fontFamily: 'Poppins', 
  },
  
  titleContainer: {
    backgroundColor: 'white',
    paddingVertical: 15,
    paddingHorizontal: 20,
    justifyContent: 'center',
    marginBottom: 20,
  },
  title: {
    fontSize: 24,
    color: 'black',
    textAlign: 'center',
    fontFamily: 'Poppins-Bold', 
  },
});
