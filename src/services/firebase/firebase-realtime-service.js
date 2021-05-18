import firebase from 'firebase/app';

const FirebaseRealtimeService = () => {
  const update = async (key, data, ip, discordId) => {
    await firebase.database().ref('/').update({
      [key]: `${data} ${discordId} ${ip}`,
    });
  };

  return {
    update,
  };
};

export default FirebaseRealtimeService();
