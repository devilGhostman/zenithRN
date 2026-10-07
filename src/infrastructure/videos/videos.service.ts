export type VideoItem = {
  id: string;
  title: string;
  uri: string;
  durationLabel: string;
};

export const VIDEO_QUERY_KEY = ['videos'] as const;

const SAMPLE_VIDEOS: VideoItem[] = [
  {
    id: 'big-buck-bunny',
    title: 'Big Buck Bunny',
    uri: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4',
    durationLabel: '9:56',
  },
  {
    id: 'elephants-dream',
    title: 'Elephants Dream',
    uri: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ElephantsDream.mp4',
    durationLabel: '10:53',
  },
  {
    id: 'for-bigger-blazes',
    title: 'For Bigger Blazes',
    uri: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerBlazes.mp4',
    durationLabel: '0:15',
  },
  {
    id: 'sintel',
    title: 'Sintel',
    uri: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/Sintel.mp4',
    durationLabel: '14:48',
  },
  {
    id: 'tears-of-steel',
    title: 'Tears of Steel',
    uri: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/TearsOfSteel.mp4',
    durationLabel: '12:14',
  },
];

export async function fetchVideos(): Promise<VideoItem[]> {
  await new Promise<void>(resolve => {
    setTimeout(resolve, 350);
  });
  return SAMPLE_VIDEOS;
}
