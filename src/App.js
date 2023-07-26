import React, { useState, useEffect } from 'react';
import axios from 'axios';
import FollowerList from './components/FollowerList';
import FilterOptions from './components/FilterOptions';
import './App.css'
import _ from "lodash";
import {SkeletonLoading} from "./components/SkeletonLoading";
import {message} from "antd";
import noDataImage from './no_data.PNG'

const App = () => {
  const [followers, setFollowers] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [totalFollowers, setTotalFollowers] = useState([]);
  const [isFilter, setIsFilter] = useState(false);

  useEffect(() => {
    // Fetch the data from the API and set it to the followers state
    setIsLoading(true);
    axios.get('https://gist.githubusercontent.com/pandemonia/21703a6a303e0487a73b2610c8db41ab/raw/82e3ef99cde5b6e313922a5ccce7f38e17f790ac/twubric.json')
        .then((response) => {
            setFollowers(response.data);
            setTotalFollowers(response.data);
            setIsLoading(false)
        })
        .catch((error) => {
            setIsLoading(false);
            message.error("Error While Fetching data");
            console.error('Error fetching data:', error)
        });
  }, []);

    const removeFollower = (follower) => {
        const updatedFollowers = _.remove(totalFollowers, (value) => value.uid !== follower.uid);
        setTotalFollowers([...updatedFollowers]);
        setFollowers(updatedFollowers)
    }

  return (
      <div className="app container d-flex">
          <FilterOptions
              followers={totalFollowers}
              setFollowers={setFollowers}
              removeFollower={removeFollower}
              isFilter={isFilter}
              setIsFilter={setIsFilter}
          />
          <div>
              {isLoading
                  ? <SkeletonLoading />
                  : _.isEmpty(followers)
                      ? <div className="w-100">
                          <img src={noDataImage} alt={'no-data'} width={550} height={450}/>
                      </div>
                      : <FollowerList
                      followers={followers}
                      removeFollower={removeFollower}
                      isFilter={isFilter}
                  />
              }
          </div>
      </div>
  );
};

export default App;
