'use client';

import { Crisp } from 'crisp-sdk-web';
import { useEffect } from 'react';

export const CrispChat = () => {
  useEffect(() => {
    Crisp.configure('d170721c-9699-4bb7-bc48-def587473441');
  }, []);

  return null;
};
