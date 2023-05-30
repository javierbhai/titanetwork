import React from 'react';

import Button from "../../atoms/Button";
import Image from "../../atoms/Image";
import UserInfo from "../UserInfo";

import './styles.css';

const Modal = ({ post, closeModal }) => {
    const { comments, owner, image } = post;

    return (
        <article className="modal">
            <h2>Comments on {owner.firstName}'s Post</h2>
            <Button onClick={closeModal}>
                Close
            </Button>
            <Image className="modal-post-image" src={image} alt="Post" />

            {comments.map((comment) => {
                const { owner } = comment;
                return (
                    <div key={comment.id} className="comment">
                        <UserInfo
                            picture={owner.picture}
                            firstName={owner.firstName}
                            lastName={owner.lastName}
                            date={comment.publishDate}
                        />

                        <div className="comment-content">
                            <p className="comment-text">{comment.message}</p>
                        </div>
                    </div>
                )
            })}
        </article>
    );
};

export default Modal;
