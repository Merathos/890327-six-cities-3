import * as React from "react";
import ReviewItem from "../review-item/review-item";
import {Comment} from "../../interfaces";

const ReviewsList: React.FC<{reviews: Comment[]}> = ({reviews}) => {
  return (
    <React.Fragment>
      <h2 className="reviews__title">Reviews &middot; <span className="reviews__amount">{reviews.length}</span></h2>
      <ul className="reviews__list">
        {reviews.map((review) => <ReviewItem key={review.id} review={review} />)}
      </ul>
    </React.Fragment>
  );
};

export default ReviewsList;
