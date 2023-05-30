import React, { useEffect, useState } from 'react';
import axios from 'axios';
import classNames from 'classnames';

import Button from "../../components/atoms/Button";
import Filter from '../../components/molecules/Filter';
import Header from '../../components/atoms/Header';
import Image from "../../components/atoms/Image";
import Modal from '../../components/molecules/Modal';
import Post from '../../components/organisms/Post';
import PostSkeleton from '../../components/molecules/PostSkeleton';
import UserInfo from "../../components/molecules/UserInfo";

import logo from '../../liga-tita.png';
import './styles.css'

const API_KEY = '64727eb35bbbf4cdc935b297';
const API_URL = `https://dummyapi.io/data/v1/post?limit=10`;
const COMMENTS_API_URL = 'https://dummyapi.io/data/v1/post';

const Home = ({ user, onLogout }) => {
    const [filteredposts, setFilteredPosts] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [posts, setPosts] = useState([]);
    const [selectedPost, setSelectedPost] = useState(null);
    const [tags, setTags] = useState([]);

    const getUniqueTags = data => {
        const uniqueTags = [];

        data.forEach((item) => {
            item.tags.forEach((tag) => {
                if (!uniqueTags.includes(tag)) {
                    uniqueTags.push(tag);
                }
            });
        });

        return uniqueTags;
    };

    useEffect(() => {
        const fetchPosts = async () => {
            try {
                const response = await axios.get(API_URL, {
                    headers: { 'app-id': API_KEY },
                });
                const fetchedPosts = response.data.data;
                setFilteredPosts(fetchedPosts)
                setIsLoading(false);

                const postsWithComments = await Promise.all(
                    fetchedPosts.map(async (post) => {
                        const commentsResponse = await axios.get(
                            `${COMMENTS_API_URL}/${post.id}/comment?limit=10`,
                            {
                                headers: { 'app-id': API_KEY },
                            }
                        );
                        const comments = commentsResponse.data.data;
                        return { ...post, comments };
                    })
                );

                setPosts(postsWithComments);
                setFilteredPosts(postsWithComments)
                setTags(getUniqueTags(postsWithComments))
            } catch (error) {
                console.error('Error fetching posts:', error);
                setIsLoading(false);
            }
        };

        fetchPosts();
    }, []);

    const openPostModal = postId => {
        const post = posts.find((p) => p.id === postId);
        setSelectedPost(post);
    };

    const closePostModal = () => {
        setSelectedPost(null);
    };

    const handleTagFilterChange = (event) => {
        event.preventDefault()

        if (event.target.value === '') {
            setFilteredPosts(posts);
            return
        }

        const postFiltered = posts.filter(post => {
            return post.tags.includes(event.target.value);
        });

        setFilteredPosts(postFiltered)
    }

    const classes = classNames({ 'posts-container': true, 'no-scrolling': selectedPost })

    return (
        <>
            <Header>
                <Image src={logo} alt='logo' />
                <section className='your-info-container'>
                    <Button onClick={onLogout}>
                        Logout
                    </Button>
                    <UserInfo
                        picture={user.picture}
                        firstName={user.name}
                    />
                </section>
            </Header>
            <section className={classes}>
                {isLoading ?
                    <>
                        <PostSkeleton />
                        <PostSkeleton />
                        <PostSkeleton />
                    </> :
                    <>
                        <Filter tags={tags} onChange={handleTagFilterChange} />
                        {
                            filteredposts.map((post, i) => {
                                return (
                                    <Post
                                        key={`${post.id}-${i}`}
                                        post={post}
                                        openPostModal={openPostModal}
                                    />
                                )
                            })
                        }
                    </>
                }
            </section>

            {selectedPost && (
                <Modal post={selectedPost} closeModal={closePostModal} />
            )}

        </>
    )
}

export default Home;