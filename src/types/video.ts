export interface VideoUser {
  id: string;
  name: string;
  avatar: string;
  username: string;
  isVerified?: boolean;
  subscriberCount?: number;
}

export interface VideoCategory {
  id: string;
  name: string;
  slug: string;
}

export interface VideoComment {
  id: string;
  user: VideoUser;
  content: string;
  likes: number;
  dislikes: number;
  isLiked: boolean;
  isDisliked: boolean;
  replies: VideoComment[];
  createdAt: string;
  updatedAt: string;
}

export interface Video {
  id: string;
  title: string;
  description: string;
  url: string;
  thumbnail: string;
  duration: number; // in seconds
  views: number;
  likes: number;
  dislikes: number;
  isLiked: boolean;
  isDisliked: boolean;
  isBookmarked: boolean;
  isSubscribed: boolean;
  commentCount: number;
  uploadDate: string;
  category: string;
  tags: string[];
  user: VideoUser;
  privacy: 'public' | 'private' | 'unlisted';
  aspectRatio?: '16:9' | '9:16' | '1:1' | '4:3';
  quality?: {
    '144p'?: string;
    '240p'?: string;
    '360p'?: string;
    '480p'?: string;
    '720p'?: string;
    '1080p'?: string;
    '1440p'?: string;
    '2160p'?: string;
    '4320p'?: string;
  };
  captions?: {
    language: string;
    label: string;
    url: string;
  }[];
  chapters?: {
    start: number;
    title: string;
  }[];
  relatedVideos?: Video[];
  comments?: VideoComment[];
  allowComments: boolean;
  allowRatings: boolean;
  allowEmbedding: boolean;
  isLive: boolean;
  wasLive?: boolean;
  liveViewers?: number;
  scheduledStartTime?: string;
  scheduledEndTime?: string;
  recordingStatus?: 'not_started' | 'processing' | 'completed' | 'failed';
  license?: 'youtube' | 'creativeCommon' | 'standard';
  visibility?: 'public' | 'private' | 'unlisted';
  madeForKids: boolean;
  defaultAudioLanguage?: string;
  defaultLanguage?: string;
  topicCategories?: string[];
  location?: {
    latitude: number;
    longitude: number;
    altitude: number;
    name?: string;
  };
  recordingDate?: string;
  durationFormatted: string;
  publishedAt: string;
  updatedAt: string;
  channel: {
    id: string;
    name: string;
    avatar: string;
    subscribers: number;
    isVerified: boolean;
    isSubscribed: boolean;
  };
  engagement: {
    likeCount: number;
    dislikeCount: number;
    viewCount: number;
    commentCount: number;
  };
  restrictions?: {
    blockedCountries: string[];
    allowedCountries: string[];
    blockedRegions: string[];
    allowedRegions: string[];
    ageRestricted: boolean;
  };
  monetization?: {
    isMonetized: boolean;
    isAdEnabled: boolean;
    adFormats: string[];
    adBreaks: number[];
  };
  stats?: {
    viewCount: number;
    likeCount: number;
    dislikeCount: number;
    favoriteCount: number;
    commentCount: number;
  };
  status?: {
    uploadStatus: 'processed' | 'processing' | 'failed' | 'rejected' | 'deleted' | 'claimed';
    privacyStatus: 'public' | 'private' | 'unlisted';
    license: 'youtube' | 'creativeCommon';
    embeddable: boolean;
    publicStatsViewable: boolean;
    madeForKids: boolean;
    selfDeclaredMadeForKids: boolean;
  };
  player?: {
    embedHtml: string;
    embedHeight: number;
    embedWidth: number;
  };
  fileDetails?: {
    fileName: string;
    fileSize: number;
    fileType: string;
    container: string;
    videoStreams: {
      widthPixels: number;
      heightPixels: number;
      frameRateFps: number;
      aspectRatio: number;
      codec: string;
      bitrateBps: number;
      rotation: string;
      vendor: string;
    }[];
    audioStreams: {
      channelCount: number;
      codec: string;
      bitrateBps: number;
      vendor: string;
    }[];
    durationMs: number;
    bitrateBps: number;
    creationTime: string;
  };
  suggestions?: {
    processingErrors: string[];
    processingWarnings: string[];
    processingHints: string[];
    tagSuggestions: {
      tag: string;
      categoryRestricts: string[];
    }[];
    editorSuggestions: string[];
  };
  liveStreamingDetails?: {
    actualStartTime: string;
    actualEndTime: string;
    scheduledStartTime: string;
    scheduledEndTime: string;
    concurrentViewers: string;
    activeLiveChatId: string;
  };
  localizations?: {
    [key: string]: {
      title: string;
      description: string;
    };
  };
  processingProgress?: {
    partsTotal: number;
    partsProcessed: number;
    timeLeftMs: number;
  };
  contentDetails?: {
    duration: string;
    dimension: string;
    definition: 'hd' | 'sd';
    caption: 'true' | 'false';
    licensedContent: boolean;
    regionRestriction?: {
      allowed: string[];
      blocked: string[];
    };
    contentRating?: {
      acbRating?: string;
      agcomRating?: string;
      anatelRating?: string;
      bbfcRating?: string;
      bfvcRating?: string;
      bmukkRating?: string;
      catpfRating?: string;
      cccRating?: string;
      cceRating?: string;
      chfilmRating?: string;
      chvrsRating?: string;
      cicfRating?: string;
      cnaRating?: string;
      cncRating?: string;
      csaRating?: string;
      cscfRating?: string;
      czfilmRating?: string;
      djctqRating?: string;
      djctqRatingReasons?: string[];
      ecbmctRating?: string;
      eefilmRating?: string;
      egfilmRating?: string;
      eirinRating?: string;
      fcbmRating?: string;
      fcoRating?: string;
      fmocRating?: string;
      fpbRating?: string;
      fpbRatingReasons?: string[];
      fskRating?: string;
      grfilmRating?: string;
      icaaRating?: string;
      ifcoRating?: string;
      ilfilmRating?: string;
      incaaRating?: string;
      kfcbRating?: string;
      kijkwijzerRating?: string;
      kmrbRating?: string;
      lsfRating?: string;
      mccaaRating?: string;
      mccypRating?: string;
      mcstRating?: string;
      mdaRating?: string;
      medietilsynetRating?: string;
      mekuRating?: string;
      menaMpaaRating?: string;
      mibacRating?: string;
      mocRating?: string;
      moctwRating?: string;
      mpaaRating?: string;
      mpaatRating?: string;
      mtrcbRating?: string;
      nbcplRating?: string;
      nbcRating?: string;
      nfrcRating?: string;
      nfvcbRating?: string;
      nkclvRating?: string;
      nmcRating?: string;
      oflcRating?: string;
      pefilmRating?: string;
      rcnofRating?: string;
      resorteviolenciaRating?: string;
      rtcRating?: string;
      rteRating?: string;
      russiaRating?: string;
      skfilmRating?: string;
      smaisRating?: string;
      smsRating?: string;
      tvpgRating?: string;
      ytRating?: string;
    };
    projection?: 'rectangular' | '360' | '180' | '3d';
    hasCustomThumbnail?: boolean;
  };
  statistics?: {
    viewCount: number;
    likeCount: number;
    dislikeCount: number;
    favoriteCount: number;
    commentCount: number;
  };
  topicDetails?: {
    topicIds: string[];
    relevantTopicIds: string[];
    topicCategories: string[];
  };
  playerInfo?: {
    embedHtml: string;
    embedHeight: number;
    embedWidth: number;
  };
  processingInfo?: {
    processingStatus: 'processing' | 'succeeded' | 'failed';
    processingProgress: {
      partsTotal: number;
      partsProcessed: number;
      timeLeftMs: number;
    };
    processingFailureReason: 'uploadFailed' | 'transcodeFailed' | 'streamingFailed' | 'other';
    fileDetailsAvailability: string;
    processingIssuesAvailability: string;
    tagSuggestionsAvailability: string;
    editorSuggestionsAvailability: string;
    thumbnailsAvailability: string;
  };
  recordingDetails?: {
    locationDescription: string;
    location: {
      latitude: number;
      longitude: number;
      altitude: number;
    };
    recordingDate: string;
  };
  fileInfo?: {
    fileName: string;
    fileSize: string;
    fileType: string;
    container: string;
    videoStreams: {
      widthPixels: number;
      heightPixels: number;
      frameRateFps: number;
      aspectRatio: number;
      codec: string;
      bitrateBps: number;
      rotation: string;
      vendor: string;
    }[];
    audioStreams: {
      channelCount: number;
      codec: string;
      bitrateBps: number;
      vendor: string;
    }[];
    durationMs: number;
    bitrateBps: number;
    creationTime: string;
  };
  statusInfo?: {
    uploadStatus: 'deleted' | 'failed' | 'processed' | 'rejected' | 'uploaded';
    failureReason: 'codec' | 'conversion' | 'emptyFile' | 'invalidFile' | 'tooSmall' | 'uploadAborted' | 'duplicate' | 'other';
    rejectionReason: 'claim' | 'copyright' | 'duplicate' | 'inappropriate' | 'legal' | 'length' | 'termsOfUse' | 'trademark' | 'uploaderAccountClosed' | 'uploaderAccountSuspended' | 'other';
    privacyStatus: 'private' | 'public' | 'unlisted';
    publishAt: string;
    license: 'youtube' | 'creativeCommon';
    embeddable: boolean;
    publicStatsViewable: boolean;
    madeForKids: boolean;
    selfDeclaredMadeForKids: boolean;
  };
  suggestionsInfo?: {
    processingErrors: string[];
    processingWarnings: string[];
    processingHints: string[];
    tagSuggestions: {
      tag: string;
      categoryRestricts: string[];
    }[];
    editorSuggestions: string[];
  };
  topicCategories?: string[];
  localizationsInfo?: {
    [key: string]: {
      title: string;
      description: string;
    };
  };
}

