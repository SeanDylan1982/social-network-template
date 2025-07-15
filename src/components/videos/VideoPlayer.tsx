'use client';

import { useState, useRef, useEffect } from 'react';
import ReactPlayer from 'react-player/lazy';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import { Slider } from '@/components/ui/slider';
import {
  Play,
  Pause,
  Volume2,
  VolumeX,
  Fullscreen,
  Settings,
  Clock,
  Maximize2,
  Minimize2,
} from 'lucide-react';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';

interface VideoPlayerProps {
  url: string;
  className?: string;
  onReady?: () => void;
  onError?: (error: Error) => void;
  autoPlay?: boolean;
  controls?: boolean;
  light?: boolean | string;
  loop?: boolean;
  muted?: boolean;
  playbackRate?: number;
  pip?: boolean;
  playsinline?: boolean;
  volume?: number;
  width?: string | number;
  height?: string | number;
  style?: React.CSSProperties;
  progressInterval?: number;
  onDuration?: (duration: number) => void;
  onEnded?: () => void;
  onPause?: () => void;
  onPlay?: () => void;
  onProgress?: (state: { played: number; playedSeconds: number; loaded: number; loadedSeconds: number }) => void;
  onSeek?: (seconds: number) => void;
  onPlaybackRateChange?: (rate: number) => void;
  onVolumeChange?: (volume: number) => void;
}

