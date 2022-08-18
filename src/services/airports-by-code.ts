import axios from 'axios';

type ReqProps = {
  nameTxt?: string
}

export async function airportsReq({ nameTxt }: ReqProps) {
  const options = {
    method: 'GET',
    url: 'https://aerodatabox.p.rapidapi.com/airports/search/term',
    params: { q: nameTxt },
    headers: {
      'X-RapidAPI-Key': '6e3f00ce17msh6ea57863855411bp1b7677jsnae60dea6f494',
      'X-RapidAPI-Host': 'aerodatabox.p.rapidapi.com',
    },
  };

  try {
    const { data } = await axios(options);
    return data.items;
  } catch (err: any) {
    if (err.message) {
      console.clear();
      console.log(err.message);
    }
    return [];
  }
}
