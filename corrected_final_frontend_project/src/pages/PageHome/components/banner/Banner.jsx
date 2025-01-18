import { Link } from 'react-router-dom'
import styles from './Banner.module.css'

function Banner () {
    return (
        <>
        <section className="banner">
                <div className="container">
                    <div className={`${styles.modif_row}`}>
                    {/* <div className="row"> */}
                        <div className={`${styles.left_infobox} col-5 `}>
                            <h1 className={styles.banner_title}>pizza delivery</h1>
                            <p className={styles.banner_description}>Lorem ipsum dolor sit amet consectetur adipisicing elit. Tenetur assumenda debitis ducimus, odio reiciendis vero exercitationem aliquid nam inventore eius reprehenderit nisi blanditiis iste eligendi sint voluptate eos expedita quos.</p>
                            <Link to='/cart' className={`${styles.button}`}>Order delivery</Link>
                        </div>
                        <div className={`${styles.temp} col-7`}> 
                            <img src="/images/banner.avif" alt="" className={styles.banner_img}/>
                        </div>
                        
                    </div>
                </div>
            </section>
        </>
    )
}

export default Banner