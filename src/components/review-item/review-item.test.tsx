import * as React from "react";
import * as renderer from "react-test-renderer";
import ReviewItem from "./review-item";

const review = {
  id: `51243`,
  name: `Max`,
  avatar: `img/avatar-max.jpg`,
  rating: 2.5,
  date: `2019-06-13T04:41:20`,
  text: `Consectetur sit velit nulla ipsum. Sunt occaecat amet cupidatat laboris commodo in. Culpa voluptate elit amet officia veniam cillum ad. Ea magna adipisicing laboris incididunt. Laborum eu sit consequat eu nisi. Nulla ipsum ea reprehenderit enim labore do et. Irure anim laborum aute quis.`
};


it(`Render Review Item`, () => {
  const tree = renderer
    .create(<ReviewItem
      key={review.id}
      review={review}
    />)
    .toJSON();

  expect(tree).toMatchSnapshot();
});
