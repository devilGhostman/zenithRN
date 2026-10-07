import { useQuery } from '@tanstack/react-query';
import { fetchVideos, VIDEO_QUERY_KEY } from '@/infrastructure/videos/videos.service';

export function useVideosQuery() {
  return useQuery({
    queryKey: VIDEO_QUERY_KEY,
    queryFn: fetchVideos,
  });
}
