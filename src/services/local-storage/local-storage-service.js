const LocalStorageService = () => {
  const saveVersion = (version) => localStorage.setItem('app_version', version);

  const getVersion = () => localStorage.getItem('app_version');

  const saveSounds = (sounds) => {
    const soundsStr = JSON.stringify({ sounds });
    localStorage.setItem('sounds', soundsStr);
  };

  const getSounds = () => {
    const soundsStr = localStorage.getItem('sounds');
    return soundsStr ? JSON.parse(soundsStr).sounds : null;
  };

  const saveLikes = (likes) => {
    const likesStr = JSON.stringify({ likes });
    localStorage.setItem('likes', likesStr);
  };

  const getLikes = () => {
    const likesStr = localStorage.getItem('likes');
    return likesStr ? JSON.parse(likesStr).likes : [];
  };

  return {
    saveVersion,
    getVersion,
    saveSounds,
    getSounds,
    saveLikes,
    getLikes,
  };
};

export default LocalStorageService();
