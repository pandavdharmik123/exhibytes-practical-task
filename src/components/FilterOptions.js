import React, {useCallback, useEffect, useState} from 'react';
import _ from 'lodash';
import './style.css';
import Search from "antd/es/input/Search";
import {Button, DatePicker, Select} from 'antd';
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {
    faAngleLeft,
    faAngleRight,
    faArrowDownWideShort,
    faArrowUpWideShort
} from "@fortawesome/free-solid-svg-icons";

const options = [
    {
        value: '',
        label: 'All'
    },
    {
        value: 'High',
        label: 'High'
    },
    {
        value: 'Average',
        label: 'Average'
    },
    {
        value: 'Low',
        label: 'Low'
    },
];

const sortByOptions = [
    {
        value: '',
        label: 'None'
    },
    {
        value: 'total',
        label: 'Twubric Score'
    },
    {
        value: 'friends',
        label: 'Friends'
    },
    {
        value: 'influence',
        label: 'Influence'
    },
    {
        value: 'chirpiness',
        label: 'Chirpiness'
    },
];

const FilterOptions = ({ followers, setFollowers, isFilter, setIsFilter }) => {
    const [twubricScoreFilter, setTwubricScoreFilter] = useState(''); // State for Twubric score filter
    const [startDateFilter, setStartDateFilter] = useState(''); // State for start date filter
    const [endDateFilter, setEndDateFilter] = useState(''); // State for end date filter
    const [sortOption, setSortOption] = useState(''); // State for sorting option
    const [sortBy, setSortBy] = useState('asc');

    // Filter and sort functions
    const applyFiltersAndSort = useCallback((searchString = '') => {
        let filteredFollowers = followers;

        if(!_.isEmpty(searchString)) {
           filteredFollowers = filteredFollowers.filter(value => value.username.toLowerCase().includes(searchString?.toLowerCase()) || value.fullname.toLowerCase().includes(searchString.toLowerCase()) )
        }

        // Filtering based on Twubric score (if Twubric score filter is selected)
        if (twubricScoreFilter) {
            switch (twubricScoreFilter) {
                case 'High':
                    filteredFollowers = filteredFollowers.filter(follower => follower.twubric?.total > 6);
                    break;
                case 'Average':
                    filteredFollowers = filteredFollowers.filter(follower => _.inRange(follower.twubric?.total, 4, 7));
                    break;
                case 'Low':
                    filteredFollowers = filteredFollowers.filter(follower => _.inRange(follower.twubric?.total, 0, 4));
                    break;
                default:
                    break;
            }
        }

        // Filtering based on the joined Twitter date range (if start and end dates are provided)
        if (startDateFilter && endDateFilter) {
            filteredFollowers = filteredFollowers.filter(
                (follower) => {
                    return follower.join_date >= new Date(startDateFilter).getTime()/ 1000 && follower.join_date <= new Date(endDateFilter).getTime()/ 1000
                }
            );
        }

        // Sorting based on the selected sort option (if sort option is provided)
        if (sortOption && sortBy) {
            switch (sortOption) {
                case 'total':
                    filteredFollowers = _.orderBy(filteredFollowers, 'twubric.total', sortBy);
                    break;
                case 'friends':
                    filteredFollowers = _.orderBy(filteredFollowers, 'twubric.friends', sortBy);
                    break;
                case 'influence':
                    filteredFollowers = _.orderBy(filteredFollowers, 'twubric.influence', sortBy);
                    break;
                case 'chirpiness':
                    filteredFollowers = _.orderBy(filteredFollowers, 'twubric.chirpiness', sortBy);
                    break;
                default:
                    filteredFollowers = _.orderBy(filteredFollowers, 'username', sortBy);
            }
        }
        setFollowers(filteredFollowers);
    }, [endDateFilter, followers, setFollowers, sortBy, sortOption, startDateFilter, twubricScoreFilter]);

    useEffect(() => {
        applyFiltersAndSort();
    }, [followers, applyFiltersAndSort]);

    return (
        <div className='sidebar align-items-center' style={{ width: isFilter ? 320 : 120 }}>
            <span className="sidebar-logo d-flex justify-content-between"  onClick={() => setIsFilter(!isFilter)}>
                <span>Filters</span>
                <span>
                    {!isFilter
                        ? <FontAwesomeIcon icon={faAngleRight} />
                        : <FontAwesomeIcon icon={faAngleLeft} />
                    }
                </span>
            </span>
            {isFilter && <div className="sidebar__menu">
                <div className="filter-options">
                    <Search
                        rootClassName="my-2"
                        placeholder="Search followers..."
                        onSearch={(value) => applyFiltersAndSort(value) }
                        enterButton
                    />
                    <div className="d-flex flex-column my-1">
                        <label className="small fw-bold mb-1">
                            Twubric Score
                        </label>
                        <Select
                            showArrow
                            style={{
                                width: '100%',
                            }}
                            placeholder={'All'}
                            value={twubricScoreFilter}
                            onChange={(value) => setTwubricScoreFilter(value)}
                            options={options}
                        />
                    </div>
                    <div className="d-flex flex-column my-1">
                        <label className="small fw-bold mb-1">
                            Start Date
                        </label>
                        <DatePicker
                            format={'DD/MM/YYYY'}
                            onChange={(date) => {
                                setStartDateFilter(date);
                            }}
                        />
                    </div>

                    <div className="d-flex flex-column my-1">
                        <label className="small fw-bold mb-1">
                            End Date
                        </label>
                        <DatePicker
                            format={'DD/MM/YYYY'}
                            onChange={(date) => {
                                setEndDateFilter(date);
                            }}
                        />
                    </div>
                    <div className="d-flex flex-column my-1">
                        <label className="small fw-bold mb-1">
                            SortBy
                        </label>
                        <span className="d-flex align-items-center">
                             <Select
                                 showArrow
                                 style={{
                                     width: '95%',
                                 }}
                                 placeholder={'All'}
                                 value={sortOption}
                                 onChange={(value) => setSortOption(value)}
                                 options={sortByOptions}
                             />
                            <span style={{ marginLeft: 4 }}>
                                {sortBy === 'asc' && <span onClick={() => setSortBy('desc')}><FontAwesomeIcon icon={faArrowUpWideShort} /></span>}
                                {sortBy === 'desc' && <span onClick={() => setSortBy('asc')}><FontAwesomeIcon icon={faArrowDownWideShort} /></span>}
                            </span>
                        </span>
                    </div>
                    <div className="d-flex justify-content-end">
                        <Button
                            className="mt-2 "
                            type="primary"
                            onClick={() => {
                                setTwubricScoreFilter('');
                                setStartDateFilter('');
                                setEndDateFilter('');
                                setSortOption('');
                                setSortBy('asc');
                            }}
                        >
                            Reset Filter
                        </Button>
                    </div>
                </div>
            </div>}
        </div>
    );
};

export default FilterOptions;