export interface VideoComment {
  id: string;
  snippet: {
    videoId: string;
    textDisplay: string;
    textOriginal: string;
    authorDisplayName: string;
    authorProfileImageUrl: string;
    authorChannelUrl: string;
    authorChannelId: {
      value: string;
    };
    channelId: string;
    likeCount: number;
    publishedAt: string;
    updatedAt: string;
  };
  replies?: {
    comments: VideoComment[];
  };
}

export interface VideoCategory {
  id: string;
  snippet: {
    title: string;
    assignable: boolean;
    channelId: string;
  };
}

export interface VideoListResponse {
  kind: string;
  etag: string;
  nextPageToken?: string;
  prevPageToken?: string;
  pageInfo: {
    totalResults: number;
    resultsPerPage: number;
  };
  items: Video[];
}

export interface VideoCommentThreadListResponse {
  kind: string;
  etag: string;
  nextPageToken?: string;
  pageInfo: {
    totalResults: number;
    resultsPerPage: number;
  };
  items: VideoCommentThread[];
}

export interface VideoCommentThread {
  kind: string;
  etag: string;
  id: string;
  snippet: {
    channelId: string;
    videoId: string;
    topLevelComment: VideoComment;
    canReply: boolean;
    totalReplyCount: number;
    isPublic: boolean;
  };
  replies?: {
    comments: VideoComment[];
  };
}

