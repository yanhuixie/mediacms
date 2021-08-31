import React from 'react';
import { ApiUrlConsumer } from '../utils/contexts/';
import { MediaListWrapper } from '../components/MediaListWrapper';
import { LazyLoadItemListAsync } from '../components/item-list/LazyLoadItemListAsync.jsx';
import { Page } from './Page';

interface TagsPageProps {
  id?: string;
  title?: string;
}

export const TagsPage: React.FC<TagsPageProps> = ({ id = 'tags', title = '标签' }) => (
  <Page id={id}>
    <ApiUrlConsumer>
      {(apiUrl) => (
        <MediaListWrapper title={title} className="items-list-ver">
          <LazyLoadItemListAsync singleLinkContent={true} inTagsList={true} requestUrl={apiUrl.archive.tags} />
        </MediaListWrapper>
      )}
    </ApiUrlConsumer>
  </Page>
);
