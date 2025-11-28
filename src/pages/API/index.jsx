import { useEffect, useState } from 'preact/hooks';
import preactLogo from '../../assets/preact.svg';
import '../../style.css';
import useSWR from 'swr';

const url = 'https://swapi.dev/api/people/1';
const fetchData = async (url) => {
    try {
        const response = await fetch(url, {
            headers: {
                'Accept': 'application/json',
            },
        })
        const result = await response.json();
        console.log('fetchData',result)
        return result;
    } catch (error) {
        console.error("Error fetching data:", error);
    }
};

export function API() {
    const { data, error, isLoading } = useSWR(url, () => fetchData(url));
    if ( !error && !isLoading) {
        console.log('data', data)
    }
    if ( data ) {
        console.log('data', data)
    }
	return (
		<div class="swapi">
			<a href="https://preactjs.com" target="_blank">
				<img src={preactLogo} alt="Preact logo" height="160" width="160" />
			</a>
			<h1>SWAPI </h1>
			<section>
				{isLoading && <p>Loading...</p>}
				{data && <p>{data.name}</p>}
			</section>
		</div>
	);
}