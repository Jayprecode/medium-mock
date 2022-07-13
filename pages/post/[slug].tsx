/* eslint-disable @next/next/no-img-element */
import { GetStaticProps } from "next";
import React, { useState } from "react";
import dynamic from "next/dynamic";
import PortableText from "react-portable-text";
import styled from "styled-components";
import { useForm, SubmitHandler } from "react-hook-form";
import Layout from "../../components/Layout";
import { sanityClient, urlFor } from "../../sanity";
import { Post } from "../../typings";

const ArticleHeader = dynamic(() => import("../../components/ArticleHeader"), {
	ssr: false,
});

interface IFormInput {
	_id: string;
	name: string;
	email: string;
	comment: string;
}

interface Props {
	post: Post;
}

const Post = ({ post }: Props) => {
	// console.log(post);
	const [submitted, setSubmitted] = useState(false);
	const {
		register,
		handleSubmit,
		formState: { errors },
	} = useForm<IFormInput>();

	const onSubmit: SubmitHandler<IFormInput> = async (data) => {
		await fetch("/api/createComment", {
			method: "POST",
			body: JSON.stringify(data),
		})
			.then(() => {
				console.log("=====Comment created===>", data);
				setSubmitted(true);
			})
			.catch((err) => {
				console.log("=====Comment not created===>", err);
				setSubmitted(false);
			});
	};

	return (
		<Layout>
			<Content>
				<div className="post__image">
					<img
						src={urlFor(post?.mainImage).url()!}
						alt={post?.title}
					/>
				</div>
				<div className="container">
					<div className="row">
						<div className="col-md-12">
							<article>
								<ArticleHeader
									title={post?.title}
									description={post?.description}
									image={post?.author.image}
									authorName={post?.author.name}
									_createdAt={post._createdAt}
								/>
								<PortableText
									className="pt-text"
									dataset={
										process.env.NEXT_PUBLIC_SANITY_DATASET
									}
									projectId={
										process.env
											.NEXT_PUBLIC_SANITY_PROJECT_ID
									}
									content={post.body}
									serializers={{
										h1: (props: any) => (
											<h1 className="h1" {...props} />
										),
										h2: (props: any) => (
											<h2 className="h2" {...props} />
										),
										h3: (props: any) => (
											<h3 className="h3" {...props} />
										),
										li: (props: any) => (
											<li className="li" {...props} />
										),
										link: ({ href, children }: any) => (
											<a href={href} className="a">
												{children}
											</a>
										),
									}}
								/>
							</article>
							<hr />
							{submitted ? (
								<div className="successful">
									<h1>
										Thank you for submitting your comment!
									</h1>
									<p>
										Once it has been approved, it will
										appear below!
									</p>
								</div>
							) : (
								<form
									// method="POST"
									// action="https://formspree.io/myGmail"
									onSubmit={handleSubmit(onSubmit)}
								>
									<h3>Enjoy the article?</h3>
									<p>Leave a comment below!</p>
									<div className="fields">
										<input
											{...register("_id")}
											type="hidden"
											name="_id"
											aria-required="true"
											value={post._id}
										/>
										<div className="field half">
											<input
												{...register("name", {
													required: true,
												})}
												type="text"
												name="name"
												className="form-control"
												placeholder="Name"
												aria-required="true"
												required
											/>
											{errors.name && (
												<p
													style={{
														color: "red",
														fontSize: "12px",
													}}
												>
													Name is required
												</p>
											)}
										</div>
										<div className="field half">
											<input
												{...register("email", {
													required: true,
												})}
												type="email"
												name="email"
												className="form-control"
												placeholder="Email"
												aria-required="true"
												required
											/>
											{errors.email && (
												<p
													style={{
														color: "red",
														fontSize: "12px",
													}}
												>
													Email is required
												</p>
											)}
										</div>
										<div className="field">
											<textarea
												{...register("comment", {
													required: true,
												})}
												name="comment"
												rows={5}
												className="form-control"
												placeholder="Comment"
												aria-required="true"
												required
											/>
											{errors.comment && (
												<p
													style={{
														color: "red",
														fontSize: "12px",
													}}
												>
													Comment is required
												</p>
											)}
										</div>
									</div>
									<button
										className="btn btn-default"
										type="submit"
										aria-label="Send Message"
									>
										Send Message
									</button>
								</form>
							)}
							{/* Comments */}
							<div className="comments">
								<h3>Comments</h3>
								<hr />
								{post.comments.map((comment) => (
									<div className="comment" key={comment._id}>
										<div className="info">
											<p>
												<span>{comment.name}</span> :{" "}
												{comment.comment}
											</p>
										</div>
									</div>
								))}
							</div>
						</div>
					</div>
				</div>
			</Content>
		</Layout>
	);
};

