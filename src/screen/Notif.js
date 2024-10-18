import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, ScrollView, ActivityIndicator } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons'; // Untuk ikon
import { useNavigation } from '@react-navigation/native'; // Untuk navigasi
import { useFonts } from 'expo-font'; // Import font loading

export default function NotifScreen() {
  const navigation = useNavigation();
  const [fontsLoaded] = useFonts({
    'Poppins': require('./assets/fonts/Poppins-Regular.ttf'), // Ensure the path is correct
    'Poppins-Bold': require('./assets/fonts/Poppins-Bold.ttf'), // If you use bold as well
  });

  // Sample data for notifications
  const notifications = [
    {
      id: 1,
      title: "Peminjaman Ruang D 1.1",
      message: "Peminjaman ruang Anda telah dikonfirmasi.",
      date: "21/02/2024",
      status: "Selesai",
    },
    {
      id: 2,
      title: "Pengaduan AC",
      message: "Pengaduan mengenai AC tidak menyala sedang ditindaklanjuti.",
      date: "23/02/2024",
      status: "Sedang Ditindaklanjuti",
    },
    {
      id: 3,
      title: "Peminjaman Ruang D 1.3",
      message: "Peminjaman ruang D 1.3 telah selesai.",
      date: "19/02/2024",
      status: "Selesai",
    },
  ];

  // Wait for fonts to load
  if (!fontsLoaded) {
    return <ActivityIndicator size="large" color="#2fa5d8" />; // Show loading indicator
  }

  return (
    <View style={styles.container}>
      {/* Bagian header */}
      <View style={styles.header}>
        <Icon name="arrow-back" size={24} color="white" style={styles.icon} 
          onPress={() => navigation.goBack()} 
        />
        <Icon name="home-outline" size={24} color="white" style={styles.icon} 
          onPress={() => navigation.navigate('Beranda')} 
        />
      </View>

      {/* Konten utama (daftar notifikasi) */}
      <ScrollView style={styles.scrollView}>
        <View style={styles.titleContainer}>
          <Text style={styles.title}>Notifikasi</Text>
        </View>

        {notifications.map((notif) => (
          <View key={notif.id} style={styles.card}>
            <Text style={styles.cardText}>{notif.title}</Text>
            <Text style={styles.cardDetail}>{notif.message}</Text>
            <View style={styles.cardFooter}>
              <Text style={styles.cardDate}>{notif.date}</Text>
              <View style={styles.statusContainer(notif.status)}>
                <Text style={styles.cardStatus}>
                  {notif.status}
                </Text>
              </View>
            </View>
          </View>
        ))}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
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
    backgroundColor: '#2fa5d8',
    padding: 15,
    borderRadius: 10,
    marginBottom: 10,
    width: '100%',
  },
  cardText: {
    fontSize: 16,
    color: 'white',
    fontFamily: 'Poppins-Bold', // Use Poppins Bold
  },
  cardDetail: {
    color: 'white',
    fontFamily: 'Poppins', // Use Poppins Regular
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
    fontFamily: 'Poppins', // Use Poppins Regular
  },
  cardStatus: {
    fontSize: 12,
    color: 'white',
    fontFamily: 'Poppins-Bold', // Use Poppins Regular
  },
  statusContainer: (status) => ({
    paddingVertical: 5,
    paddingHorizontal: 10,
    borderRadius: 20,
    backgroundColor: status === "Sedang Ditindaklanjuti" ? '#FFC727' : '#22ce83',
  }),
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
