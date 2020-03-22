import * as React from "react";
import * as renderer from "react-test-renderer";
import ReviewList from "./reviews-list";

const reviews = [
  {
    id: `51243`,
    name: `Max`,
    avatar: `img/avatar-max.jpg`,
    rating: 2.5,
    date: `2019-06-13T04:41:20`,
    text: `Consectetur sit velit nulla ipsum. Sunt occaecat amet cupidatat laboris commodo in. Culpa voluptate elit amet officia veniam cillum ad. Ea magna adipisicing laboris incididunt. Laborum eu sit consequat eu nisi. Nulla ipsum ea reprehenderit enim labore do et. Irure anim laborum aute quis.`
  },
  {
    id: `84657`,
    name: `Angelina`,
    avatar: `img/avatar-angelina.jpg`,
    rating: 3.6,
    date: `2018-05-13T04:41:20`,
    text: `Amet anim Lorem laborum ullamco nisi labore adipisicing ut esse eu. Consectetur laboris consectetur labore ut aute do. Eiusmod sit anim adipisicing excepteur reprehenderit in. Aliqua id laborum nisi veniam dolore cillum esse Lorem non occaecat do mollit.`
  },
  {
    id: `79807`,
    name: `Max`,
    avatar: `img/avatar-max.jpg`,
    rating: 4.7,
    date: `2017-04-13T04:41:20`,
    text: `Aliqua deserunt quis eu culpa nulla. Dolor eiusmod aliquip nulla commodo excepteur ut labore Lorem duis consequat dolor ex aute cillum. Non nisi do eu ex mollit sunt quis cillum fugiat velit et. Aliqua magna excepteur minim adipisicing aute consectetur exercitation laboris laborum sint pariatur in esse consectetur. Elit sit incididunt pariatur est eiusmod non anim deserunt laboris incididunt minim reprehenderit.`
  },
  {
    id: `24357`,
    name: `Angelina`,
    avatar: `img/avatar-angelina.jpg`,
    rating: 5.8,
    date: `2016-03-13T04:41:20`,
    text: `Velit ipsum voluptate consectetur eiusmod excepteur aliqua et cillum laboris anim nisi dolor. Ex esse id occaecat ex consequat duis sint duis excepteur. Fugiat est nisi dolor officia nisi id. Irure ullamco do ea eiusmod fugiat enim fugiat laborum ea ipsum cupidatat consectetur. Consectetur consequat esse velit tempor commodo ea labore.`
  },
];

it(`Render Review list`, () => {
  const tree = renderer
    .create(<ReviewList
      reviews={reviews}
    />)
    .toJSON();

  expect(tree).toMatchSnapshot();
});
