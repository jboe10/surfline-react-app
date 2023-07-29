import React, { useState, useEffect } from 'react';
import surfline from '../imgs/fullLogo.png';
import surflineSmall from '../imgs/surfline.png';
import SearchModal from './SearchModal';
import DropdownMenu2 from '../resources/DropdownMenu2';
import { useSpotList } from '../hooks/queries/UseSpotList';
import { useUserInfo } from '../hooks/queries/UseUserInfo';

export default function SearchBar() {
	const [showSearchModal, setShowSearchModal] = useState(false);
	const [forecastDrop, setForecastDrop] = useState(false);
	const [showLogout, setShowLogout] = useState(false);
	const query = useSpotList();
	const q2 = useUserInfo();

	useEffect(() => {
		const token = localStorage.getItem('authorization');
		if (token) {
			setShowLogout(true);
		} else {
			localStorage.removeItem('authorization');
			setShowLogout(false);
		}
	}, []);

	let searchModal;
	showSearchModal
		? (searchModal = <SearchModal setShowSearchModal={setShowSearchModal} />)
		: (searchModal = null);

	const logoutClickHandler = () => {
		setShowLogout(false);
		localStorage.setItem('authorization', '');
		q2.refetch();
	};

	const searchClickHandler = () => {
		setShowSearchModal(true);
	};

	const mouseEnterHandler = () => {
		setForecastDrop(true);
	};

	const mouseLeaveHandler = () => {
		setForecastDrop(false);
	};

	return (
		<>
			<div className="search-bar">
				<div className="home-button">
					<a href="/">
						<img
							src={surfline}
							className="large-logo"
							height="56px"
							width="120px"
							alt="ff"
						/>
						<img
							src={surflineSmall}
							className="small-logo"
							height="56px"
							width="56px"
							alt="ff"
						/>
					</a>
				</div>
				<div
					className="dropdown-f"
					onMouseEnter={mouseEnterHandler}
					onMouseLeave={mouseLeaveHandler}
				>
					FORECASTS
					{forecastDrop && (
						<DropdownMenu2 link="/forecasts/" spots={query.data} />
					)}
				</div>
				<div className="news-link">
					<a href="/news">NEWS</a>
				</div>
				<input type="text" placeholder="Search" onClick={searchClickHandler} />

				<a className="free-trial-btn" href="/join">
					START FREE TRIAL
				</a>
				{!showLogout && <a href="/login">SIGN IN</a>}
				{showLogout && (
					<div className="logout-btn" onClick={logoutClickHandler}>
						LOGOUT
					</div>
				)}
			</div>
			{searchModal}
		</>
	);
}
