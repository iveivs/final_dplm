import styles from "./Reviews.module.css";
import { useEffect, useState } from "react";

export const Reviews = () => {
    const [reviews, setReviews] = useState([]);
    const [currentIndex, setCurrentIndex] = useState(0);

    const visibleReviews = reviews.slice(currentIndex, currentIndex + 3);

    const nextSlide = () => {
        setCurrentIndex((prevIndex) =>
            prevIndex + 1 < reviews.length - 2 ? prevIndex + 1 : prevIndex
        );
    };

    const prevSlide = () => {
        setCurrentIndex((prevIndex) =>
            prevIndex > 0 ? prevIndex - 1 : prevIndex
        );
    };

    useEffect(() => {
        fetch("http://localhost:3002/reviews")
            .then((response) => response.json())
            .then((data) => setReviews(data));
    }, []);

    return (
        <div className="container indent ">
            <h2 id="reviews" className={styles.reviews_title}>Reviews</h2>
            <div className={styles.items_wrapper}>
                <i
                    className={`fa fa-arrow-left ${styles.left_arrow} ${
                        currentIndex === 0 ? styles.disabled_arrow : ""
                    }`}
                    aria-hidden="true"
                    onClick={prevSlide}
                ></i>
                <div className={styles.slides}>
                    {visibleReviews.map((review) => (
                        <div key={review.id} className={styles.slide}>
                            <img
                                src={review.src}
                                alt={review.name}
                                className={styles.image}
                            />
                            <h3>{review.name}</h3>
                            <p>{review.text}</p>
                            <p>Rating: {review.rating}/5</p>
                        </div>
                    ))}
                </div>
                <i
                    className={`fa fa-arrow-right ${styles.right_arrow} ${
                        currentIndex >= reviews.length - 3 ? styles.disabled_arrow : ""
                    }`}
                    aria-hidden="true"
                    onClick={nextSlide}
                ></i>
            </div>
        </div>
    );
};



