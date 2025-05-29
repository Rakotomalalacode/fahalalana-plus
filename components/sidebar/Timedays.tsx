'use client';

import React, { useEffect, useState } from 'react';

const Timedays = () => {
  const [greeting, setGreeting] = useState<string>('');

  useEffect(() => {
    const now = new Date();
    const hours = now.getHours();

    if (hours >= 0 && hours < 12) {
      setGreeting('Bonjour ,');
    } else if (hours >= 12 && hours < 17) {
      setGreeting('Bon après-midi ,');
    } else if (hours >= 17 && hours < 20) {
      setGreeting('Bonsoir  ,');
    } else {
      setGreeting('Bonne nuit  ,');
    }
  }, []);

  return (
    <div>
      <h1>{greeting}</h1>
    </div>
  );
};

export default Timedays;