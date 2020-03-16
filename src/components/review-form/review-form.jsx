import React from 'react';
import PropTypes from 'prop-types';
import {connect} from "react-redux";
import {OperationStatus} from "../../utils/const.js";
import {getCommentStatus} from "../../reducer/data/selectors.js";
import {ActionCreator} from "../../reducer/data/data.js";
import {Operation as DataOperation} from "../../reducer/data/data.js";

const CommentLength = {
  MIN: 50,
  MAX: 300
};

class ReviewForm extends React.PureComponent {
  constructor(props) {
    super(props);

    this.handleSubmit = this.handleSubmit.bind(this);
  }

  componentDidUpdate() {
    const {commentStatus, onReset, handleOperationStatusReset} = this.props;

    if (commentStatus === OperationStatus.SUCCESS) {
      onReset();
      handleOperationStatusReset(`commentStatus`, ``);
    }
  }


  handleSubmit(evt) {
    const {comment, rating, id, onSubmit} = this.props;

    evt.preventDefault();
    onSubmit({
      comment,
      rating,
      id
    });
  }

  render() {
    const {commentStatus, rating, comment, onRatingChange, onCommentChange} = this.props;
    const pendingStatus = commentStatus === OperationStatus.PENDING;
    const errorStatus = commentStatus === OperationStatus.FAILED;

    return (
      <form className={`reviews__form${errorStatus ? ` reviews__form--error` : ``} form`} action="#" method="post" onSubmit={this.handleSubmit}>
        <label className="reviews__label form__label" htmlFor="review">Your review</label>
        <div className="reviews__rating-form form__rating">
          {[5, 4, 3, 2, 1].map((i) => {
            return (
              <React.Fragment key={`star-${i + Math.random()}`}>
                <input className="form__rating-input visually-hidden" name="rating" value={i} id={`${i}-stars`} type="radio" onChange={onRatingChange} checked={i === rating} disabled={pendingStatus}/>
                <label htmlFor={`${i}-stars`} className="reviews__rating-label form__rating-label" title="perfect">
                  <svg className="form__star-image" width="37" height="33">
                    <use xlinkHref="#icon-star"></use>
                  </svg>
                </label>
              </React.Fragment>
            );
          })}
        </div>
        <textarea className="reviews__textarea form__textarea" id="review" name="review" placeholder="Tell how was your stay, what you like and what can be improved" onChange={onCommentChange} value={comment} disabled={pendingStatus}></textarea>
        <div className="reviews__button-wrapper">
          <p className="reviews__help">
            To submit review please make sure to set <span className="reviews__star">rating</span> and describe your stay with at least <b className="reviews__text-amount">{CommentLength.MIN} characters</b>.
          </p>
          <button
            className="reviews__submit form__submit button"
            type="submit"
            disabled={!rating || comment.length < CommentLength.MIN || comment.length > CommentLength.MAX || pendingStatus}
          >
            Submit
          </button>
        </div>
      </form>
    );
  }
}

ReviewForm.propTypes = {
  id: PropTypes.string,
  commentStatus: PropTypes.string,
  rating: PropTypes.number,
  comment: PropTypes.string,
  handleOperationStatusReset: PropTypes.func,
  onRatingChange: PropTypes.func,
  onCommentChange: PropTypes.func,
  onReset: PropTypes.func,
  onSubmit: PropTypes.func
};

const mapStateToProps = (state) => ({
  commentStatus: getCommentStatus(state),
});

const mapDispatchToProps = {
  onSubmit: DataOperation.addComment,
  handleOperationStatusReset: ActionCreator.setOperationStatus,
};

export {ReviewForm};
export default connect(mapStateToProps, mapDispatchToProps)(ReviewForm);