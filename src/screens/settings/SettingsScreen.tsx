import { View, Text, TouchableOpacity } from 'react-native';
import { commonStyles } from '../../styles/common';
import { useAuth } from '../../context/AuthContext';

export default function SettingsScreen() {  
    const { logout } = useAuth();
    return (
        <View style={commonStyles.container}>
            <Text style={commonStyles.title}>Settings</Text>
            <TouchableOpacity style={ commonStyles.button } onPress={logout}>
                <Text style={ commonStyles.buttonText }>Logout</Text>
            </TouchableOpacity>
        </View>
    );
}