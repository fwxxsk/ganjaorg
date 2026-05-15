/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

export interface DiscordActivity {
  type: number;
  name: string;
  details?: string;
  state?: string;
  timestamps?: {
    start?: number;
    end?: number;
  };
  assets?: {
    large_image?: string;
    large_text?: string;
    small_image?: string;
    small_text?: string;
  };
}

export interface LanyardData {
  discord_status: 'online' | 'idle' | 'dnd' | 'offline';
  activities: DiscordActivity[];
  discord_user: {
    username: string;
    public_flags: number;
    id: string;
    discriminator: string;
    avatar: string;
  };
}

export interface Member {
  id: string; // Document ID / Key
  discordId: string;
  name: string;
  role: string;
  description: string;
  profileImg?: string; // Manual override if Discord fails
  bannerImg?: string;  // Manual override for card background
  soundSrc?: string;   // Custom sound on click
}

export interface AppConfig {
  bgMusicUrl: string;
  customBackgroundImg: string;
  splashImgSrc?: string; // Custom image for the intro screen
}

export interface CardItem {
  id: string;
  title: string;
  description: string;
  imgSrc: string; // This acts as the banner
  profileImg?: string; // Circle profile image
  soundSrc?: string; // Custom sound on click
  discordId?: string; // For future presence tracking
  type: 'threat' | 'menace' | 'exclusive';
}
