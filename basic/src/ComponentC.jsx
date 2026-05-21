//현재 컴포넌트에만 적용할 전용 외부 CSS 파일을 만들자!! > 격리성
//- ComponentC.module.css

//import './ComponentC.module.css';
import styles from './ComponentC.module.css';

function ComponentC() {
  return (
    <>
      <h3 className={styles.mainTitle}>ComponentC</h3>
      <div className={styles.mainContent}>C 컴포넌트입니다.</div>
    </>
  );
}

export default ComponentC;