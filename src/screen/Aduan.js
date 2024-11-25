// Tambahkan import Firebase
import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, TextInput, TouchableOpacity, Alert, Platform } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import { useNavigation } from '@react-navigation/native';
import * as ImagePicker from 'expo-image-picker';
import { Picker } from '@react-native-picker/picker';
import { getDatabase, ref, push, get } from 'firebase/database';
import app from '../../src/screen/firebase'; // Pastikan konfigurasi Firebase sudah benar

export default function AduanScreen() {
  const [image, setImage] = useState(null);
  const [selectedRoom, setSelectedRoom] = useState('');
  const [rooms, setRooms] = useState([]); // State untuk menyimpan data ruangan
  const [description, setDescription] = useState('');
  const navigation = useNavigation();

  useEffect(() => {
    // Meminta izin akses galeri
    (async () => {
      if (Platform.OS !== 'web') {
        const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
        if (status !== 'granted') {
          alert('Maaf, kami membutuhkan perizinan akses kamera agar dapat bekerja!');
        }
      }
    })();

    // Fetch data ruangan dari Firebase
    const fetchRooms = async () => {
      const db = getDatabase(app);
      const roomsRef = ref(db, 'ruangan'); // Pastikan path ini sesuai dengan Firebase

      try {
        const snapshot = await get(roomsRef);
        if (snapshot.exists()) {
          const data = snapshot.val();
          const formattedRooms = Object.entries(data).map(([key, value]) => ({
            id: key, // Gunakan key Firebase sebagai id
            ...value,
          }));
          setRooms(formattedRooms);
        } else {
          console.log('Tidak ada data ditemukan.');
        }
      } catch (error) {
        console.error('Error fetching rooms:', error);
      }
    };

    fetchRooms();
  }, []);

  const pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    if (!result.canceled) {
      setImage(result.assets[0].uri);
    }
  };

  const handleSubmit = async () => {
    if (!selectedRoom || !description) {
      Alert.alert('Form tidak lengkap', 'Harap lengkapi semua bidang sebelum mengirim.');
      return;
    }

    try {
      const db = getDatabase(app);
      const aduanRef = ref(db, 'data_aduan'); // Referensi ke lokasi data "data_aduan"

      const snapshot = await get(aduanRef);
      const dataCount = snapshot.exists() ? Object.keys(snapshot.val()).length : 0;

      const newAduan = {
        id: dataCount + 1,
        ruangan: selectedRoom,
        isi_aduan: description,
        bukti_foto: image || '',
        waktu: new Date().toISOString().slice(0, 10),
        status_aduan: 'Sedang diproses'
      };

      const notificationData = {
        judul: 'Pengaduan',
        pesan: 'Pengaduan ruangan berhasil diajukan!',
        tgl: new Date().toISOString().slice(0, 10),
      };
      const notificationRef = ref(db, 'notifikasi/');
      await push(notificationRef, notificationData);

      await push(aduanRef, newAduan);

      Alert.alert(
        'Pengaduan Terkirim!',
        'Pengaduan Anda telah berhasil dikirim.',
        [
          {
            text: 'OK',
            onPress: () => navigation.navigate('Histori', { status: 'active' }),
          },
        ],
        { cancelable: false }
      );

      // Reset form
      setSelectedRoom('');
      setDescription('');
      setImage(null);
    } catch (error) {
      console.error('Error saat mengirim pengaduan:', error);
      Alert.alert('Error', 'Terjadi kesalahan saat mengirim pengaduan. Coba lagi nanti.');
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Icon
          name="arrow-back"
          size={24}
          color="white"
          style={styles.icon}
          onPress={() => navigation.navigate('Beranda')}
        />
        <TextInput
          style={styles.searchInput}
          placeholder="Cari di sini..."
          placeholderTextColor="#999"
        />
        <Icon
          name="notifications-outline"
          size={24}
          color="white"
          style={styles.icon}
          onPress={() => navigation.navigate('Notif')}
        />
      </View>

      <View style={styles.titleContainer}>
        <Text style={styles.titleText}>Form Pengaduan</Text>
      </View>

      <View style={styles.whiteContainer}>
        <Text style={styles.formText}>Isi form di bawah ini</Text>

        <View style={styles.inputContainer}>
          <Text style={styles.inputLabel}>Pilih Ruangan</Text>
          <Picker
            selectedValue={selectedRoom}
            onValueChange={(itemValue) => setSelectedRoom(itemValue)}
            style={styles.picker}
          >
            {rooms.length > 0 ? (
              rooms.map((ruangan) => (
                <Picker.Item key={ruangan.id} label={ruangan.nama} value={ruangan.nama} />
              ))
            ) : (
              <Picker.Item label="Tidak ada ruangan tersedia" value="" />
            )}
          </Picker>
        </View>

        <View style={styles.inputContainer}>
          <Text style={styles.inputLabel}>Deskripsi Pengaduan</Text>
          <TextInput
            style={styles.textArea}
            multiline
            numberOfLines={4}
            placeholder="Deskripsi masalah yang Anda hadapi..."
            value={description}
            onChangeText={(text) => setDescription(text)}
          />
        </View>

        <View style={styles.inputContainer}>
          <Text style={styles.inputLabel}>Upload Dokumen</Text>
          <TouchableOpacity style={styles.uploadButton} onPress={pickImage}>
            <Icon name="cloud-upload-outline" size={24} color="white" />
            <Text style={styles.uploadButtonText}> Upload Bukti Foto</Text>
          </TouchableOpacity>
        </View>

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
