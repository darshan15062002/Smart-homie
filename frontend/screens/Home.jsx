import { View, Text, Image, TouchableOpacity, ScrollView } from 'react-native'
import React, { useState } from 'react'
import { color, defaultstyling } from '../styles/style'
import Header from '../components/Header'

import { Button, TextInput } from 'react-native-paper'
import { useNavigation } from '@react-navigation/native'
import WebView from 'react-native-webview'

const videos = [{
    name: '9th Geometry maths-2 MAHA IMP  second semester exam annual exam Maharashtra board #exam2023',
    imgUrl: 'https://i9.ytimg.com/vi_webp/yW7sqTxdFNM/mqdefault.webp?v=642bb636&sqp=COzZr6EG&rs=AOn4CLB5i9Jg--_dsGv2w4jOqr_EXbGhTQ',
    Url: 'https://youtu.be/yW7sqTxdFNM'

}, {
    name: '9th Geometry maths-2 MAHA IMP  second semester exam annual exam Maharashtra board #exam2023',
    imgUrl: 'https://i9.ytimg.com/vi_webp/yW7sqTxdFNM/mqdefault.webp?v=642bb636&sqp=COzZr6EG&rs=AOn4CLB5i9Jg--_dsGv2w4jOqr_EXbGhTQ',
    Url: 'https://youtu.be/yW7sqTxdFNM'

}, {
    name: '9th Geometry maths-2 MAHA IMP  second semester exam annual exam Maharashtra board #exam2023',
    imgUrl: 'https://i9.ytimg.com/vi_webp/yW7sqTxdFNM/mqdefault.webp?v=642bb636&sqp=COzZr6EG&rs=AOn4CLB5i9Jg--_dsGv2w4jOqr_EXbGhTQ',
    Url: 'https://youtu.be/yW7sqTxdFNM'

}, {
    name: '9th Geometry maths-2 MAHA IMP  second semester exam annual exam Maharashtra board #exam2023',
    imgUrl: 'https://i9.ytimg.com/vi_webp/yW7sqTxdFNM/mqdefault.webp?v=642bb636&sqp=COzZr6EG&rs=AOn4CLB5i9Jg--_dsGv2w4jOqr_EXbGhTQ',
    Url: 'https://youtu.be/yW7sqTxdFNM'

}, {
    name: '9th Geometry maths-2 MAHA IMP  second semester exam annual exam Maharashtra board #exam2023',
    imgUrl: 'https://i9.ytimg.com/vi_webp/yW7sqTxdFNM/mqdefault.webp?v=642bb636&sqp=COzZr6EG&rs=AOn4CLB5i9Jg--_dsGv2w4jOqr_EXbGhTQ',
    Url: 'https://youtu.be/yW7sqTxdFNM'

}]

const Home = () => {
    const [active, setActive] = useState('Science')
    const [text, setText] = useState("");
    const navigate = useNavigation()
    const std = ['Science', 'Algebra', 'Geometry', 'History', 'Geography', 'English']
    const handleStd = (id) => {
        setActive(id)
        console.log(id);
    }

    return (
        <View style={defaultstyling}>
            <Header />
            <View style={{ flexDirection: 'row', height: 100, marginTop: 50 }}>
                <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={{ alignItems: 'center' }} >
                    {std.map((item, index) => (
                        <Button style={{ backgroundColor: active == item ? 'blue' : color.color5, borderRadius: 100, margin: 5, top: 5 }} onPress={() => handleStd(item)} >
                            <Text style={{ fontSize: 15, color: active == item ? 'white' : 'blue', fontWeight: '900' }} key={item}>
                                {item}
                            </Text>
                        </Button>
                    ))}



                </ScrollView>
            </View>
            <View style={{ flex: 1, width: '100%' }}>
                <ScrollView showsVerticalScrollIndicator={false} style={{ top: 10, backgroundColor: 'white' }}>
                    {videos.map((item, index) => (
                        <TouchableOpacity style={{ padding: 10, elevation: 12, }}>
                            <Image source={{ uri: item.imgUrl }}
                                style={{ width: '100%', height: 200, borderRadius: 10 }}
                            />
                            <WebView

                                source={{ uri: item.Url }}
                            />
                            <Text>{item.name}</Text>
                        </TouchableOpacity>))}

                </ScrollView>

            </View>




        </View>
    )
}

export default Home