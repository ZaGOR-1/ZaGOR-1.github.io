import { useMemo } from 'react';
import { translations } from '../data/translations';

export const useTranslations = (language) => {
  const t = useMemo(() => translations[language], [language]);
  return t;
};
