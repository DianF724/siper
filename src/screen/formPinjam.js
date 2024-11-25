import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, StyleSheet, TouchableOpacity, ScrollView, Alert } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import { useFonts } from 'expo-font';
import { ActivityIndicator } from 'react-native';
import { useNavigation, useRoute } from '@react-navigation/native';
import * as DocumentPicker from 'expo-document-picker';
import { database } from '../../src/screen/firebase.js';
import { ref, push, onValue } from 'firebase/database';
import DateTimePicker from '@react-native-community/datetimepicker';

export default function FormPinjam() {
  const navigation = useNavigation();
  const route = useRoute();
  const [fontsLoaded] = useFonts({
    'Poppins': require('./assets/fonts/Poppins-Regular.ttf'),
    'Poppins-Bold': require('./assets/fonts/Poppins-Bold.ttf'),
  });

  const [dataCount, setDataCount] = useState(0);
  const [formData, setFormData] = useState({
    id: '',
    nama_peminjam: '',
    ruangan: '',
    tgl_pinjam: '',
    wktu_pinjam: '',
    tgl_pengembalian: '',
    wktu_pengembalian: '',
    unit_kerja: '',
    keterangan: '',
    status_pinjam: 'Berhasil diajukan',
  });

  const [jenisRuangan, setJenisRuangan] = useState(route.params?.namaRuangan || '');

  // DateTime picker visibility states
  const [showTglPinjam, setShowTglPinjam] = useState(false);
  const [showWktuPinjam, setShowWktuPinjam] = useState(false);
  const [showTglPengembalian, setShowTglPengembalian] = useState(false);
  const [showWktuPengembalian, setShowWktuPengembalian] = useState(false);

  if (!fontsLoaded) {
    return <ActivityIndicator size="large" color="#2fa5d8" />;
  }

  const handleInputChange = (field, value) => {
    setFormData({ ...formData, [field]: value });
  };

  const handleDateChange = (event, selectedDate, type) => {
    const currentDate = selectedDate || new Date();
    const formattedDate = currentDate.toISOString().slice(0, 10);
    if (type === 'tgl_pinjam') {
      setFormData({ ...formData, tgl_pinjam: formattedDate });
      setShowTglPinjam(false);
    } else if (type === 'tgl_pengembalian') {
      setFormData({ ...formData, tgl_pengembalian: formattedDate });
      setShowTglPengembalian(false);
    } else if (type === 'wktu_pinjam') {
      const time = currentDate.toTimeString().slice(0, 5); // Format as HH:mm
      setFormData({ ...formData, wktu_pinjam: time });
      setShowWktuPinjam(false);
    } else if (type === 'wktu_pengembalian') {
      const time = currentDate.toTimeString().slice(0, 5); // Format as HH:mm
      setFormData({ ...formData, wktu_pengembalian: time });
      setShowWktuPengembalian(false);
    }
  };

  const validateForm = () => {
    if (!formData.nama_peminjam || !jenisRuangan || !formData.tgl_pinjam || !formData.wktu_pinjam || !formData.tgl_pengembalian || !formData.wktu_pengembalian || !formData.unit_kerja) {
      Alert.alert('Error', 'Harap lengkapi semua data wajib.');
      return false;
    }
    return true;
  };

  

  const handleSubmit = async () => {
    if (!validateForm()) return;

    try {
      // Assign ID and add jenis ruangan to formData
      const formDataWithId = {
        ...formData,
        id: dataCount + 1,
        ruangan: jenisRuangan,
      };

      // Push data to Firebase
      const dbRef = ref(database, 'data_peminjaman/');
      await push(dbRef, formDataWithId);

      // Push notification data
      const notificationData = {
        judul: 'Peminjaman',
        pesan: 'Pengajuan peminjaman ruangan berhasil!',
        tgl: new Date().toISOString().slice(0, 10),
      };
      const notificationRef = ref(database, 'notifikasi/');
      await push(notificationRef, notificationData);

      Alert.alert('Berhasil', 'Data berhasil disimpan!');
      navigation.navigate('Sukses');
    } catch (error) {
      console.error(error);
      Alert.alert('Gagal', 'Terjadi kesalahan saat menyimpan data.');
    }
  };

  useEffect(() => {
    const dbRef = ref(database, 'data_peminjaman/');
    onValue(dbRef, (snapshot) => {
      setDataCount(snapshot.size || 0);
    });
  }, []);
  
  

  const pickDocument = async () => {
    try {
      let result = await DocumentPicker.getDocumentAsync({});
      console.log(result);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <ScrollView style={styles.container}>
      <View style={styles.headerContainer}>
        <Icon name="arrow-back" size={24} color="white" style={styles.icon2} onPress={() => navigation.navigate('Pinjam')} />
      </View>

      <View style={styles.formContainer}>
        <Text style={styles.headerText}>Formulir Peminjaman Ruangan</Text>

        {/* Nama Peminjam */}
        <View style={styles.inputContainer}>
          <Icon name="person-outline" size={24} color="black" style={styles.icon} />
          <TextInput
            placeholder="Nama"
            style={styles.input}
            value={formData.nama_peminjam}
            onChangeText={(text) => handleInputChange('nama_peminjam', text)}
          />
        </View>

        {/* Jenis Ruangan */}
        <View style={styles.inputContainer}>
          <Icon name="business-outline" size={24} color="black" style={styles.icon} />
          <TextInput
            placeholder="Jenis Ruangan"
            style={styles.input}
            value={jenisRuangan}
            onChangeText={(text) => setJenisRuangan(text)} // Non-editable
          />
        </View>

        {/* Tanggal dan Waktu Peminjaman */}
        <Text style={styles.sectionLabel}>Waktu peminjaman:</Text>
        <View style={styles.inlineInputContainer}>
          <TouchableOpacity style={styles.inputContainerInline} onPress={() => setShowTglPinjam(true)}>
            <Icon name="calendar-outline" size={24} color="black" style={styles.icon} />
            <Text style={styles.inputInline}>{formData.tgl_pinjam || 'Pilih Tanggal'}</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.inputContainerInline} onPress={() => setShowWktuPinjam(true)}>
            <Icon name="time-outline" size={24} color="black" style={styles.icon} />
            <Text style={styles.inputInline}>{formData.wktu_pinjam || 'Pilih Waktu'}</Text>
          </TouchableOpacity>
        </View>

        {/* Tanggal dan Waktu Pengembalian */}
        <Text style={styles.sectionLabel}>Waktu pengembalian:</Text>
        <View style={styles.inlineInputContainer}>
          <TouchableOpacity style={styles.inputContainerInline} onPress={() => setShowTglPengembalian(true)}>
            <Icon name="calendar-outline" size={24} color="black" style={styles.icon} />
            <Text style={styles.inputInline}>{formData.tgl_pengembalian || 'Pilih Tanggal'}</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.inputContainerInline} onPress={() => setShowWktuPengembalian(true)}>
            <Icon name="time-outline" size={24} color="black" style={styles.icon} />
            <Text style={styles.inputInline}>{formData.wktu_pengembalian || 'Pilih Waktu'}</Text>
          </TouchableOpacity>
        </View>

        {/* Unit Kerja */}
        <View style={styles.inputContainer}>
          <Icon name="briefcase-outline" size={24} color="black" style={styles.icon} />
          <TextInput
            placeholder="Unit Kerja"
            style={styles.input}
            value={formData.unit_kerja}
            onChangeText={(text) => handleInputChange('unit_kerja', text)}
          />
        </View>

        {/* Keterangan */}
        <View style={styles.inputContainer}>
          <Icon name="document-outline" size={24} color="black" style={styles.icon} />
          <TextInput
            placeholder="Keterangan"
            style={styles.input}
            value={formData.keterangan}
            onChangeText={(text) => handleInputChange('keterangan', text)}
          />
        </View>

        <TouchableOpacity style={styles.uploadButton} onPress={pickDocument}>
          <Text style={styles.uploadButtonText}>UPLOAD SURAT REKOMENDASI</Text>
        </TouchableOpacity>

        {/* Save and Cancel Buttons */}
        <View style={styles.buttonRow}>
          <TouchableOpacity style={styles.saveButton} onPress={handleSubmit}>
            <Text style={styles.saveButtonText}>SIMPAN</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.cancelButton} onPress={() => navigation.navigate('Pinjam')}>
            <Text style={styles.cancelButtonText}>BATAL</Text>
          </TouchableOpacity>
        </View>
      </View>

      {/* DateTime Pickers */}
      {showTglPinjam && (
        <DateTimePicker
          value={new Date()}
          mode="date"
          display="default"
          onChange={(event, selectedDate) => handleDateChange(event, selectedDate, 'tgl_pinjam')}
        />
      )}
      {showWktuPinjam && (
        <DateTimePicker
          value={new Date()}
          mode="time"
          display="default"
          onChange={(event, selectedDate) => handleDateChange(event, selectedDate, 'wktu_pinjam')}
        />
      )}
      {showTglPengembalian && (
        <DateTimePicker
          value={new Date()}
          mode="date"
          display="default"
          onChange={(event, selectedDate) => handleDateChange(event, selectedDate, 'tgl_pengembalian')}
        />
      )}
      {showWktuPengembalian && (
        <DateTimePicker
          value={new Date()}
          mode="time"
          display="default"
          onChange={(event, selectedDate) => handleDateChange(event, selectedDate, 'wktu_pengembalian')}
        />
      )}
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
    padding: 15,
  },
  icon2: {
    marginLeft: 10,
  },
  formContainer: {
    padding: 20,
  },
  headerText: {
    fontSize: 24,
    fontFamily: 'Poppins-Bold',
    color: '#333',
    marginBottom: 20,
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
    marginBottom: 15,
  },
  icon: {
    marginRight: 10,
  },
  input: {
    flex: 1,
    fontSize: 16,
    fontFamily: 'Poppins',
    paddingVertical: 10,
    paddingHorizontal: 5,
  },
  inlineInputContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 15,
  },
  inputContainerInline: {
    flexDirection: 'row',
    alignItems: 'center',
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
    width: '48%',
  },
  inputInline: {
    flex: 1,
    fontSize: 16,
    fontFamily: 'Poppins',
    paddingVertical: 10,
  },
  sectionLabel: {
    fontFamily: 'Poppins-Bold',
    fontSize: 16,
    marginBottom: 5,
  },
  uploadButton: {
    backgroundColor: '#4CAF50',
    padding: 10,
    borderRadius: 10,
    marginTop: 20,
  },
  uploadButtonText: {
    color: 'white',
    fontSize: 16,
    textAlign: 'center',
    fontFamily: 'Poppins',
  },
  buttonRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 30,
  },
  saveButton: {
    backgroundColor: '#2fa5d8',
    paddingVertical: 15,
    flex: 0.48,
    alignItems: 'center',
    borderRadius: 10,
  },
  cancelButton: {
    backgroundColor: '#f44336',
    paddingVertical: 15,
    flex: 0.48,
    alignItems: 'center',
    borderRadius: 10,
  },
  saveButtonText: {
    color: 'white',
    fontSize: 18,
    fontFamily: 'Poppins',
  },
  cancelButtonText: {
    color: 'white',
    fontSize: 18,
    fontFamily: 'Poppins',
  },
});
