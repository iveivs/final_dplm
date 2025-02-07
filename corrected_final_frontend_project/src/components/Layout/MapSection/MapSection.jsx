import { useEffect, useRef } from "react";
import styles from "./MapSection.module.css";

const MapSection = () => {
    const mapContainerRef = useRef(null);

    useEffect(() => {
        if (window.ymaps) {
            window.ymaps.ready(() => {
                const map = new window.ymaps.Map(mapContainerRef.current, {
                    center: [55.751574, 37.573856],
                    zoom: 10,
                });

                const placemark = new window.ymaps.Placemark(
                    [55.751574, 37.573856],
                    {
                        hintContent: "Мы здесь!",
                        balloonContent: "Наш магазин",
                    }
                );
                map.geoObjects.add(placemark);
            });
        }
    }, []);

    return (
        <>
            <div className={styles.map_box} id="info">
                <div className="container">
                    <div className={styles.map_wrapper}>
                        <div className={styles.mapSection}>
                            <h2 className={styles.title}>Where to find us?</h2>
                            <div
                                ref={mapContainerRef}
                                className={styles.mapContainer}
                            ></div>
                        </div>
                        <div className={styles.map_info}>
                            <p> <span className={styles.map_text}>Our adress:</span> Moscow, Lenina st. 1</p>
                            <p> <span className={styles.map_text}>Our phone:</span> +7-(987)-65-43-21</p>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default MapSection;
