/* eslint-disable react/prop-types */
import { useState } from 'react';
import toast from 'react-hot-toast';
import { TiDelete } from 'react-icons/ti';
const Tags = ({ tags, setTags }) => {
	const [tag, setTag] = useState('');
	const handleAddTag = (tag) => {
		if (!tag.trim()) {
			return;
		}
		if (tags.length > 5) {
			toast.error('tags limit exceeded');
			return;
		}
		// check if the tag is already in the group
		const tagIsAlreadyInTags = tags?.find((item) => item == tag.toLowerCase());
		// also check if the user is already selected to avoid dublicate
		if (tagIsAlreadyInTags || tags.includes(tag)) {
			toast.error('tag already added');
			return;
		}
		setTags((prev) => [...prev, tag.toLowerCase()]);
		setTag('');
	};
	const handleDelete = (tag) => {
		setTags(tags.filter((item) => item !== tag));
	};
	const handelEnter = () => {
		handleAddTag(tag);
	};
	return (
		<div>
			<div className="flex mt-1">
				{tags?.length > 0 &&
					tags?.map((tag, index) => (
						<div
							key={index}
							className="flex rounded-md bg-gray-100 hover:bg-gray-200 mx-1 px-2"
						>
							<span>{tag}</span>
							<button
								onClick={() => handleDelete(tag)}
								className="text-red-500 text-xl hover:text-red-400"
							>
								<TiDelete />
							</button>
						</div>
					))}
			</div>
			<div className="search-input relative mt-1">
				<input
					type="text"
					id="tag-input1"
					className="input w-full h-[44px] rounded-md border border-gray px-6 text-base"
					value={tag}
					onChange={(e) => setTag(e.target.value)}
					onKeyPress={(event) => {
						if (event.key === 'Enter') {
							handelEnter();
						}
					}}
				/>
				<button
					onClick={handelEnter}
					className="absolute top-1/2 right-5 translate-y-[-50%] hover:text-theme"
				>
					Add
				</button>
			</div>
		</div>
	);
};

export default Tags;
