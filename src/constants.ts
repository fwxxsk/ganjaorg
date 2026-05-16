/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { Member, CardItem } from './types';

export const APP_CONFIG = {
  // LINE: EDIT YOUR MUSIC LINK HERE
  // Use a direct audio file link (mp3/ogg) or a public URL.
  // Note: YouTube links won't work directly in an <audio> tag without a proxy.
  // For best results, use a CDN link like: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3'
  bgMusicUrl: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3', 
  
  // LINE: EDIT GLOBAL BACKGROUND IMAGE HERE
  customBackgroundImg: 'https://drive.google.com/uc?export=download&id=1QQTaswjfRviVF9Xgc_Uv06x8vhyXg4C2', 

  // LINE: EDIT INTRO IMAGE HERE
  splashImgSrc: 'https://drive.google.com/uc?export=download&id=1QQTaswjfRviVF9Xgc_Uv06x8vhyXg4C2', // Add your .jpg or .png link here for the entry button image

  // DISCORD LINK: https://discord.gg/qnEXAvMEb
};

export const MEMBERS_DATA: Member[] = [
  {
    id: 'risk',
    discordId: '1234567890', // put your discord id here
    name: 'risk',
    role: 'EXEC',
    description: 'Community Manager & Lead Designer',
    bannerImg: '', // put your banner image url here
    profileImg: 'https://raw.githubusercontent.com/fwxxsk/ganjaorg/refs/heads/main/8e4c0c11e2786c58b268312ebaa73adc.jpg', // put your profile image url here
    soundSrc: 'XRecorder_20260516_02.mp3', // put your mp3 sound url here
  },
  {
    id: 'wayne',
    discordId: '0987654321', // put your discord id here
    name: 'Wayne',
    role: 'FOUNDER',
    description: 'The visionary behind RANSXM',
    bannerImg: '', // put your banner image url here
    profileImg: '', // put your profile image url here
    soundSrc: '', // put your mp3 sound url here
  },
  {
    id: 'jid',
    discordId: '1122334455', // put your discord id here
    name: 'jid',
    role: 'STAFF',
    description: 'Moderation and Server Security',
    bannerImg: '', // put your banner image url here
    profileImg: '', // put your profile image url here
    soundSrc: '', // put your mp3 sound url here
  },
  {
    id: 'nox',
    discordId: '5566778899', // put your discord id here
    name: 'NOX',
    role: 'HEAD_DEV',
    description: 'Lead Blockchain Architect and SysOp.',
    bannerImg: '', // put your banner image url here
    profileImg: '', // put your profile image url here
    soundSrc: '', // put your mp3 sound url here
  },
  {
    id: 'void',
    discordId: '9988776655', // put your discord id here
    name: 'VOID',
    role: 'ENFORCER',
    description: 'Community integrity specialist.',
    bannerImg: '', // put your banner image url here
    profileImg: '', // put your profile image url here
    soundSrc: '', // put your mp3 sound url here
  },
  {
    id: 'ghost',
    discordId: '', // put your discord id here
    name: 'GhostUser',
    role: 'Lead Architect',
    description: 'Specializing in decentralized network security.',
    bannerImg: '', // put your banner image url here
    profileImg: '', // put your profile image url here
    soundSrc: '', // put your mp3 sound url here
  },
  {
    id: 'cipher',
    discordId: '',
    name: 'Cipher',
    role: 'Data Miner',
    description: 'Extracting patterns from the void.',
    bannerImg: '',
    profileImg: '',
    soundSrc: '',
  },
  {
    id: 'nova',
    discordId: '',
    name: 'Nova',
    role: 'UI Strategist',
    description: 'Defining the visual language of the syndicate.',
    bannerImg: '',
    profileImg: '',
    soundSrc: '',
  }
];

