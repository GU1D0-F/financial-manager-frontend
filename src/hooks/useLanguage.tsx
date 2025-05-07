import { useTranslation } from 'react-i18next';
import { useEffect, useState } from 'react';

export const useLanguage = () => {
  const { i18n } = useTranslation();

  const [currentLanguage, setCurrentLanguage] = useState<string>(i18n.language);

  const changeLanguage = (language: string) => {
    i18n.changeLanguage(language);
    localStorage.setItem('language', language);
    setCurrentLanguage(language);
  };

  useEffect(() => {
    const onLangChanged = (lng: string) => setCurrentLanguage(lng);
    i18n.on('languageChanged', onLangChanged);
    return () => {
      i18n.off('languageChanged', onLangChanged);
    };
  }, [i18n]);

  return {
    currentLanguage,
    changeLanguage,
  };
};
