import React, { useEffect, useRef, useState } from 'react';
import { getSpotList, getUserInfo, updateUserSpots } from '../api/UserApi';
import { convertArrayToHashOfId } from '../utils/Helpers';

export default function AddFavoriteSpots(props) {
	const [checkBoxSpots, setCheckBoxSpots] = useState([]);
	const backgroundDiv = useRef(null);

	useEffect(() => {
		const spotLists = async () => {
			// Get list of all Spots
			const spots = await getSpotList();
			// Get list of users Favorite Spots
			try {
				const userInfo = await getUserInfo();

				const userSpotHash = {};
				userInfo.forEach(spot => {
					userSpotHash[spot._id] = 'ff';
				});

				const checkedSpots = spots.map(spot => {
					let checked = false;
					if (userSpotHash[spot._id] !== undefined) {
						checked = true;
					}
					return {
						spot: { ...spot },
						checked,
					};
				});

				setCheckBoxSpots(checkedSpots);
			} catch (error) {
				props.setShow(false);
				alert('Please Sign In To Continue');
				return error;
			}
		};
		spotLists();
	}, [props]);

	const Checkbox = props => (
		<input className="checkBox" type="checkbox" {...props} />
	);

	const handelCheckBoxChange = (event, id) => {
		const checkBoxSpotsCopy = checkBoxSpots.map(box => {
			if (box.spot._id === id) {
				return { spot: { ...box.spot }, checked: event.target.checked };
			}
			return box;
		});
		return checkBoxSpotsCopy;
	};

	const saveClickHandler = async () => {
		let listOfChecked = [];
		checkBoxSpots.forEach(checkbox => {
			if (checkbox.checked === true) {
				listOfChecked.push(checkbox.spot._id);
			}
		});

		await updateUserSpots(listOfChecked);
		props.setShow(false);
	};

	const clickOutsideOfCheckboxHandler = event => {
		if (event.target === backgroundDiv.current) {
			props.setShow(false);
		}
	};

	const cancelClickHandler = () => {
		props.setShow(false);
	};

	const checkboxChangeHandler = (event, id) => {
		setCheckBoxSpots(handelCheckBoxChange(event, id));
	};

	return (
		<div
			className="add-favorite-spots"
			onClick={clickOutsideOfCheckboxHandler}
			ref={backgroundDiv}
		>
			<div className="spots-modal">
				<div className="checkbox-wrap">
					{checkBoxSpots.map((check, index) => (
						<div className="checkboxes" key={check.spot.name}>
							<Checkbox
								type="checkbox"
								name={check.spot.name}
								checked={check.checked}
								onChange={event => checkboxChangeHandler(event, check.spot._id)}
							/>
							<label>{check.spot.name}</label>
						</div>
					))}
				</div>
				<div className="save-cancel">
					<div className="save">
						<button onClick={saveClickHandler}>Save</button>
					</div>
					<div className="cancel">
						<button onClick={cancelClickHandler}>Cancel</button>
					</div>
				</div>
			</div>
		</div>
	);
}