export const THREAT_ITEMS: CardItem[] = [
  {
    id: 'skye',
    title: 'skye',
    description: 'xxx',
    type: 'threat',
    imgSrc: '', // EDIT_BANNER_IMAGE_HERE
    profileImg: 'https://raw.githubusercontent.com/fwxxsk/ganjaorg/refs/heads/main/65d085eb689a1ac0f04ed1e837cf9acd.jpg', // EDIT_PROFILE_IMAGE_HERE
    soundSrc: '',
    discordId: '1314948054691877005', // put your discord id here
  },
  {
    id: 't2',
    title: 'ARCSENDO_V3',
    description: 'bobo ka tol',
    type: 'threat',
    imgSrc: 'https://images.unsplash.com/photo-1451187580459-43490279c0fa?q=80&w=2072&auto=format&fit=crop', // put your banner image url here
    profileImg: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=2574&auto=format&fit=crop', // put your profile image url here
    soundSrc: '', // put your mp3 sound url here
    discordId: '0987654321' // put your discord id here
  },
  {
    id: 't3',
    title: 'ZERO_DAY_COLL',
    description: 'bobo ka tol',
    type: 'threat',
    imgSrc: 'https://images.unsplash.com/photo-1639762681485-074b7f938ba0?q=80&w=2232&auto=format&fit=crop', // put your banner image url here
    profileImg: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?q=80&w=2574&auto=format&fit=crop', // put your profile image url here
    soundSrc: '', // put your mp3 sound url here
    discordId: '' // put your discord id here
  },
  {
    id: 't4',
    title: 'NEON_GHOST',
    description: 'bobo ka tol',
    type: 'threat',
    imgSrc: 'https://images.unsplash.com/photo-1614850523296-d8c1af93d400?q=80&w=2070&auto=format&fit=crop',
    profileImg: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?q=80&w=2570&auto=format&fit=crop',
    soundSrc: '',
    discordId: ''
  },
  {
    id: 't5',
    title: 'VOID_WALKER',
    description: 'bobo ka tol',
    type: 'threat',
    imgSrc: 'https://images.unsplash.com/photo-1534796636912-3b95b3ab5986?q=80&w=2071&auto=format&fit=crop',
    profileImg: 'https://images.unsplash.com/photo-1527980965255-d3b416303d12?q=80&w=2560&auto=format&fit=crop',
    soundSrc: '',
    discordId: ''
  },
  {
    id: 't6',
    title: 'CYBER_PULSE',
    description: 'bobo ka tol',
    type: 'threat',
    imgSrc: 'https://images.unsplash.com/photo-1558591710-4b4a1ae0f04d?q=80&w=2187&auto=format&fit=crop',
    profileImg: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?q=80&w=2560&auto=format&fit=crop',
    soundSrc: '',
    discordId: ''
  }
];

export const MENACE_ITEMS: CardItem[] = [
  {
    id: 'm1',
    title: 'ALPHA_SYNDICATE',
    description: 'GANJA // SYNDICATE',
    type: 'exclusive',
    imgSrc: 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?q=80&w=1964&auto=format&fit=crop', // put your banner image url here
    profileImg: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?q=80&w=2576&auto=format&fit=crop', // put your profile image url here
    soundSrc: '', // put your mp3 sound url here
    discordId: '' // put your discord id here
  },
  {
    id: 'm2',
    title: 'CORE_INTERFACE',
    description: 'GANJA // SYNDICATE',
    type: 'exclusive',
    imgSrc: 'https://images.unsplash.com/photo-1633356122544-f134324a6cee?q=80&w=2070&auto=format&fit=crop',
    profileImg: 'https://images.unsplash.com/photo-1552058544-f20660026b23?q=80&w=2598&auto=format&fit=crop',
    soundSrc: '',
    discordId: ''
  },
  {
    id: 'm3',
    title: 'DARK_WEB_RELIC',
    description: 'GANJA // SYNDICATE',
    type: 'exclusive',
    imgSrc: 'https://images.unsplash.com/photo-1510511459019-5dee211c612b?q=80&w=2070&auto=format&fit=crop',
    profileImg: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?q=80&w=2574&auto=format&fit=crop',
    soundSrc: '',
    discordId: ''
  },
  {
    id: 'm4',
    title: 'QUANTUM_LEAK',
    description: 'GANJA // SYNDICATE',
    type: 'exclusive',
    imgSrc: 'https://images.unsplash.com/photo-1506318137071-a8e063b4bcc0?q=80&w=2070&auto=format&fit=crop',
    profileImg: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=2564&auto=format&fit=crop',
    soundSrc: '',
    discordId: ''
  }
];
