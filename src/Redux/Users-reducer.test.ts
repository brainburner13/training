import usersReducer, { actions, InitialStateType } from './Users-reducer';

let state: InitialStateType
  
beforeEach(() => {
  state = {
    users: [
      {id: 0, name: 'Test-1', followed: false, photos: {small: null, large: null}, status: 'test-1'},
      {id: 1, name: 'Test-2', followed: false, photos: {small: null, large: null}, status: 'test-2'},
      {id: 2, name: 'Test-3', followed: true, photos: {small: null, large: null}, status: 'test-3'},
      {id: 3, name: 'Test-4', followed: true, photos: {small: null, large: null}, status: 'test-4'},
    ],
    pageSize: 100,
    totalUsersCount: 0,
    currentPage: 1,
    isFetching: false,
    followingInProgress: [],
  };
}); 

test('follow cuccess', () => {
  const newState = usersReducer(state, actions.followSuccess(1));

  expect(newState.users[0].followed).toBeFalsy();
  expect(newState.users[1].followed).toBeTruthy();
});

test('unfollow cuccess', () => {
  const newState = usersReducer(state, actions.unfollowSuccess(3));

  expect(newState.users[2].followed).toBeTruthy();
  expect(newState.users[3].followed).toBeFalsy();
});