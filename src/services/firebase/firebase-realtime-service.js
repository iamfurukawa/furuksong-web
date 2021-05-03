import firebase from 'firebase/app';

const FirebaseRealtimeService = () => {
  const update = async (key, data) => {
    await firebase.database().ref('/').update({ [key]: data });
  };

  return {
    update,
  };
};

export default FirebaseRealtimeService();
