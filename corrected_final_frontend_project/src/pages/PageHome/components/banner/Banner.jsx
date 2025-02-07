import { useNavigate } from 'react-router-dom';
import styles from './Banner.module.css';
import { Button } from "../../../../components/Layout/UI/Button/Button";

function Banner() {
    const navigate = useNavigate();

    return (
        <>
            <section className="banner">
                <div className="container">
                    <div className={`${styles.modif_row}`}>
                        <div className={`${styles.left_infobox} col-5`}>
                            <h1 className={styles.banner_title}>pizza delivery</h1>
                            <p className={styles.banner_description}>
                                Lorem ipsum dolor sit amet consectetur adipisicing elit. Tenetur assumenda debitis ducimus, odio reiciendis vero exercitationem aliquid nam inventore eius reprehenderit nisi blanditiis iste eligendi sint voluptate eos expedita quos.
                            </p>
                            <Button
                                onClick={() => navigate('/cart')} 
                                className={styles.button}
                            >
                                Order delivery
                            </Button>
                        </div>
                        <div className={`${styles.temp} col-7`}>
                            <img src="/images/banner.avif" alt="" className={styles.banner_img} />
                        </div>
                    </div>
                </div>
            </section>
        </>
    );
}

export default Banner;

