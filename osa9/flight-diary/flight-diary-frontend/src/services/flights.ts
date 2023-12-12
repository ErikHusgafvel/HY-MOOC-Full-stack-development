import axios from 'axios';
import { apiBaseUrl } from '../constants';
import { nonSensitiveFlightDiaryEntry } from '../types';

const getAll = async () => {
  //console.log(`Getting data from ${apiBaseUrl}/diaries`);
  const { data } = await axios.get<nonSensitiveFlightDiaryEntry[]>(
    `${apiBaseUrl}/diaries`
  );

  return data;
};

export default { getAll };
