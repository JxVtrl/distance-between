import axios from 'axios';

type ReqProps = {
  nameTxt?: string
}

export async function airportsReq({ nameTxt }: ReqProps) {
  const name = nameTxt?.split(' ').slice(0, 1).join(' ').replace(',', '');

  const options = {
    method: 'GET',
    url: 'https://aerodatabox.p.rapidapi.com/airports/search/term',
    params: { q: name },
    headers: {
      'X-RapidAPI-Key': 'f8790a829cmsh0aafd4d37c1efaep1da8c7jsnf7964ac8ad36',
      'X-RapidAPI-Host': 'aerodatabox.p.rapidapi.com',
    },
  };

  try {
    const { data } = await axios(options);
    return data.items;
  } catch (err: any) {
    if (err.message) { console.log(err.message); }
    return [];
  }
}
