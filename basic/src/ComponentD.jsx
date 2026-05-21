

import styles from './ComponentD.module.css';

function ComponentD() {
  return (
    <>
      <h3 className={styles.mainTitle}>ComponentD</h3>
      <div className={styles.mainContent}>D 컴포넌트입니다.</div>
      {/* 
      <h3 className={styles.mainTitle}>ComponentC</h3>
      <div className={styles.mainContent}>C 컴포넌트입니다.</div> 
      */}
    </>
  );
}

export default ComponentD;