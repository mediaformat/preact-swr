import { useEffect, useState } from 'preact/hooks';
import preactLogo from '../../assets/preact.svg';
import '../../style.css';
import useSWR from 'swr';
// import fetch from 'unfetcher'
const url = 'https://swapi.dev/api/people';
const fetchData = async (url) => {
    try {
        const response = await fetch(url, {headers: {
          'Accept': 'application/activity+json',
        },});
        const result = await response.json();
        return (result);
    } catch (error) {
        console.error("Error fetching data:", error);
    }
};

export function API() {
    const [loading, setLoading] = useState(true);
    const [hasData, setHasData] = useState(null);

    if (loading) {
        useEffect( () => {
            const { data, error, isLoading } = useSWR('https://swapi.dev/api/people/1', () => fetchData);
        
            if (error) {
                console.log('error', error);
            }
            if (isLoading) {
                console.log('isLoading', isLoading);
            }
            console.log('data', data);
            setHasData(data)
            setLoading(false)
        }, []);
    }
    
	return (
		<div class="swapi">
			<a href="https://preactjs.com" target="_blank">
				<img src={preactLogo} alt="Preact logo" height="160" width="160" />
			</a>
			<h1>SWAPI </h1>
			<section>
				{loading && <p>Loading...</p>}
			</section>
		</div>
	);
}