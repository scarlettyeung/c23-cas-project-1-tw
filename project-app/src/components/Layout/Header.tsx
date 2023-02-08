import Search from './Search';
import '../../styles/header.css';
import { useRootSelector } from '../../redux/store';
import { useState, useEffect } from 'react';
import { getAllHashTags } from '../../redux/search';
import { Group, Select, Text } from '@mantine/core';
import { IconChevronDown } from '@tabler/icons-react';
import { tagType } from '../../utils/SearchType';
import { useRootDispatch } from '../../redux/store';
import { SearchTagType, FetchPerformerType, FetchEventDataType } from '../../utils/SearchType';
import Logout from '../Logout';

function Header() {
  ////part of sse
  // const path = process.env.REACT_APP_API_BASE;
  // if (typeof EventSource !== 'undefined' && path) {
  // 	const sse = new EventSource(path, { withCredentials: true });

  // 	sse.onmessage = function (e) {
  // 		console.log(e.data);
  // 	};
  // 	// source.addEventListener(
  // 	// 	'message',
  // 	// 	function (e) {
  // 	// 		console.log(e.data);
  // 	// 	},
  // 	// 	false,
  // 	// );

  // 	// sse.onmessage = function (event) {
  // 	// 	const newElement = document.createElement('li');
  // 	// 	const eventList = document.getElementById('list');

  // 	// 	newElement.innerHTML = 'message: ' + event.data;
  // 	// 	if (newElement && eventList) eventList.appendChild(newElement);
  // 	// };
  // } else {
  // 	alert('browser does not support sse function, message may not be received');
  // }
  ////end of sse

  ////part of search function
  const userName = useRootSelector((state) => state.auth.username);
  // const userIdentity = useRootSelector((state) => state.auth.identity);
  const [query, setQuery] = useState<string>('performer');
  ////ent of search function

  ////part of data

  const dispatch = useRootDispatch();
  useEffect(() => {
    dispatch(getAllHashTags({ hashTags: query }));
  }, [dispatch, query]);
  const hashtagArr = useRootSelector<FetchPerformerType[] | FetchEventDataType[]>(
    (state) => state.search.hashtagArr,
  );
  if (query === SearchTagType.Performer) {
    hashtagArr as FetchPerformerType[];
  }
  if (query === SearchTagType.Event) {
    hashtagArr as FetchEventDataType[];
  }
  ////end of data

  return (
    <div className='header-bar'>
      <Group>
        <p>Hi</p><Text variant="gradient"
          gradient={{ from: 'indigo', to: 'cyan', deg: 45 }}
          sx={{ fontFamily: 'Greycliff CF, sans-serif' }}
          ta="center"
          fz="xl"
          tt="uppercase"
          fw={700}>{userName}</Text>
      </Group>
      <Group>
        <Select
          className='sbar'
          rightSection={<IconChevronDown size={14} />}
          rightSectionWidth={25}
          placeholder='Pick one'
          data={tagType}
          value={query}
          w={100}
          maxDropdownHeight={400}
          onChange={(v) => {
            if (v) {
              setQuery(v);
              dispatch(getAllHashTags({ hashTags: v }));
            }
          }}
        />
        <Search query={query} hashtagArr={hashtagArr} />
        <div className='logOut-Btn'>
          <Logout />
        </div>
      </Group>
    </div>
  );
}

export default Header;
