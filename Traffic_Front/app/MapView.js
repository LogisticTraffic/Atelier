import { requestPermissionAndGetToken, onNotificationReceived} from'./firebaseConfig';
 const Mapview= () => {
 const[selectedCoordinates, setSelectedCoordinates] = useState([]);
 const[token, setToken] = useState(null);
 useEffect(() => {
 const getPushToken= async() => {
 const token= awaitrequestPermissionAndGetToken();
 setToken(token);
 };
 getPushToken();
 onNotificationReceived();  // Listenfor incomingnotifications
 }, []);
 // thandlemappress
 const handleMapPress= async(e) => {
 const coordinate= e.nativeEvent.coordinate;
 setSelectedCoordinates([...selectedCoordinates, coordinate]); 
// Sendcoordinatesto backend 
try{
 await axios.post(`${config.API_URL}:${config.port}/Api/Location`, {
 latitude: coordinate.latitude,
 longitude: coordinate.longitude,
 });
 Alert.alert('Succès', 'Les coordonnées ont été envoyées au backend');
 } catch (error) {
 console.error('Erreur lors de l\'envoi des coordonnées:', error);
 Alert.alert('Erreur', 'Impossible d\'envoyer les coordonnées');
 }}};
