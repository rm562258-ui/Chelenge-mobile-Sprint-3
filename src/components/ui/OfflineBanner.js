import { useEffect, useState } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { subscribeNetworkStatus } from '../../utils/networkStatus';

export default function OfflineBanner() {
  const [offline, setOffline] = useState(false);

  useEffect(() => subscribeNetworkStatus(setOffline), []);

  if (!offline) return null;
  return <View style={styles.banner}><Text style={styles.text}>Você está offline. Algumas ações podem ficar indisponíveis.</Text></View>;
}

const styles = StyleSheet.create({ banner: { position: 'absolute', top: 0, left: 0, right: 0, padding: 10, backgroundColor: '#B45309', zIndex: 20 }, text: { color: '#FFFFFF', textAlign: 'center', fontWeight: '700' } });
