import React, { useReducer } from "react";
import axios from "axios";
import GithubContext from "./githubContext";
import GithubReducer from "./githubReducer";

import {
  SEARCH_USER,
  SET_LOADING,
  CLEAR_USER,
  GET_USER,
  GET_REPOS,
  SET_ALERT,
  REMOVE_ALERT
} from "../Types";

const GithubState = props => {
  const initialState = {
    users: [],
    user: {},
    repos: [],
    alert: null,
    loading: false
  };

  const REACT_APP_GITHUB_CLIENT_ID = "f4b96cd0a6d41f1b1306";
  const REACT_APP_GITHUB_CLIENT_SECRET =
    "bf77de848ece3e03d44e966c00d50a8edb5f98df";

  const [state, dispatch] = useReducer(GithubReducer, initialState);

  //Search User
  const searchUsers = async text => {
    setLoading();
    const res = await axios.get(`https://api.github.com/search/users?q=${text}&client_id=${REACT_APP_GITHUB_CLIENT_ID}
    }
    &client_secret=${REACT_APP_GITHUB_CLIENT_SECRET}`);
    dispatch({
      type: SEARCH_USER,
      payload: res.data.items
    });
  };

  // Get User

  const getUser = async username => {
    setLoading();

    const res = await axios.get(`https://api.github.com/users/${username}?client_id=${REACT_APP_GITHUB_CLIENT_ID}
    }
    &client_secret=${REACT_APP_GITHUB_CLIENT_SECRET}`);

    dispatch({
      type: GET_USER,
      payload: res.data
    });
  };

  //Get Repos
  const getUserRepos = async username => {
    setLoading();
    const res = await axios.get(`https://api.github.com/users/${username}/repos?per_page=5&sort=created:asc&client_id=${process.env.REACT_APP_GITHUB_CLIENT_ID}
  }
  &client_secret=${process.env.REACT_APP_GITHUB_CLIENT_SECRET}`);

    dispatch({
      type: GET_REPOS,
      payload: res.data
    });
  };

  //Clear Users
  const clearUsers = () => dispatch({ type: CLEAR_USER });

  //set Loading

  const setLoading = () => dispatch({ type: SET_LOADING });

  // set Alert

  const setAlert = (msg, type) => {
    dispatch({ type: SET_ALERT, payload: { msg, type } });
    setTimeout(() => {
      dispatch({ type: REMOVE_ALERT });
    }, 3000);
  };

  return (
    <GithubContext.Provider
      value={{
        users: state.users,
        user: state.user,
        repos: state.repos,
        loading: state.loading,
        alert: state.alert,
        searchUsers,
        clearUsers,
        getUser,
        getUserRepos,
        setAlert
      }}
    >
      {props.children}
    </GithubContext.Provider>
  );
};

export default GithubState;
