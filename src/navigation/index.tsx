import { Spin } from "antd";
import React, { Suspense } from "react";
import { Route, Routes } from 'react-router-dom';

const AppLayout = React.lazy(() => import('../pages/AppLayout'));
const TopPodcasts = React.lazy(() => import('../pages/TopPodcasts'));
const PodcastDetails = React.lazy(() => import('../pages/PodcastDetails'));
const PodcastEpisodes = React.lazy(() => import('../pages/PodcastEpisodes'));
const EpisodeDetails = React.lazy(() => import('../pages/EpisodeDetails'));
const NotFound = React.lazy(() => import('../pages/NotFound'));

const AppRoutes = () => {
  return (
    <Suspense fallback={<Spin />}>
      <Routes>
        <Route path="/*" element={<AppLayout />}>
          <Route index element={<TopPodcasts />} />
          <Route path="podcast/:podcastId" element={<PodcastDetails />}>
            <Route index element={<PodcastEpisodes />} />
            <Route path=":episodeId" element={<EpisodeDetails />} />
          </Route>
          <Route path="*" element={<NotFound />} />
        </Route>
      </Routes>
    </Suspense>
  );
};

export default AppRoutes;
