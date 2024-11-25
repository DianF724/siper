import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, TextInput, TouchableOpacity, ScrollView, ActivityIndicator } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons'; // For icons
import { useNavigation } from '@react-navigation/native';
import { useFonts } from 'expo-font';
import { ref, onValue } from 'firebase/database';
import { database } from '../../src/screen/firebase.js';

export default function HistoriScreen() {
  const navigation = useNavigation();
  const [activeTab, setActiveTab] = useState('peminjaman');
  const [borrowData, setBorrowData] = useState([]); // State for borrowing history
  const [reportData, setReportData] = useState([]); // State for complaint history
  const [loading, setLoading] = useState(true); // State for loading indicator

  const [fontsLoaded] = useFonts({
    'Poppins': require('./assets/fonts/Poppins-Regular.ttf'),
    'Poppins-Bold': require('./assets/fonts/Poppins-Bold.ttf'),
  });

  useEffect(() => {
    // Fetch borrowing data
    const borrowRef = ref(database, 'data_peminjaman');
    const unsubscribeBorrow = onValue(borrowRef, (snapshot) => {
      const data = snapshot.val();
      if (data) {
        const formattedBorrowData = Object.keys(data).map((key) => ({
          id: key,
          ...data[key],
        }));
        setBorrowData(formattedBorrowData);
      }
      setLoading(false);
    });

    // Fetch report data
    const reportRef = ref(database, 'data_aduan');
    const unsubscribeReport = onValue(reportRef, (snapshot) => {
      const data = snapshot.val();
      if (data) {
        const formattedReportData = Object.keys(data).map((key) => ({
          id: key,
          ...data[key],
        }));
        setReportData(formattedReportData);
      }
      setLoading(false);
    });

    return () => {
      unsubscribeBorrow();
      unsubscribeReport();
    };
  }, []);

  if (!fontsLoaded || loading) {
    return <ActivityIndicator size="large" color="#2fa5d8" style={{ flex: 1, justifyContent: 'center' }} />;
  }

  return (
    <View style={styles.container}>
      {/* Header section */}
      <View style={styles.header}>
        <Icon
          name="arrow-back"
          size={24}
          color="white"
          style={styles.icon}
          onPress={() => navigation.goBack()}
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

      {/* Button row for Borrowing History and Complaint History */}
      <View style={styles.buttonRow}>
        <TouchableOpacity
          style={[styles.titleButton, activeTab === 'peminjaman' ? styles.activeTab : styles.inactiveTab]}
          onPress={() => setActiveTab('peminjaman')}
        >
          <Text style={[styles.buttonText, activeTab === 'peminjaman' ? styles.activeText : styles.inactiveText]}>
            Histori Peminjaman
          </Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={[styles.aduanButton, activeTab === 'pengaduan' ? styles.activeTab : styles.inactiveTab]}
          onPress={() => setActiveTab('pengaduan')}
        >
          <Text style={[styles.buttonText, activeTab === 'pengaduan' ? styles.activeText : styles.inactiveText]}>
            Histori Pengaduan
          </Text>
        </TouchableOpacity>
      </View>

      {/* Main content (history list) */}
      <ScrollView style={styles.scrollView}>
        {activeTab === 'peminjaman' ? (
          borrowData.map((item) => (
            <View key={item.id} style={styles.card}>
              <View style={styles.cardHeader}>
                <Icon name="person-circle-outline" size={24} color="white" style={styles.userIcon} />
                <Text style={styles.cardText}>{item.judul || `Peminjaman #${item.id}`}</Text>
              </View>

              <View style={styles.tableContainer}>
                <View style={styles.tableRow}>
                  {/* Kolom Kiri */}
                  <View style={styles.tableColumn}>
                    <Text style={styles.cardDetail2}>Ruang:</Text>
                  </View>
                  {/* Kolom Kanan */}
                  <View style={styles.tableColumn}>
                    <Text style={styles.cardDetail2}>{item.ruangan}</Text>
                  </View>
                </View>

                <View style={styles.tableRow}>
                  {/* Kolom Kiri */}
                  <View style={styles.tableColumn}>
                    <Text style={styles.cardDetail2}>Waktu Pinjam:</Text>
                  </View>
                  {/* Kolom Kanan */}
                  <View style={styles.tableColumn}>
                    <Text style={styles.cardDetail2}>{item.tgl_pinjam}</Text>
                  </View>
                </View>

                <View style={styles.tableRow}>
                  {/* Kolom Kiri */}
                  <View style={styles.tableColumn}>
                    <Text style={styles.cardDetail2}>Waktu Pengembalian:</Text>
                  </View>
                  {/* Kolom Kanan */}
                  <View style={styles.tableColumn}>
                    <Text style={styles.cardDetail2}>{item.tgl_pengembalian}</Text>
                  </View>
                </View>

                <View style={styles.tableRow}>
                  {/* Kolom Kiri */}
                  <View style={styles.statusContainer(item.status_pinjam)}>
                    <Text style={styles.cardStatus}>{item.status_pinjam}</Text>
                  </View>
                  {/* Kolom Kanan */}
                  <View style={styles.tableColumn}>

                  </View>
                </View>
              </View>
            </View>
          ))
        ) : (
          reportData.map((item) => (
            <View key={item.id} style={styles.card}>
              <View style={styles.cardHeader}>
                <Icon name="person-circle-outline" size={24} color="white" style={styles.userIcon} />
                <Text style={styles.cardText}>{item.judul || `Pengaduan #${item.id}`}</Text>
              </View>

              {/* Tabel dengan Dua Kolom */}
              <View style={styles.tableContainer}>
                <View style={styles.tableRow}>
                  {/* Kolom Kiri */}
                  <View style={styles.tableColumn}>
                    <Text style={styles.cardDetail2}>Ruang:</Text>
                  </View>
                  {/* Kolom Kanan */}
                  <View style={styles.tableColumn}>
                    <Text style={styles.cardDetail2}>{item.ruangan}</Text>
                  </View>
                </View>

                <View style={styles.tableRow}>
                  {/* Kolom Kiri */}
                  <View style={styles.tableColumn}>
                    <Text style={styles.cardDetail2}>Masalah:</Text>
                  </View>
                  {/* Kolom Kanan */}
                  <View style={styles.tableColumn}>
                    <Text style={styles.cardStatus2}>{item.isi_aduan}</Text>
                  </View>
                </View>

                <View style={styles.tableRow}>
                  {/* Kolom Kiri */}
                  <View style={styles.tableColumn}>
                    <Text style={styles.cardDetail2}>Bukti:</Text>
                  </View>
                  {/* Kolom Kanan Kosong */}
                  <View style={styles.tableColumn}>
                    <Text style={styles.cardDetail2}>{item.bukti_foto || '-'}</Text>
                  </View>
                </View>

                <View style={styles.tableRow}>
                  {/* Kolom Kiri */}
                  <View style={styles.tableColumn}>
                    <Text style={styles.cardDetail2}>Tanggal:</Text>
                  </View>
                  {/* Kolom Kanan Kosong */}
                  <View style={styles.tableColumn}>
                    <Text style={styles.cardStatus2}>{item.waktu}</Text>
                  </View>
                </View>

                <View style={styles.tableRow}>
                  {/* Kolom Kiri */}
                  <View style={styles.tableColumn}>
                    
                  </View>
                  {/* Kolom Kanan Kosong */}
                  <View style={styles.tableColumn}>
                    <View style={styles.statusContainer(item.status_aduan)}>
                      <Text style={styles.cardStatus}>{item.status_aduan}</Text>
                    </View>
                  </View>
                </View>
              </View>
            </View>




          ))
        )}
      </ScrollView>
    </View>
  );
}