export interface VideoRating {
  videoId: string;
  rating: 'none' | 'like' | 'dislike';
}

export interface VideoAbuseReportReason {
  id: string;
  label: string;
  secondaryReasons?: Array<{
    id: string;
    label: string;
  }>;
}

export interface VideoAbuseReportReasonListResponse {
  kind: string;
  etag: string;
  items: VideoAbuseReportReason[];
}

export interface VideoGetRatingResponse {
  kind: string;
  etag: string;
  items: VideoRating[];
}

export interface VideoCategoryListResponse {
  kind: string;
  etag: string;
  items: VideoCategory[];
}

export interface VideoListByCategoryIdParams {
  categoryId: string;
  maxResults?: number;
  pageToken?: string;
  regionCode?: string;
  videoCategoryId?: string;
}

export interface VideoListMostPopularParams {
  part?: string;
  chart?: 'mostPopular';
  regionCode?: string;
  videoCategoryId?: string;
  maxResults?: number;
  pageToken?: string;
}

export interface VideoListRecommendedParams {
  part?: string;
  maxResults?: number;
  pageToken?: string;
  regionCode?: string;
  videoCategoryId?: string;
  onBehalfOfContentOwner?: string;
  onBehalfOfContentOwnerChannel?: string;
  videoId?: string;
}

