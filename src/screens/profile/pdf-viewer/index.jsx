/**React Imports */
import React, {useEffect, useState} from 'react'
import {
  View,
  Button,
  Text,
  ActivityIndicator,
  Dimensions,
  TouchableOpacity,
  Alert,
  Platform,
  PermissionsAndroid,
  Linking,
} from 'react-native'

/**Libraries */
import Pdf from 'react-native-pdf'
import EStyleSheet from 'react-native-extended-stylesheet'
import {getDeviceType} from 'react-native-device-info'
import {useNavigation, useRoute, useTheme} from '@react-navigation/native'
import RNFS from 'react-native-fs'

/**Components */
import Layout from '../../../components/layout'

/**Local Imports */
import { BASE_URL } from '../../../constants/url'
import { IconProps } from '../../../utils/helpers/iconprops'

/**Icons */
import FileDownloadIcon from '../../../../assets/icons/file-download.svg'

let deviceType = getDeviceType()

/**Main Export */
const PdfViewer = () => {
    
    const navigation = useNavigation()
    const route = useRoute()

    const {colors} = useTheme()

    const {id, invoice_id, token} = route.params
    
    const [pdfUri, setPdfUri] = useState(null)
    async function requestStoragePermission() {
        try {
        if (Platform.OS === 'android' && Platform.Version < 33) {
            const granted = await PermissionsAndroid.request(
            PermissionsAndroid.PERMISSIONS.WRITE_EXTERNAL_STORAGE,
            {
                title: 'Storage Permission Required',
                message: 'This app needs access to your storage to download files.',
                buttonNeutral: 'Ask Me Later',
                buttonNegative: 'Cancel',
                buttonPositive: 'OK',
            },
            )

            if (granted === PermissionsAndroid.RESULTS.GRANTED) {
                console.log('Storage permission granted')
            return true
            } else {
                console.log('Storage permission denied')
            return false
            }
        } else {
            return true
        }
        } catch (err) {
        console.warn(err)
        return false
        }
    }

    const downloadPdf = async () => {
        const pdfUrl = BASE_URL.url + `/invoices/download/${id}`
        let destinationPath = `${RNFS.DocumentDirectoryPath}/${invoice_id}.pdf`
        if (Platform.OS === 'android') {
        if (!(await requestStoragePermission())) {
            Alert.alert(
            'Tilladelse afvist',
            'Appen har ikke fået tilladelse til at tilgå lageret. Kontroller venligst dine indstillinger.',
            [{text: 'OK'}],
            )
            return
        }
        console.log(await RNFS.exists(RNFS.DownloadDirectoryPath), 'exits')
        if (!(await RNFS.exists(RNFS.DownloadDirectoryPath))) {
            await RNFS.mkdir(RNFS.DownloadDirectoryPath)
            destinationPath = `${RNFS.DownloadDirectoryPath}/${invoice_id}.pdf`
        } else {
            destinationPath = `${RNFS.DownloadDirectoryPath}/${invoice_id}.pdf`
        }
        }

        const options = {
        fromUrl: pdfUrl,
        toFile: destinationPath,
        headers: {
            Authorization: `Bearer ${token}`,
        },
        background: true, // runs the download on a background thread
        begin: res => {
            console.log('Download has begun')
        },
        progress: res => {
            const percentage = (res.bytesWritten / res.contentLength) * 100
            console.log(`Progress: ${Math.round(percentage)}%`)
        },
        }

        try {
        const result = await RNFS.downloadFile(options).promise
        if (result.statusCode === 200) {
            console.log('File downloaded successfully:', destinationPath)
            const message = Platform.select({
            ios: 'Filen er gemt i appens dokumentmappe. Du kan finde den i “På min iPhone” eller “ På min iPad, i “Filer” appen.',
            android:
                'Filen er blevet gemt i "Downloads" mappen. Du kan tilgå den fra din enheds filhåndtering under "Downloads" mappen.',
            })
            Alert.alert('Fil gemt', message, [{text: 'OK'}])
        } else {
            console.error('Server returned an error:', result.statusCode)
        }
        } catch (error) {
        console.error('Error downloading the file:', error)
        }
    }

    // Function to fetch the PDF using the id and token
    const fetchPdf = () => {
        // Use the id and token to fetch the PDF
        // Replace this with your actual fetch logic
        const pdfUrl = BASE_URL.url + `/invoices/download/${id}`

        fetch(pdfUrl, {
        method: 'GET',
        headers: {
            Authorization: `Bearer ${token}`,
        },
        })
        .then(response => response.blob())
        .then(blob => {
            const reader = new FileReader()
            reader.onload = async function () {
            if (Platform.OS === 'android') {
                const base64data = reader.result.split(',')[1]
                const path = `${RNFS.DocumentDirectoryPath}/temp.pdf`
                await RNFS.writeFile(path, base64data, 'base64')
                setPdfUri(`file://${path}`)
            } else {
                const uri = URL.createObjectURL(blob)
                setPdfUri(uri)
            }
            }
            reader.readAsDataURL(blob)
        })
        .catch(error => console.error('Error fetching PDF:', error, id, token))
    }

    useEffect(() => {
        fetchPdf()
    }, [])

    return (
        <Layout {...{title: 'Faktura', navigation, ShouldShowBack: true}}>
            <View style={styles.container}>
                {!pdfUri ? (
                <View style={styles.EmptyContainer}>
                    <ActivityIndicator color={colors.primary} size={'large'} />
                </View>
                ) : (
                <Pdf
                    source={{uri: pdfUri, cache: true}}
                    onLoadComplete={(numberOfPages, filePath) => {
                        console.log(`Number of pages: ${numberOfPages}`, id)
                    }}
                    onPageChanged={(page, numberOfPages) => {
                        console.log(`Current page: ${page}`)
                    }}
                    onError={error => {
                        console.error('Error displaying PDF:', error)
                    }}
                    style={styles.pdf}
                />
                )}
            </View>
            <TouchableOpacity style={styles.Back_Btn} onPress={() => downloadPdf()}>
                <FileDownloadIcon
                    name="file-download"
                    {...IconProps(14)}
                    style={[styles.Back_Btn_Icon, {color: colors.text}]}
                />
                <Text style={[styles.Back_Btn_Text, {color: colors.text}]}>
                    Download
                </Text>
            </TouchableOpacity>
        </Layout>
    )
}

const styles = EStyleSheet.create({
  header: {
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'center',
    padding: 10,
    backgroundColor: '#f2f2f2',
  },
  container: {
    flex: 1,
    justifyContent: 'flex-start',
    alignItems: 'center',
    marginTop: 25,
  },
  pdf: {
    flex: 1,
    width: Dimensions.get('window').width,
    height: Dimensions.get('window').height - 300,
  },
  Back_Btn: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: deviceType === 'Tablet' ? '11rem' : '16rem',
  },
  Back_Btn_Icon: {
    fontSize: deviceType === 'Tablet' ? '10rem' : '14rem',
    marginRight: deviceType === 'Tablet' ? '5rem' : '8rem',
  },
  Back_Btn_Text: {
    fontSize: deviceType === 'Tablet' ? '11rem' : '16rem',
    fontFamily: 'Sen-Bold',
  },
})

export default PdfViewer
