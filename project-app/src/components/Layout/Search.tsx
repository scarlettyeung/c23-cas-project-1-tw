import { useState, useEffect } from 'react';
import type { SpotlightAction } from '@mantine/spotlight';
import { Group, Select, Badge, Text } from '@mantine/core';
import { getAllHashTags } from '../../redux/search';
import { useRootDispatch, useRootSelector } from '../../redux/store';
import { IconChevronDown } from '@tabler/icons-react';
import {
  tagType,
  SearchTagType,
  FetchPerformerType,
  FetchEventDataType,
} from '../../utils/SearchType';
import '../../styles/header.css'

import PerformerEventSearch from './PerformerEventSearch';
import { useNavigate } from 'react-router-dom';
import Logout from '../Logout';

export function Search() {
  const dispatch = useRootDispatch();
  const userName = useRootSelector((state) => state.auth.username);
  const userIdentity = useRootSelector((state) => state.auth.identity);
  const hashtagArr = useRootSelector<FetchPerformerType[] | FetchEventDataType[]>(
    (state) => state.search.hashtagArr,
  );
  const [query, setQuery] = useState<string>('performer');
  const navigate = useNavigate();
  useEffect(() => {
    dispatch(getAllHashTags({ hashTags: query }));
  }, [dispatch, query]);

  if (query === SearchTagType.Performer) {
    hashtagArr as FetchPerformerType[];
    const mapPerformerHashtag = hashtagArr.map((TagObj, idx) => {
      const performerData = TagObj.performers_hashtags.map((data, idx2) => {
        return {
          id: data.performers.users.uuid,
          title: TagObj.name,
          keywords: TagObj.name,
          description: data.performers.users.username,
          image: data.performers.users.icon,
          onTrigger: () => {
            navigate(`/about/uuid/${data.performers.users.uuid}`, { replace: true });
          },
        };
      });
      return performerData;
    });
    const toOneArr: SpotlightAction[] = mapPerformerHashtag.flat(2);
    console.log('performerData toOneArr');
    console.dir(toOneArr);
    return (
      <Group className='header__search__outerDiv'>
        <div className='header_search_username'>
          {userName}
        </div>
        <Select
          className='sbar'
          rightSection={<IconChevronDown size={14} />}
          rightSectionWidth={25}
          styles={{ rightSection: { pointerEvents: 'none' } }}
          placeholder='Pick one'
          data={tagType}
          value={query}
          w={120}
          maxDropdownHeight={400}
          onChange={(v) => {
            if (v) {
              setQuery(v);
              console.log(query);
            }
          }}
        />
        <div className='header__search__btnGroup'>
        <div className='search-Btn'>
          <PerformerEventSearch data={toOneArr} />
        </div>

        <div className='logOut-Btn'>
          <Logout />
        </div>
        </div>
      </Group>
    );
  } else if (query === SearchTagType.Event) {
    hashtagArr as FetchEventDataType[];
    const mapEventHashtag = hashtagArr.map((TagObj) => {
      const eventData = TagObj.events_hashtags.map((data) => {
        console.log(data);
        return {
          id: `${TagObj.name}_${data.events.id}`,
          title: data.events.title,
          keywords: TagObj.name,
          description: TagObj.name,
          image: data.events.image,
          onTrigger: () => {
            navigate(`events/${data.events.id}`, { replace: true });
          },
        };
      });
      return eventData;
    });
    const toOneArr: SpotlightAction[] = mapEventHashtag.flat(2);
    console.dir(toOneArr);
    return (
      <Group className='header__search__outerDiv'>
        <div className='header_search_username'>
          {userName}
        </div>
        <Select
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
              console.log(query);
            }
          }}
        />
        <div className='header__search__btnGroup'>
        <div className='search-Btn'>
        <PerformerEventSearch data={toOneArr} />
        </div>
        <div className='logOut-Btn'>
          <Logout />
        </div>
        </div>
      </Group>
    );
  }

  return (
    <div className='SearchBox'>
      <Select
        data={tagType}
        value={query}
        onChange={(v) => {
          if (v) {
            setQuery(v);
            console.log(query);
          }
        }}
      />
    </div>
  );
}

export default Search;
