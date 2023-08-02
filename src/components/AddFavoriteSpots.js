import React, { useRef, useState } from 'react';
import { useEffect } from 'react';
import { useUpdateUserSpots } from '../hooks/mutations/UseUpdateUserSpots';
import { useSpotList } from '../hooks/queries/UseSpotList';
import { useUserInfo } from '../hooks/queries/UseUserInfo';

export default function AddFavoriteSpots(props) {
	const [checkBoxSpots, setCheckBoxSpots] = useState([]);
	const backgroundDiv = useRef(null);

	const querySpotList = useSpotList();
	const queryUserInfo = useUserInfo();
	const mutation = useUpdateUserSpots();

	useEffect(() => {
		// find User Spots and put them into a set via ID
		const userSpotIdSet = new Set();
		queryUserInfo.data?.forEach(spot => {
			userSpotIdSet.add(spot._id);
		});

		// find the spots that need to be displayed as checked or unchecked
		// by comparing spots list vs user's spots
		setCheckBoxSpots(
			querySpotList.data?.map(spot => {
				let checked = false;
				if (userSpotIdSet.has(spot._id)) {
					checked = true;
				}

				return {
					spot: { ...spot },
					checked,
				};
			})
		);
	}, [querySpotList.data, queryUserInfo.data]);

	const Checkbox = props => (
		<input className="checkBox" type="checkbox" {...props} />
	);

	const handelCheckBoxChange = (event, id) => {
		return checkBoxSpots?.map(box => {
			if (box.spot._id === id) {
				return { spot: { ...box.spot }, checked: event.target.checked };
			}
			return box;
		});
	};

	// on save send spots user has selected to be saved on DB
	const saveClickHandler = async () => {
		mutation.mutate(
			checkBoxSpots
				.filter(checkbox => checkbox.checked)
				.map(checkbox => checkbox.spot._id)
		);
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
			id="add-favorite-spots-modal-outside"
		>
			<div className="spots-modal" id="add-favorite-spots-modal">
				<div className="checkbox-wrap">
					{checkBoxSpots?.map((check, index) => (
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
						<button onClick={cancelClickHandler} id="cancel-add-favorite">
							Cancel
						</button>
					</div>
				</div>
			</div>
		</div>
	);
}
