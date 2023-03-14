import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSearch, faTimes } from '@fortawesome/free-solid-svg-icons';
import { CamFavorite } from './CamFavorite';
import { useSpotList } from '../hooks/queries/UseSpotList';

export default function SearchModal(props) {
	const [searchInput, setSearchInput] = useState();
	const query = useSpotList();

	const closeClickHandler = () => {
		props.setShowSearchModal(false);
	};

	const searchInputChangeHandler = event => {
		setSearchInput(event.target.value);
	};

	return (
		<div className="search-modal">
			<div className="search">
				<div className="search-bar">
					<div className="search-input-wrap">
						<div className="search-input">
							<FontAwesomeIcon icon={faSearch} />
							<input
								placeholder="Search spots for Forecast"
								onChange={searchInputChangeHandler}
							/>
						</div>
					</div>
					<div className="search-exit" onClick={closeClickHandler}>
						<FontAwesomeIcon icon={faTimes} />
					</div>
				</div>
				<div className="search-results">
					{query.data
						?.filter(
							spot => spot.name.search(new RegExp(searchInput, 'i')) >= 0
						)
						.map(filteredSpot => (
							<CamFavorite
								id={filteredSpot._id}
								name={filteredSpot.name}
								quality={filteredSpot.quality}
								height={filteredSpot.size}
								key={filteredSpot._id}
							/>
						))}
				</div>
			</div>
		</div>
	);
}
