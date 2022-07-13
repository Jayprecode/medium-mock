/* eslint-disable @next/next/no-img-element */
import React from "react";

import { urlFor } from "../../sanity";
import { ArtistHeader } from "../../typings";

interface Props {
	post: ArtistHeader;
}

const ArticleHeader = ({
	title,
	description,
	image,
	authorName,
	_createdAt,
}: ArtistHeader) => {
	return (
		<div>
			<h1>{title}</h1>
			<h2>{description}</h2>
			<div className="author_group_details">
				<div className="author_image">
					<img src={urlFor(image).url()!} alt={title} />
				</div>
				<p className="by">
					Blog post by <span>{authorName}</span> - Published at{" "}
					{new Date(_createdAt).toLocaleString()}
				</p>
			</div>
		</div>
	);
};

export default ArticleHeader;
