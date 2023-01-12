import React, { useState, useEffect } from 'react';
import { getSpotList, useSpotList } from '../../hooks/queries/UseSpotList';
import { CamFavorite } from '../CamFavorite';
import SearchBar from '../SearchBar';

export default function MobileForecastsNav() {
	const query = useSpotList();

	return (
		<>
			<SearchBar />
			<div className="search-results">
				{query.data.map(spot => (
					<CamFavorite
						id={spot._id}
						name={spot.name}
						quality={spot.quality}
						height={spot.size}
						key={spot._id}
					/>
				))}
			</div>
		</>
	);
}
