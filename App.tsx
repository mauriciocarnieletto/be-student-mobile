import React, { useEffect, useState } from 'react';
import { WebView } from 'react-native-webview';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Text, Button, StyleSheet, TextInput, View } from 'react-native';
import { storage } from './src/storage';

const STORAGE_KEY = "user-data";

interface UserData {
  cpf: string;
}

const defaultUserData: UserData = {
  name: "",
  cpf: "",
  course: "Pós Graduação de Gestão Comercial e Vendas"
}

export default function App() {
  const [formData, setFormData] = React.useState<UserData>(defaultUserData);
  const [userData, setUserData] = useState<UserData>();

  const handleFormItemChange = (key: keyof UserData) => (value: string) => setFormData(prev => ({ ...prev, [key]: value }))
  
  const onSubmit = React.useCallback(() => {
    storage.set(STORAGE_KEY, JSON.stringify(formData))
    setUserData(formData);
  }, [formData]);

  useEffect(() => {
    (async () => {
      try {
        const savedData = await storage.get(STORAGE_KEY);
        if (savedData) {
          setUserData(JSON.parse(savedData) as UserData);
        }
      } catch (e) {
        console.error(e);
      }
    })()
  }, [])

  if (userData?.cpf && userData.cpf.length === 11)
    return (
      <SafeAreaView edges={["top"]} style={{ flex: 1 }}>
        <WebView style={{...styles.container, marginTop: 25}} cacheMode="LOAD_CACHE_ELSE_NETWORK" source={{ uri: `https://portaldoaluno.grupouninter.co.uricio.me/${userData.cpf}` }} />
      </SafeAreaView>
    )
  
  return (
    <View style={styles.container}>
      <Text>Dados do usuário</Text>
      <TextInput value={formData.cpf} placeholder="CPF" onChangeText={handleFormItemChange("cpf")} keyboardType="numeric" />
      <Button title="Salvar" onPress={onSubmit} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
});
