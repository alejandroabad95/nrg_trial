// components/Loader.tsx
import React from 'react';
import styles from '../styles/componentStyles/Loader.module.scss'; // Asegúrate de que la ruta sea correcta

const Loader: React.FC = () => {
  return (
    <div className={`mt-10 ${styles.loaderContainer}`}>
      <div className={styles.loader}></div>
    </div>
  );
};

export default Loader;
