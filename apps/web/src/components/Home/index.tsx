import NewPost from '@components/Composer/Post/New';
import ExploreFeed from '@components/Explore/Feed';
import BetaWarning from '@components/Home/BetaWarning';
import Footer from '@components/Shared/Footer';
import { GridItemEight, GridItemFour, GridLayout } from '@components/UI/GridLayout';
import MetaTags from '@components/utils/MetaTags';
import type { NextPage } from 'next';
import { useState } from 'react';
import { useAppStore } from 'src/store/app';

import EnableDispatcher from './EnableDispatcher';
import EnableMessages from './EnableMessages';
import FeedType from './FeedType';
import Hero from './Hero';
import Highlights from './Highlights';
import RecommendedProfiles from './RecommendedProfiles';
import SetDefaultProfile from './SetDefaultProfile';
import SetProfile from './SetProfile';
import Timeline from './Timeline';

const Home: NextPage = () => {
  const currentProfile = useAppStore((state) => state.currentProfile);
  const [feedType, setFeedType] = useState<'TIMELINE' | 'HIGHLIGHTS'>('TIMELINE');

  return (
    <>
      <MetaTags />
      {!currentProfile && <Hero />}
      <GridLayout>
        <GridItemEight className="space-y-5">
          {currentProfile ? (
            <>
              <NewPost />
              <FeedType feedType={feedType} setFeedType={setFeedType} />
              {feedType === 'TIMELINE' ? <Timeline /> : <Highlights />}
            </>
          ) : (
            <ExploreFeed />
          )}
        </GridItemEight>
        <GridItemFour>
          {currentProfile ? (
            <>
              <EnableDispatcher />
              <EnableMessages />
            </>
          ) : null}
          <BetaWarning />
          {currentProfile ? (
            <>
              <SetDefaultProfile />
              <SetProfile />
              <RecommendedProfiles />
            </>
          ) : null}
          <Footer />
        </GridItemFour>
      </GridLayout>
    </>
  );
};

export default Home;
