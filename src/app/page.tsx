import styles from './page.module.css';
import Basket from '@components/Basket';
import Products from '@components/Products';
import { STORE_NAME } from '@constants/store';

export default function Home() {
  return (
    <main className={styles.main}>
      <div className={styles.description}>
        <p>{STORE_NAME}</p>
        <Basket />
      </div>

      <div className={styles.grid}>
        <Products />
      </div>
    </main>
  );
}
