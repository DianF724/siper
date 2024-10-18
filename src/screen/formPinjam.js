import React, { useState } from 'react';
import { View, Text, TextInput, StyleSheet, TouchableOpacity, ScrollView, Alert } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons'; // Import Ionicons for icons
import { useFonts } from 'expo-font';
import { ActivityIndicator } from 'react-native';
import { useNavigation } from '@react-navigation/native';


export default function FormPinjam() {
  const navigation = useNavigation();
  const [fontsLoaded] = useFonts({
    'Poppins': require('./assets/fonts/Poppins-Regular.ttf'),
    'Poppins-Bold': require('./assets/fonts/Poppins-Bold.ttf'),
  });

  if (!fontsLoaded) {
    return <ActivityIndicator size="large" color="#2fa5d8" />;
  }

  const [fileResponse, setFileResponse] = useState(null);

  // Function to handle file selection
 

  return (
    <ScrollView style={styles.container}>
      {/* Header */}
      <View style={styles.headerContainer}>
        <Icon name="arrow-back" size={24} color="white" style={styles.icon2} onPress={() => navigation.navigate('Pinjam')}/>
      </View>

      {/* Form Container */}
      <View style={styles.formContainer}>
        {/* Title */}
        <Text style={styles.headerText}>Formulir Peminjaman Ruangan</Text>

        {/* Name Field */}
        <View style={styles.inputContainer}>
          <Icon name="person-outline" size={24} color="black" style={styles.icon} />
          <TextInput placeholder="Nama" style={styles.input} />
        </View>

        {/* Room Type Field */}
        <View style={styles.inputContainer}>
          <Icon name="business-outline" size={24} color="black" style={styles.icon} />
          <TextInput placeholder="Jenis Ruangan" style={styles.input} />
        </View>

        {/* Borrow Time */}
        <Text style={styles.sectionLabel}>Waktu peminjaman:</Text>
        <View style={styles.inlineInputContainer}>
          <View style={styles.inputContainerInline}>
            <Icon name="calendar-outline" size={24} color="black" style={styles.icon} />
            <TextInput placeholder="Tanggal" style={styles.inputInline} />
          </View>
          <View style={styles.inputContainerInline}>
            <Icon name="time-outline" size={24} color="black" style={styles.icon} />
            <TextInput placeholder="Waktu" style={styles.inputInline} />
          </View>
        </View>

        {/* Return Time */}
        <Text style={styles.sectionLabel}>Waktu pengembalian:</Text>
        <View style={styles.inlineInputContainer}>
          <View style={styles.inputContainerInline}>
            <Icon name="calendar-outline" size={24} color="black" style={styles.icon} />
            <TextInput placeholder="Tanggal" style={styles.inputInline} />
          </View>
          <View style={styles.inputContainerInline}>
            <Icon name="time-outline" size={24} color="black" style={styles.icon} />
            <TextInput placeholder="Waktu" style={styles.inputInline} />
          </View>
        </View>

        {/* Unit Field */}
        <View style={styles.inputContainer}>
          <Icon name="briefcase-outline" size={24} color="black" style={styles.icon} />
          <TextInput placeholder="Unit Kerja" style={styles.input} />
        </View>

        {/* Description Field */}
        <View style={styles.inputContainer}>
          <Icon name="document-outline" size={24} color="black" style={styles.icon} />
          <TextInput placeholder="Keterangan" style={styles.input} />
        </View>

        {/* Upload Button */}
        <TouchableOpacity style={styles.uploadButton}>
          <Text style={styles.uploadButtonText}>UPLOAD SURAT REKOMENDASI</Text>
        </TouchableOpacity>

        {/* Save & Cancel Buttons */}
        <View style={styles.buttonRow}>
          <TouchableOpacity style={styles.saveButton} onPress={() => navigation.navigate('Sukses')}>
            <Text style={styles.saveButtonText}>SIMPAN</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.cancelButton} onPress={() => navigation.navigate('Pinjam')}>
            <Text style={styles.cancelButtonText}>BATAL</Text>
          </TouchableOpacity>
        </View>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
  },
  headerContainer: {
    backgroundColor: '#2fa5d8',
    padding: 20,
    flexDirection: 'row',
    alignItems: 'center',
    borderBottomLeftRadius:40,
    borderBottomRightRadius:40,
  },
  headerText: {
    color: 'black',
    fontSize: 18,
    fontFamily: 'Poppins-Bold',
    textAlign: 'center',
    marginBottom: 20,
  },
  formContainer: {
    padding: 20,
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 15,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
  },
  inputContainerInline: {
    flexDirection: 'row',
    alignItems: 'center',
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
    marginBottom: 15,
    flex: 1,
    marginRight: 10,
  },
  icon: {
    marginRight: 10,
    
  },
  icon2: {
    marginRight: 10,
    marginTop: 30,
    marginBottom: 20,
  },
  input: {
    flex: 1,
    fontSize: 16,
    fontFamily: 'Poppins',
  },
  inputInline: {
    flex: 1,
    fontSize: 14,
    fontFamily: 'Poppins',
  },
  inlineInputContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 15,
  },
  sectionLabel: {
    fontFamily: 'Poppins-Bold',
    marginBottom: 5,
  },
  uploadButton: {
    backgroundColor: '#2fa5d8',
    padding: 15,
    borderRadius: 10,
    alignItems: 'center',
    marginBottom: 20,
  },
  uploadButtonText: {
    color: 'white',
    fontFamily: 'Poppins-Bold',
  },
  buttonRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  saveButton: {
    backgroundColor: '#22ce83',
    flex: 1,
    padding: 15,
    borderRadius: 10,
    alignItems: 'center',
    marginRight: 10,
  },
  saveButtonText: {
    color: 'white',
    fontFamily: 'Poppins-Bold',
  },
  cancelButton: {
    backgroundColor: '#FF5C5C',
    flex: 1,
    padding: 15,
    borderRadius: 10,
    alignItems: 'center',
  },
  cancelButtonText: {
    color: 'white',
    fontFamily: 'Poppins-Bold',
  },
});