export interface VideoListRelatedParams {
  part?: string;
  maxResults?: number;
  pageToken?: string;
  regionCode?: string;
  relatedToVideoId: string;
  videoCategoryId?: string;
}

export interface VideoListBySearchParams {
  part?: string;
  q: string;
  type?: string;
  maxResults?: number;
  pageToken?: string;
  videoCategoryId?: string;
  videoDefinition?: 'any' | 'high' | 'standard';
  videoDimension?: '2d' | '3d' | 'any';
  videoDuration?: 'any' | 'long' | 'medium' | 'short';
  videoEmbeddable?: 'any' | 'true';
  videoLicense?: 'any' | 'creativeCommon' | 'youtube';
  videoSyndicated?: 'any' | 'true';
  videoType?: 'any' | 'episode' | 'movie';
  eventType?: 'completed' | 'live' | 'upcoming';
  order?: 'date' | 'rating' | 'relevance' | 'title' | 'videoCount' | 'viewCount';
  safeSearch?: 'moderate' | 'none' | 'strict';
  videoCaption?: 'any' | 'closedCaption' | 'none';
  videoCategoryId?: string;
  videoDefinition?: 'any' | 'high' | 'standard';
  videoDimension?: '2d' | '3d' | 'any';
  videoDuration?: 'any' | 'long' | 'medium' | 'short';
  videoEmbeddable?: 'any' | 'true';
  videoLicense?: 'any' | 'creativeCommon' | 'youtube';
  videoSyndicated?: 'any' | 'true';
  videoType?: 'any' | 'episode' | 'movie';
  regionCode?: string;
  relevanceLanguage?: string;
  topicId?: string;
  videoPaidProductPlacement?: 'any' | 'true';
  videoSyndicated?: 'any' | 'true';
  videoType?: 'any' | 'episode' | 'movie';
}

export interface VideoReportAbuseParams {
  id: string;
  reasonId: string;
  secondaryReasonId?: string;
  comments?: string;
  language?: string;
}

export interface VideoUpdateParams {
  id: string;
  part: string;
  requestBody: {
    id: string;
    snippet?: {
      title?: string;
      description?: string;
      tags?: string[];
      categoryId?: string;
      defaultLanguage?: string;
      defaultAudioLanguage?: string;
    };
    status?: {
      privacyStatus?: 'private' | 'public' | 'unlisted';
      publishAt?: string;
      license?: 'youtube' | 'creativeCommon';
      embeddable?: boolean;
      publicStatsViewable?: boolean;
      madeForKids?: boolean;
      selfDeclaredMadeForKids?: boolean;
    };
    recordingDetails?: {
      locationDescription?: string;
      location?: {
        latitude?: number;
        longitude?: number;
        altitude?: number;
      };
      recordingDate?: string;
    };
    localizations?: {
      [key: string]: {
        title: string;
        description: string;
      };
    };
  };
  onBehalfOfContentOwner?: string;
}

export interface VideoRatingParams {
  id: string;
  rating: 'like' | 'dislike' | 'none';
}

export interface VideoRateResponse {
  kind: string;
  etag: string;
}

export interface VideoDeleteResponse {
  kind: string;
  etag: string;
}

export interface VideoUploadResponse {
  kind: string;
  etag: string;
  id: string;
  snippet: {
    title: string;
    description: string;
    tags: string[];
    categoryId: string;
    liveBroadcastContent: string;
    defaultLanguage: string;
    localized: {
      title: string;
      description: string;
    };
    defaultAudioLanguage: string;
  };
  status: {
    uploadStatus: string;
    failureReason: string;
    rejectionReason: string;
    privacyStatus: string;
    publishAt: string;
    license: string;
    embeddable: boolean;
    publicStatsViewable: boolean;
    madeForKids: boolean;
    selfDeclaredMadeForKids: boolean;
  };
}