const Content = styled.main`
	width: 100%;
	height: 100vh;
	.post__image {
		width: 100%;
		height: 50%;
		img {
			object-fit: cover;
			width: 100%;
			height: 100%;
		}
	}
	.col-md-12 {
		@media (min-width: 1080px) {
			padding: 0 64px;
		}
	}
	article {
		padding: 4rem 0;
		h1 {
			@media (min-width: 1080px) {
				font-size: 44px;
			}
			@media (max-width: 1080px) {
				font-size: 14px;
			}
			letter-spacing: -0.05em;
			color: rgba(8, 8, 8, 1);
			font-feature-settings: "pnum" on, "lnum" on;
			font-weight: 400;
		}
		h2 {
			@media (min-width: 1080px) {
				font-size: 22px;
			}
			/* @media (max-width: 1080px) {
				font-size: 14px;
			} */
			letter-spacing: -0.05em;
			color: rgba(8, 8, 8, 1);
			font-feature-settings: "pnum" on, "lnum" on;
			font-weight: 500;
		}
		p {
			color: rgba(41, 41, 41, 1);
			font-family: sohne, "Helvetica Neue", Helvetica, Arial, sans-serif;
			font-weight: 300;
			font-size: 14px;
			margin: 0;
		}
		.author_group_details {
			display: flex;
			gap: 1rem;
			align-items: center;
			.author_image {
				width: 60px;
				img {
					width: 100%;
					height: 100%;
					border-radius: 50%;
				}
			}
			p {
				span {
					color: #ffc017;
				}
			}
		}
		.pt-text {
			margin-top: 4rem;
			.h3 {
				margin-top: 2rem;
			}
		}
	}
	hr {
		width: 80%;
		border: 1px solid #ffc017;
		margin: 3rem auto;
	}
    .successful {
        background: #ffc017;
        padding: 2rem;
        color: #fff;
        margin-bottom: 3rem;
    }
	form {
		width: 60%;
		@media (max-width: 585px) {
			width: 100% !important;
		}
		@media (max-width: 989px) {
			width: 100% !important;
		}
		@media (max-width: 220px) {
			width: 100% !important;
		}
		input,
		textarea {
			background: transparent;
			/* color: #eaeaea; */
			margin-bottom: 2rem;
			box-shadow: none !important;
			resize: none;
			padding: 24px 21px !important;
			border-color: #eaeaea !important;
			&:focus {
				border: 1px solid #ffc017 !important;
			}
		}
		.btn-default {
			font-size: calc(var(--font-sm) + 1.1px);
			background #ffc017 !important;
			border: 1px solid #ffc017 !important;
			color: #fff !important;
			border-radius: 5px;
			padding: 15px 40px;
			margin-bottom: 3rem;
		}
	}
    .comments {
        margin-top: 3rem;
        padding: 1rem;
        display: flex;
        flex-direction: column;
        justify-content: flex-start;
        margin-bottom: 3rem;
        h3 {
            font-size: 32px;
            color: #ffc017;
            font-weight: 500;
        }
        hr {
            width: 80%;
            border: 1px solid #ffc017;
            margin: 2rem 0;
        }
        .comment {
            display: flex;
            gap: 1rem;
            align-items: center;
            .info {
                p {

                    span {
                        color: #ffc017;
                        font-size: 1.2rem;
                    }
                }
            }
        }
    }
`;

export default Post;

export const getStaticPaths = async () => {
	const query = `
        *[_type == "post"]{
            _id,
            slug {
                current
            }
        }
    `;
	const posts = await sanityClient.fetch(query);

	const paths = posts.map((post: Post) => ({
		params: {
			slug: post.slug.current,
		},
	}));

	return {
		paths,
		fallback: "blocking",
	};
};

export const getStaticProps: GetStaticProps = async ({ params }) => {
	const query = `
        *[_type == "post" && slug.current == $slug] [0] {
            _id,
            _createdAt,
            title,
            author-> {
                name,
                image
            },
            'comments': *[_type == "comment" && post._ref == ^._id && approved == true],
            description,
            mainImage,
            body,
            slug
        }
    `;
	const post = await sanityClient.fetch(query, {
		slug: params?.slug,
	});

	if (!post) {
		return { notFound: true };
	}
	return {
		props: {
			post,
		},
		revalidate: 60, // updates old cache version after 60 seconds
	};
};
