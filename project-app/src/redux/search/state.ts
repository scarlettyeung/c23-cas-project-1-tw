export interface TagsState {
	hashtagArr: HashTags[];
	loading: 'idle' | 'pending' | 'succeeded' | 'failed';
}

export interface HashTags {
	id: number | undefined;
	name: string | undefined;
	performers_hashtags: any[] | undefined;
	events_hashtags: any[] | undefined;
}
