export interface Post {
	_id: string;
	title: string;
	_createdAt: string;
	description: string;
    body: [object];
    comments: Comment[];
	author: {
		name: string;
		image: string;
	};
	slug: {
		current: string;
	};
	mainImage: {
		asset: {
			url: string;
		};
	};
}

export interface Comment { 
    approved: boolean;
    comment: string;
    email: string;
    name: string;
    post: {
        _ref: string;
        _type: string;
    };
    _createdAt: string;
    _updatedAt: string;
    _id: string;
    _rev: string;
    _type: string;
}

export interface ArtistHeader {
    title: string;
    description: string;
    image: string;
    authorName: string;
    _createdAt: string;
}
