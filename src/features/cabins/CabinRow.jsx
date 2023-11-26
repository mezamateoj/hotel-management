import styled from 'styled-components';
import { formatCurrency } from '../../utils/helpers';
import { useDelete } from './useDelete';
import { useState } from 'react';
import CreateCabinForm from './CreateCabinForm';

const TableRow = styled.div`
	display: grid;
	grid-template-columns: 0.6fr 1.8fr 2.2fr 1fr 1fr 1fr;
	column-gap: 2.4rem;
	align-items: center;
	padding: 1.4rem 2.4rem;

	&:not(:last-child) {
		border-bottom: 1px solid var(--color-grey-100);
	}
`;

const Img = styled.img`
	display: block;
	width: 6.4rem;
	aspect-ratio: 3 / 2;
	object-fit: cover;
	object-position: center;
	transform: scale(1.5) translateX(-7px);
`;

const Cabin = styled.div`
	font-size: 1.6rem;
	font-weight: 600;
	color: var(--color-grey-600);
	font-family: 'Sono';
`;

const Price = styled.div`
	font-family: 'Sono';
	font-weight: 600;
`;

const Discount = styled.div`
	font-family: 'Sono';
	font-weight: 500;
	color: var(--color-green-700);
`;

function CabinRow({ cabin }) {
	const [isEditing, setIsEditing] = useState(false);
	const { isLoading, mutate } = useDelete();

	return (
		<>
			<TableRow role="row">
				<Img src={cabin.image} alt={cabin.name} />
				<Cabin>{cabin.name}</Cabin>
				<div>fits up to {cabin.maxCapacity} guests</div>
				<Price>{formatCurrency(cabin.regularPrice)}</Price>
				<Discount>{formatCurrency(cabin.discount)}</Discount>
				<div>
					<button
						onClick={() => setIsEditing(!isEditing)}
						disabled={isLoading}
					>
						edit
					</button>
					<button
						onClick={() => mutate(cabin.id)}
						disabled={isLoading}
					>
						delete
					</button>
				</div>
			</TableRow>
			{isEditing && <CreateCabinForm editCabin={cabin} />}
		</>
	);
}

export default CabinRow;
