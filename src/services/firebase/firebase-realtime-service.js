import firebase from 'firebase/app';

const FirebaseRealtimeService = () => {
  const update = async (key, data, ip) => {
    await firebase.database().ref('/').update({
      [key]: `${data} ${ip}`,
    });
  };

  return {
    update,
  };
};

export default FirebaseRealtimeService();
