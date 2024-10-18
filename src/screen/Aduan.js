import React, { useState } from 'react';
import { View, Text, StyleSheet, TextInput, TouchableOpacity, Alert } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import { useNavigation } from '@react-navigation/native'; 
import { Picker } from '@react-native-picker/picker'; // Pastikan untuk menginstal react-native-picker

export default function AduanScreen() {
  
    const [selectedRoom, setSelectedRoom] = useState('');
    const [description, setDescription] = useState('');
    const navigation = useNavigation();
  
    const handleSubmit = () => {
      // Tambahkan logika untuk menangani pengiriman form
      console.log("Ruangan:", selectedRoom);
      console.log("Deskripsi:", description);
  
      // Menampilkan alert dengan tombol OK yang mengarahkan ke halaman Histori
      Alert.alert(
        'Pengaduan Terkirim!',
        'Pengaduan Anda telah berhasil dikirim.',
        [
          {
            text: 'OK',
            onPress: () => navigation.navigate('Histori', { status: 'active' }), // Navigasi ke halaman Histori dengan parameter 'active'
          },
        ],
        { cancelable: false } 
      );
    };

  return (
    <View style={styles.container}>
      {/* Baris untuk ikon undo, kotak pencarian, dan lonceng notifikasi */}
      <View style={styles.header}>
        <Icon name="arrow-back" size={24} color="white" style={styles.icon} 
        onPress={() => navigation.navigate('Beranda')}/>
        <TextInput
          style={styles.searchInput}
          placeholder="Cari di sini..."
          placeholderTextColor="#999"
        />
        <Icon name="notifications-outline" size={24} color="white" style={styles.icon} 
        onPress={() => navigation.navigate('Notif')}/>
      </View>

      {/* Kontainer untuk judul */}
      <View style={styles.titleContainer}>
        <Text style={styles.titleText}>Form Pengaduan</Text>
      </View>

      {/* Kontainer utama (konten pengaduan) */}
      <View style={styles.whiteContainer}>
        <Text style={styles.formText}>Isi form di bawah ini</Text>

        {/* Dropdown untuk memilih ruangan */}
        <View style={styles.inputContainer}>
          <Text style={styles.inputLabel}>Pilih Ruangan</Text>
          <Picker
            selectedValue={selectedRoom}
            onValueChange={(itemValue) => setSelectedRoom(itemValue)}
            style={styles.picker}
          >
            <Picker.Item label="Ruang A" value="ruang_a" />
            <Picker.Item label="Ruang B" value="ruang_b" />
            <Picker.Item label="Ruang C" value="ruang_c" />
          </Picker>
        </View>

        {/* Textarea untuk deskripsi pengaduan */}
        <View style={styles.inputContainer}>
          <Text style={styles.inputLabel}>Deskripsi Pengaduan</Text>
          <TextInput
            style={styles.textArea}
            multiline
            numberOfLines={4}
            placeholder="Deskripsi masalah yang Anda hadapi..."
            value={description}
            onChangeText={text => setDescription(text)}
          />
        </View>

        {/* Kontainer untuk upload dokumen */}
        <View style={styles.inputContainer}>
          <Text style={styles.inputLabel}>Upload Dokumen</Text>
          <TouchableOpacity style={styles.uploadButton}>
            <Icon name="cloud-upload-outline" size={24} color="white" />
            <Text style={styles.uploadButtonText}>Unggah Bukti Foto</Text>
          </TouchableOpacity>
        </View>

        {/* Tombol Kirim */}
        <TouchableOpacity style={styles.submitButton} onPress={handleSubmit}>
          <Text style={styles.submitButtonText}>Kirim</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    backgroundColor: '#2fa5d8',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
    justifyContent: 'space-between',
    paddingVertical: 10,
    width: '90%',
  },
  searchInput: {
    flex: 1,
    marginTop: 60,
    marginHorizontal: 0,
    backgroundColor: '#f0f0f0',
    borderRadius: 20,
    paddingHorizontal: 15,
    height: 40,
  },
  icon: {
    padding: 10,
    marginTop: 60,
    color: 'white',
  },
  titleContainer: {
    width: '55%',
    alignItems: 'center',
    backgroundColor: 'white',
    paddingVertical: 5,
    borderRadius: 20,
    marginBottom: 20,
  },
  titleText: {
    color: 'black',
    fontSize: 18,
    fontFamily: 'Poppins-Bold',
  },
  whiteContainer: {
    width: '100%',
    flex: 1,
    backgroundColor: 'white',
    borderTopLeftRadius: 40,
    borderTopRightRadius: 40,
    justifyContent: 'flex-start',
    alignItems: 'center',
    paddingTop: 20,
    paddingHorizontal: 20,
  },
  formText: {
    fontSize: 16,
    color: 'black',
    marginBottom: 20,
    fontFamily: 'Poppins',
  },
  inputContainer: {
    width: '100%',
    marginBottom: 20,
  },
  inputLabel: {
    fontSize: 14,
    color: '#333',
    marginBottom: 5,
    fontFamily: 'Poppins',
  },
  picker: {
    width: '100%',
    height: 50,
    backgroundColor: '#f0f0f0',
    borderRadius: 10,
  },
  textArea: {
    width: '100%',
    height: 100,
    backgroundColor: '#f0f0f0',
    borderRadius: 10,
    padding: 10,
    textAlignVertical: 'top',
  },
  uploadButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#2fa5d8',
    paddingVertical: 10,
    borderRadius: 10,
  },
  uploadButtonText: {
    color: 'white',
    fontSize: 16,
    marginLeft: 10,
    fontFamily: 'Poppins',
  },
  submitButton: {
    backgroundColor: '#22ce83',
    paddingVertical: 15,
    paddingHorizontal: 100,
    borderRadius: 10,
    alignItems: 'center',
    marginTop: 20,
  },
  submitButtonText: {
    color: 'white',
    fontSize: 18,
    fontFamily: 'Poppins',
  },
});
