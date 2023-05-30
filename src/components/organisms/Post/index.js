import React from 'react';
import UserInfo from "../../molecules/UserInfo";
import Image from "../../atoms/Image";
import Button from "../../atoms/Button";
import './styles.css'

const Post = ({ post, openPostModal }) => {
    const { owner, publishDate, image, text, tags, likes, comments = [] } = post;
    const { picture, firstName, lastName } = owner;

    const handlePostClick = () => {
        openPostModal(post.id);
    };

    return (
        <article className="post">
            <UserInfo
                picture={picture}
                firstName={firstName}
                lastName={lastName}
                date={publishDate}
            />

            <p className="post-text">{text}</p>
            <Image className="post-image" src={image} alt="Post" />

            <section className="post-footer">
                <div className='tags-container'>
                    {tags.map(tag => <span className="post-tags" key={tag}>{tag}</span>)}
                </div>
                <div className="likes-count">
                    <span>{likes}</span>
                    <span className="likes-label">Likes</span>
                </div>
                {comments &&
                    <div className="comments-count">
                        <span>{comments.length}</span>
                        <span className="comments-label"> Comments</span>
                    </div>
                }
                {comments.length > 0 &&
                    <Button onClick={handlePostClick}>
                        View Comments
                    </Button>
                }
            </section>
        </article>
    );
};

export default Post;
