import axios from 'axios';

export const baseUrl = "https://bayut.p.rapidapi.com"

export const fetchApi = async (url) =>{
    const {data} = await axios.get((url), {
        headers: {
            'X-RapidAPI-Key': '211a7ea10fmshda57ef662e6cf1cp13f579jsnb61240259608',
            'X-RapidAPI-Host': 'bayut.p.rapidapi.com'
          }
    });

    return data;

} 