export function VideoPlayer({
  url,
  className,
  onReady,
  onError,
  autoPlay = false,
  controls = true,
  light = false,
  loop = false,
  muted = false,
  playbackRate = 1,
  pip = false,
  playsinline = false,
  volume: initialVolume = 0.8,
  width = '100%',
  height = '100%',
  style,
  progressInterval = 1000,
  onDuration,
  onEnded,
  onPause,
  onPlay,
  onProgress,
  onSeek,
  onPlaybackRateChange: onPlaybackRateChangeProp,
  onVolumeChange: onVolumeChangeProp,
}: VideoPlayerProps) {
  const [playing, setPlaying] = useState(autoPlay);
  const [volume, setVolume] = useState(initialVolume);
  const [isMuted, setIsMuted] = useState(muted);
  const [played, setPlayed] = useState(0);
  const [duration, setDuration] = useState(0);
  const [seeking, setSeeking] = useState(false);
  const [showControls, setShowControls] = useState(controls);
  const [playbackRateState, setPlaybackRate] = useState(playbackRate);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [showSettings, setShowSettings] = useState(false);
  
  const playerRef = useRef<ReactPlayer>(null);
  const playerWrapperRef = useRef<HTMLDivElement>(null);
  const controlsTimeoutRef = useRef<NodeJS.Timeout>();

  // Toggle play/pause
  const togglePlayPause = () => {
    setPlaying(!playing);
  };

  // Handle volume change
  const handleVolumeChange = (value: number[]) => {
    const newVolume = value[0] / 100;
    setVolume(newVolume);
    onVolumeChangeProp?.(newVolume);
    if (newVolume > 0 && isMuted) {
      setIsMuted(false);
    }
  };

  // Toggle mute
  const toggleMute = () => {
    setIsMuted(!isMuted);
  };

  // Handle progress
  const handleProgress = (state: { played: number; playedSeconds: number; loaded: number; loadedSeconds: number }) => {
    if (!seeking) {
      setPlayed(state.played);
    }
    onProgress?.(state);
  };

  // Handle seeking
  const handleSeekChange = (value: number[]) => {
    setPlayed(value[0] / 100);
  };

  const handleSeekMouseDown = () => {
    setSeeking(true);
  };

  const handleSeekMouseUp = (value: number[]) => {
    setSeeking(false);
    const seekTo = value[0] / 100;
    playerRef.current?.seekTo(seekTo);
    setPlayed(seekTo);
    onSeek?.(seekTo * duration);
  };

  // Toggle fullscreen
  const toggleFullscreen = () => {
    if (!document.fullscreenElement) {
      playerWrapperRef.current?.requestFullscreen().catch(err => {
        console.error(`Error attempting to enable fullscreen: ${err.message}`);
      });
      setIsFullscreen(true);
    } else {
      document.exitFullscreen();
      setIsFullscreen(false);
    }
  };

  // Handle keyboard shortcuts
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (!playerWrapperRef.current?.contains(document.activeElement)) return;

      switch (e.key.toLowerCase()) {
        case ' ':
        case 'k':
          e.preventDefault();
          togglePlayPause();
          break;
        case 'm':
          toggleMute();
          break;
        case 'f':
          toggleFullscreen();
          break;
        case 'arrowleft':
        case 'j':
          e.preventDefault();
          playerRef.current?.seekTo(Math.max(0, (played * duration) - 5));
          break;
        case 'arrowright':
        case 'l':
          e.preventDefault();
          playerRef.current?.seekTo(Math.min(duration, (played * duration) + 5));
          break;
        case 'arrowup':
          e.preventDefault();
          handleVolumeChange([Math.min(100, (volume * 100) + 10)]);
          break;
        case 'arrowdown':
          e.preventDefault();
          handleVolumeChange([Math.max(0, (volume * 100) - 10)]);
          break;
        case '0':
        case '1':
        case '2':
        case '3':
        case '4':
        case '5':
        case '6':
        case '7':
        case '8':
        case '9':
          const percent = parseInt(e.key) / 10;
          playerRef.current?.seekTo(percent);
          break;
        case '>':
          setPlaybackRate(prev => {
            const newRate = Math.min(2, prev + 0.25);
            onPlaybackRateChangeProp?.(newRate);
            return newRate;
          });
          break;
        case '<':
          setPlaybackRate(prev => {
            const newRate = Math.max(0.25, prev - 0.25);
            onPlaybackRateChangeProp?.(newRate);
            return newRate;
          });
          break;
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [playing, volume, played, duration, isMuted]);

  // Handle mouse movement for controls
  const handleMouseMove = () => {
    if (controls) {
      setShowControls(true);
      if (controlsTimeoutRef.current) {
        clearTimeout(controlsTimeoutRef.current);
      }
      controlsTimeoutRef.current = setTimeout(() => {
        setShowControls(false);
      }, 3000);
    }
  };

  // Format time in seconds to MM:SS
  const formatTime = (seconds: number) => {
    const date = new Date(0);
    date.setSeconds(seconds);
    const timeString = date.toISOString().substring(11, 19);
    return timeString.startsWith('00:') ? timeString.substring(3) : timeString;
  };

  return (
    <div 
      ref={playerWrapperRef}
      className={cn(
        'relative bg-black rounded-lg overflow-hidden group',
        className
      )}
      style={style}
      onMouseMove={handleMouseMove}
      onMouseLeave={() => {
        if (controls) {
          if (controlsTimeoutRef.current) {
            clearTimeout(controlsTimeoutRef.current);
          }
          setShowControls(false);
        }
      }}
    >
      <ReactPlayer
        ref={playerRef}
        url={url}
        width="100%"
        height="100%"
        playing={playing}
        volume={isMuted ? 0 : volume}
        playbackRate={playbackRateState}
        loop={loop}
        muted={isMuted}
        playsinline={playsinline}
        pip={pip}
        light={light}
        onReady={onReady}
        onError={onError}
        onDuration={(duration) => {
          setDuration(duration);
          onDuration?.(duration);
        }}
        onEnded={onEnded}
        onPause={() => {
          setPlaying(false);
          onPause?.();
        }}
        onPlay={() => {
          setPlaying(true);
          onPlay?.();
        }}
        onProgress={handleProgress}
        progressInterval={progressInterval}
        style={{
          position: 'absolute',
          top: 0,
          left: 0,
        }}
        config={{
          file: {
            attributes: {
              crossOrigin: 'anonymous',
            },
          },
        }}
      />

      {/* Custom Controls */}
      {(!light || (typeof light === 'string' && light)) && (
        <div 
          className={cn(
            'absolute inset-0 bg-gradient-to-t from-black/80 to-transparent transition-opacity duration-300',
            showControls ? 'opacity-100' : 'opacity-0',
            playing && 'group-hover:opacity-100'
          )}
        >
          {/* Progress bar */}
          <div className="absolute bottom-16 left-0 right-0 px-4">
            <Slider
              value={[played * 100]}
              onValueChange={handleSeekChange}
              onPointerDown={handleSeekMouseDown}
              onPointerUp={handleSeekMouseUp}
              className="w-full cursor-pointer"
              max={100}
              step={0.1}
            />
          </div>

          {/* Bottom controls */}
          <div className="absolute bottom-0 left-0 right-0 p-2 flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <Button
                variant="ghost"
                size="icon"
                className="text-white hover:bg-white/20"
                onClick={togglePlayPause}
              >
                {playing ? <Pause className="h-5 w-5" /> : <Play className="h-5 w-5" />}
              </Button>
              
              <div className="flex items-center space-x-1 text-white text-sm">
                <span>{formatTime(played * duration)}</span>
                <span>/</span>
                <span>{formatTime(duration)}</span>
              </div>
              
              <Button
                variant="ghost"
                size="icon"
                className="text-white hover:bg-white/20"
                onClick={toggleMute}
              >
                {isMuted || volume === 0 ? (
                  <VolumeX className="h-5 w-5" />
                ) : (
                  <Volume2 className="h-5 w-5" />
                )}
              </Button>
              
              <div className="w-24">
                <Slider
                  value={[isMuted ? 0 : volume * 100]}
                  onValueChange={handleVolumeChange}
                  max={100}
                  step={1}
                  className="cursor-pointer"
                />
              </div>
            </div>
            
            <div className="flex items-center space-x-2">
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button
                    variant="ghost"
                    size="icon"
                    className="text-white hover:bg-white/20"
                    onClick={(e) => e.stopPropagation()}
                  >
                    <Settings className="h-5 w-5" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent className="w-40">
                  <DropdownMenuItem
                    onClick={() => {
                      const newRate = playbackRateState === 2 ? 0.25 : playbackRateState + 0.25;
                      setPlaybackRate(newRate);
                      onPlaybackRateChangeProp?.(newRate);
                    }}
                    className="flex items-center justify-between"
                  >
                    <span>Playback Speed</span>
                    <span className="text-muted-foreground">{playbackRateState}x</span>
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
              
              <Button
                variant="ghost"
                size="icon"
                className="text-white hover:bg-white/20"
                onClick={toggleFullscreen}
              >
                {isFullscreen ? (
                  <Minimize2 className="h-5 w-5" />
                ) : (
                  <Maximize2 className="h-5 w-5" />
                )}
              </Button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
