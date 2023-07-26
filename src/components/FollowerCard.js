import React, {useState} from 'react';
import moment from "moment";
import {Button} from "react-bootstrap";
import { faTrash, faQuestion } from "@fortawesome/free-solid-svg-icons";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {message, Popconfirm} from "antd";

const FollowerCard = ({ follower, removeFollower }) => {
    const [isOpen, setIsOpen] = useState(false);
    return (
            <div className="user-card">
                <div className="d-flex w-100">
                    <img width="40" src={follower.image || ''} alt={`Profile of ${follower.image}`} />
                    <div style={{ marginLeft: 8 }} className="d-flex flex-column">
                        <h3 style={{ fontSize: 16 }}>{follower.fullname}</h3>
                        <h3 style={{ fontSize: 12 }}>@{follower.username}</h3>
                    </div>
                </div>
                <p className="card p-2 m-0 text-center text-capitalize fw-bold">Twubric Score - {follower.twubric?.total}</p>
                <div className="w-100 d-flex mt-2 justify-content-around twubric-content">
                    <span className="d-flex twubric-value flex-column align-items-center text-center justify-content-center">
                        <span className="influence-value">{follower.twubric?.friends}</span>
                        <span className="influence-label">Friends</span>
                    </span>
                    <span className="twubric-value d-flex flex-column align-items-center text-center justify-content-center">
                        <span className="influence-value">{follower.twubric?.influence}</span>
                        <span className="influence-label">Influencs</span>
                    </span>
                    <span className="twubric-value d-flex flex-column align-items-center text-center justify-content-center">
                        <span className="influence-value">{follower.twubric?.chirpiness}</span>
                        <span className="influence-label">Chirpiness</span>
                    </span>
                </div>
                <div className="d-flex align-items-center justify-content-between">
                    <span className="date-value">
                        {follower.join_date && moment.unix(follower.join_date).format('DD/MM/YYYY')}
                    </span>
                    <Popconfirm
                        title={<span className="text-danger">Delete Follower</span>}
                        description={<span>Are you sure want to delete <span className="fw-bold">{follower.fullname}</span> user?</span>}
                        open={isOpen}
                        onConfirm={() => {
                            removeFollower(follower);
                            setIsOpen(false);
                            message.success("Follower deleted successfully!")
                        }}
                        onCancel={() => setIsOpen(false)}
                        icon={<FontAwesomeIcon icon={faQuestion} className="border-1 border-start-0 text-danger px-2"/>}
                    >
                        <Button type="primary" className="bg-white px-2 py-1 border-danger" onClick={() => setIsOpen(!isOpen)}>
                            <div className="d-flex align-items-center justify-content-between">
                                <FontAwesomeIcon className="text-danger" icon={faTrash} />
                                <span className="mx-2 text-danger small">Remove</span>
                            </div>
                        </Button>
                    </Popconfirm>
                </div>
            </div>
    );
};

export default FollowerCard;