const styles = StyleSheet.create({

  card: {
    backgroundColor: '#fff',
    borderRadius: 8,
    padding: 16,
    marginBottom: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  cardHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
  },
  userIcon: {
    marginRight: 8,
  },
  cardText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
  },
  tableContainer: {
    marginTop: 8,
    borderTopWidth: 1,
    borderTopColor: '#ccc',
    paddingTop: 8,
  },
  tableRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 8,
  },
  tableColumn: {
    flex: 1,
    paddingHorizontal: 4,

  },
  statusContainer: (status) => ({
    backgroundColor: status === 'active' ? '#4CAF50' : '#FF9800',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 4,
    marginTop: 4,
  }),
  cardStatus2: {
    color: '#fff',
    fontWeight: 'bold',
    textAlign: 'center',
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
  searchInput: {
    flex: 1,
    marginTop: 60,
    marginHorizontal: 10,
    backgroundColor: '#f0f0f0',
    borderRadius: 20,
    paddingHorizontal: 15,
    height: 40,
  },
  icon: {
    padding: 10,
    marginTop: 60,
  },
  buttonRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 20,
    width: '100%',
    paddingHorizontal: 20,
  },
  titleButton: {
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 20,
    width: '48%',
    alignItems: 'center',
  },
  aduanButton: {
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 20,
    width: '48%',
    alignItems: 'center',
  },
  activeTab: {
    backgroundColor: '#7d7d7d', // Gray background for active tab
  },
  inactiveTab: {
    backgroundColor: '#ffffff', // White background for inactive tab
  },
  buttonText: {
    fontFamily: 'Poppins-Bold',
    fontSize: 11
  },
  activeText: {
    color: 'white', // White text for active tab
  },
  inactiveText: {
    color: 'black', // Black text for inactive tab
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
    fontFamily: 'Poppins-Bold',
    color: 'white',
  },
  cardDetail: {
    fontFamily: 'Poppins',
    color: '#f0f0f0',
    marginTop: 5,
  },
  statusContainer: (status) => ({
    backgroundColor: status === 'Menunggu Konfirmasi' ? '#FFB233' : '#A1C63D',
    borderRadius: 10,
    paddingVertical: 5,
    paddingHorizontal: 10,
    marginTop: 10,
    alignSelf: 'flex-start', // Aligns to the left
  }),
  cardStatus: {
    color: 'white',
    fontFamily: 'Poppins-Bold',
  },
  cardHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
  },
  userIcon: {
    marginRight: 10,
  },
  cardDetail2: {
    fontFamily: 'Poppins',
    color: '#f0f0f0',
    marginTop: 5,
  },
  cardFooter2: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 10,
  },
  cardDate: {
    fontFamily: 'Poppins',
    color: '#f0f0f0',
  },
  cardStatus2: {
    color: 'white',
    fontFamily: 'Poppins-Bold',
    marginTop: 5
  },
});
