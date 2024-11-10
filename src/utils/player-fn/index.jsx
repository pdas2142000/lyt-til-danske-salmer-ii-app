
import { BASE_URL } from '../../constants/url';
import { makeRequest } from '../make-request';
import {Storage_Keys, GetDataFromLocal} from '../../utils/storage';

const DEFAULT_NOTIFICATION_ARTWORK = require('../../../assets/app_logo.png');

export const GetPlayableUrl = async (songId, PlayListId = null) => {
	try {
		let urlData = {
		song_id: songId,
		playlist_id: PlayListId,
		play_playlist: true,
		};
		let UserData = await GetDataFromLocal(Storage_Keys.USER_STORAGE_KEY);
	
		let PlayableUrlResp = await makeRequest(
		'GET',
		`songs/${songId}/get-playable-url`,
		PlayListId ? urlData : {},
		UserData && UserData.token ? UserData.token : null,
		)
		if (PlayableUrlResp.error == 1) {
		return PlayableUrlResp;
		} else {
		return false;
		}
	} catch (err) {
		console.log('get lyrics error', err);
		return false;
	}
	};
	function hmsToSecondsOnly(str) {
	if (typeof str === 'string') {
		var p = str.split(':'),
		s = 0,
		m = 1;

		while (p.length > 0) {
		s += m * parseInt(p.pop(), 10);
		m *= 60;
		}

		return s;
	} else {
		return str;
	}
	}

	export const BuildTrackSongObject = (
	id,
	showLyrics,
	path,
	title,
	artist,
	number,
	duration = null,
	playListId = null,
	image = DEFAULT_NOTIFICATION_ARTWORK,
	) => {
	
	let obj = {
		id: 'track' + id,
		url: path ? `${BASE_URL.url}${path}` : 'http://',
		title: title,
		artist: artist,
		artwork: image,
		songInfo: {
		id: id,
		showLyrics: showLyrics,
		playlistId: playListId,
		number: number,
		},
	};
	if (duration) {
		obj.duration = hmsToSecondsOnly(duration);
	}
	// console.log(obj, 'song obj created'); 
	return obj;
	};

	export const GetSongURLForPlayer = async (songId, showLyrics) => {
	try {
		let resp = await GetPlayableUrl(songId);
		if (resp) {
		let songsObj = BuildTrackSongObject(
			songId,
			showLyrics,
			resp.data.url,
			resp.data.title,
			resp.data.author,
			resp.data.number,
		);
		return songsObj;
		} else {
		return false;
		}
	} catch (err) {
		console.log('GetSongURLForPlayer failed', err);
	}
	};
