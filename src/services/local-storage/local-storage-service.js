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

  return {
    saveVersion,
    getVersion,
    saveSounds,
    getSounds,
  };
};

export default LocalStorageService();
