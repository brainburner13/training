import profileReducer, { actions } from './Profile-reducer';

let state = {
  posts: [
    {id: 1, message: 'Hi, fresh mea', likesCount: 3},
    {id: 2, message: 'How are you?', likesCount: 5}
  ],
  
  status: '',

  profile: null,

  newPostText: ''
};

it('Length of posts should be incremented', () => {

  // 1. Test data
  let action = actions.addPostCreater('Test message');

  // 2. Action
  let newState = profileReducer(state, action);

  // 3. Expectation
  expect(newState.posts.length).toBe(3);
});

it('Message of new post should be correct', () => {

  // 1. Test data
  let action = actions.addPostCreater('Test message');

  // 2. Action
  let newState = profileReducer(state, action);

  // 3. Expectation
  expect(newState.posts[2].message).toBe('Test message');
});

it('After deliting length of messages should be decrement', () => {

  // 1. Test data
  let action = actions.delitePost(1);

  // 2. Action
  let newState = profileReducer(state, action);

  // 3. Expectation
  expect(newState.posts.length).toBe(1);
});


it('After deliting length of messages shouldn`t be decrement if id is incorrect', () => {

  // 1. Test data
  let action = actions.delitePost(13);

  // 2. Action
  let newState = profileReducer(state, action);

  // 3. Expectation
  expect(newState.posts.length).toBe(2);
});
