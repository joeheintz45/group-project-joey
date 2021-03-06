import axios from 'axios';
import { put, takeLatest } from 'redux-saga/effects';

function* getFilteredPostings(action) {
  try {
    const activity_id = action.payload.activity_id;
    const age_id = action.payload.age_id;
    const cause_id = action.payload.cause_id;
    const filteredPostings = yield axios.get(
      `/api/postings/browse/${activity_id}/${age_id}/${cause_id}`
    );
    yield put({
      type: 'SET_FILTERED_POSTINGS',
      payload: filteredPostings.data,
    });
  } catch (err) {
    console.log('could not get filtered postings', err);
  }
}

function* getUserPostings(action) {
  try {
    const activity_id = action.payload;
    // age and cause set to 0 since we are only filtering for activity
    const age_id = 0;
    const cause_id = 0;

    const filteredPostings = yield axios.get(
      `/api/postings/browse/${activity_id}/${age_id}/${cause_id}`
    );
    yield put({
      type: 'SET_FILTERED_POSTINGS',
      payload: filteredPostings.data,
    });
  } catch (err) {
    console.log('could not get filtered postings for volunteer user!', err);
  }
}

function* getPosting(action) {
  try {
    const posting = yield axios.get(`/api/postings/details/${action.payload}`);
    yield put({
      type: 'SET_POSTING_DETAILS',
      payload: posting.data,
    });
  } catch (err) {
    console.log('could not get details for this posting!', err);
  }
}

function* PostingsSaga() {
  yield takeLatest('SUBMIT_FILTERS', getFilteredPostings);
  yield takeLatest('GET_USER_POSTINGS', getUserPostings);
  yield takeLatest('GET_POSTING', getPosting);
}

export default PostingsSaga;
