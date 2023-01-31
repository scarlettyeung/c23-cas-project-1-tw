export interface TagsState {
	hashtagArr: HashTags[];
	loading: 'idle' | 'pending' | 'succeeded' | 'failed';
}

export interface HashTags {
	id: number;
	name: string;
	performers_hashtags: any[];
	events_hashtags: any[];
}
