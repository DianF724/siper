import React from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons'; 
import { useNavigation } from '@react-navigation/native';

export default function Sukses() {
  const navigation = useNavigation();
  
  return (
    <View style={styles.container}>
      {/* Teks "Pengajuan Peminjaman Terkirim!" */}
      <Text style={styles.message}>PENGAJUAN PEMINJAMAN TERKIRIM!</Text>
      
      {/* Icon Centang */}
      <View style={styles.iconContainer}>
        <Icon name="checkmark-circle-outline" size={80} color="#2fa5d8" />
      </View>
      
      {/* Tombol Beranda */}
      <TouchableOpacity 
        style={[styles.button, styles.berandaButton]} 
        onPress={() => navigation.navigate('Beranda')}
      >
        <Text style={styles.buttonText}>KEMBALI</Text>
      </TouchableOpacity>
      
      {/* Tombol Laporan Peminjaman */}
      <TouchableOpacity 
        style={[styles.button, styles.laporanButton]} 
        onPress={() => navigation.navigate('Histori')}
      >
        <Text style={styles.buttonText}>LAPORAN PEMINJAMAN</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff',
  },
  message: {
    fontSize: 16,
    fontFamily: 'Poppins-Bold',
    color: '#000',
    marginBottom: 20,
    textAlign: 'center',
  },
  iconContainer: {
    marginBottom: 40,
  },
  button: {
    width: '80%',
    padding: 15,
    borderRadius: 20,
    marginVertical: 10,
    alignItems: 'center',
  },
  berandaButton: {
    backgroundColor: '#FF3B30', // Warna tombol "Beranda"
  },
  laporanButton: {
    backgroundColor: '#2fa5d8', // Warna tombol "Laporan Peminjaman"
  },
  buttonText: {
    fontSize: 16,
    color: '#fff',
    fontFamily: 'Poppins-Bold',
  },
});
