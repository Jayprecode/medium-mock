/* eslint-disable @next/next/no-img-element */
import Image from "next/image";
import Link from "next/link";
import React from "react";
import styled from "styled-components";
import { LogoAnimation } from "../components/Icons";
import Layout from "../components/Layout";
import { sanityClient, urlFor } from "../sanity";
import { Post } from "../typings";

interface Props {
	posts: [Post];
}

const Home = ({ posts }: Props) => {
	console.log(posts);
	return (
		<Layout title="Home">
			<Content>
				<div className="content-layout">
					<div className="content-layout__left">
						<h1>Stay curious.</h1>
						<p>
							Discover stories, thinking, and expertise from
							writers on any topic.
						</p>
						<h3 className="btn">Start reading</h3>
					</div>
					<div className="content-layout__right">
						<div className="mi">
							<LogoAnimation />
						</div>
					</div>
				</div>
			</Content>
			<Post>
				<div className="container">
					<div className="row">
						<div className="col-md-12">
							<div className="posts">
								{posts.map((post) => (
									<Link
										key={post._id}
										href={`/post/${post.slug.current}`}
									>
										<a>
											<div className="post_item">
												<div className="post__image">
													<img
														src={
															urlFor(
																post?.mainImage
															).url()!
														}
														alt={post?.title}
													/>
												</div>
												<div className="post__content">
													<div className="sub">
														<h2>{post?.title}</h2>
														<p>
															{post?.description}{" "}
															by{" "}
															{post?.author?.name}
														</p>
													</div>
													<div className="author_img">
														<img
															src={
																urlFor(
																	post?.author
																		?.image
																).url()!
															}
															alt={post?.title}
														/>
													</div>
												</div>
											</div>
										</a>
									</Link>
								))}
							</div>
						</div>
					</div>
				</div>
			</Post>
		</Layout>
	);
};

const Content = styled.div`
	padding: 0;
	position: relative;
	overflow: hidden;
	display: flex;
	justify-content: center;
	align-items: center;
	background: #ffc017;
	border-bottom: solid 1px rgba(41, 41, 41, 1);
	.content-layout {
		display: flex;
		justify-content: space-between;
		align-items: center;
		min-width: 0;
		max-width: 1192px;
		width: 100%;

		padding-top: 93px;
		padding-bottom: 93px;

		@media (min-width: 1080px) {
			margin: 0 64px;
		}
		@media (max-width: 1080px) {
			margin: 0 24px;
		}

		.content-layout__left {
			display: flex;
			flex-direction: column;
			align-items: flex-start;
			justify-content: center;
			h1 {
				@media (min-width: 1080px) {
					line-height: 95px;
					font-size: 106px;
				}
				@media (max-width: 1080px) {
					line-height: 74px;
					font-size: 70px;
				}
				letter-spacing: -0.05em;
				color: rgba(8, 8, 8, 1);
				font-feature-settings: "pnum" on, "lnum" on;
				font-family: gt-super, Georgia, Cambria, "Times New Roman",
					Times, serif;
				font-weight: 400;
				margin-bottom: 35px;
			}
			p {
				width: 90%;
				margin-bottom: 50px;
				color: rgba(41, 41, 41, 1);
				font-family: sohne, "Helvetica Neue", Helvetica, Arial,
					sans-serif;
				font-weight: 400;
				font-size: 24px;
				line-height: 24px;
			}
			.btn {
				font-size: 20px;
				font-family: sohne, "Helvetica Neue", Helvetica, Arial,
					sans-serif;
				width: 213px;
				padding: 7px 20px 9px;
				line-height: 24px;
				border-radius: 99em;
				background: rgba(25, 25, 25, 1);
				border: 1px solid rgba(25, 25, 25, 1);
				color: rgba(255, 255, 255, 1);
				font-weight: 300;
				margin: 0;
			}
		}
		.content-layout__right {
			.mi {
				width: 585px;
				position: absolute;
				display: block;
				@media (min-width: 1080px) {
					right: 0px;
					top: 0px;
				}
				@media (max-width: 1080px) {
					display: none;
				}
			}
		}
	}
`;

const Post = styled.div`
	margin-top: 2rem;
	margin-bottom: 2rem;
	.posts {
		display: grid;
		grid-template-columns: 1fr 1fr 1fr;
		grid-gap: 20px;
		@media (max-width: 768px) {
			grid-template-columns: 1fr 1fr;
		}
		@media (max-width: 480px) {
			grid-template-columns: 1fr;
		}
		a {
			text-decoration: none;
		}
		.post_item {
			display: flex;
			align-item: center;
			justify-content: space-between;
			flex-direction: column;
			border: 1px solid rgba(41, 41, 41, 0.2);
			border-radius: 10px;
			height: 450px;
			overflow: hidden;
            box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.2);
			.post__image {
				height: 300px;
				width: 100%;
				overflow: hidden;
				img {
					object-fit: cover;
					width: 100%;
					height: 100%;
					border-radius: 0.3rem;
					transition: all 1s ease-in-out;
					&:hover {
						transform: scale(1.3);
					}
				}
			}
			.post__content {
				display: flex;
				align-items: flex-end;
				padding: 1rem;
				.sub {
					display: flex;
					align-items: flex-start;
					flex-direction: column;

					h2 {
						@media (min-width: 1080px) {
							font-size: 24px;
						}
						@media (max-width: 1080px) {
							font-size: 14px;
						}
						letter-spacing: -0.05em;
						color: rgba(8, 8, 8, 1);
						font-feature-settings: "pnum" on, "lnum" on;
						font-weight: 400;
					}
					p {
						width: 90%;
						color: rgba(41, 41, 41, 1);
						font-family: sohne, "Helvetica Neue", Helvetica, Arial,
							sans-serif;
						font-weight: 400;
						font-size: 14px;
						margin: 0;
					}
				}
				.author_img {
					width: 100px;
					img {
						width: 100%;
						height: 100%;
						border-radius: 50%;
					}
				}
			}
		}
	}
`;

export const getServerSideProps = async () => {
	const query = `
        *[_type == "post"]{
            _id,
            title,
            author-> {
                name,
                image
            },
            description,
            mainImage,
            slug
        }
    `;
	const posts = await sanityClient.fetch(query);

	return {
		props: {
			posts,
		},
	};
};

export default Home;
