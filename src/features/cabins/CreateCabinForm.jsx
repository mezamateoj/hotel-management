import styled from 'styled-components';
import toast from 'react-hot-toast';
import { useForm } from 'react-hook-form';

import Input from '../../ui/Input';
import Form from '../../ui/Form';
import Button from '../../ui/Button';
import FileInput from '../../ui/FileInput';
import Textarea from '../../ui/Textarea';

import { useCreate, useEdit } from './useCreate';

const FormRow = styled.div`
	display: grid;
	align-items: center;
	grid-template-columns: 24rem 1fr 1.2fr;
	gap: 2.4rem;

	padding: 1.2rem 0;

	&:first-child {
		padding-top: 0;
	}

	&:last-child {
		padding-bottom: 0;
	}

	&:not(:last-child) {
		border-bottom: 1px solid var(--color-grey-100);
	}

	&:has(button) {
		display: flex;
		justify-content: flex-end;
		gap: 1.2rem;
	}
`;

const Label = styled.label`
	font-weight: 500;
`;

const Error = styled.span`
	font-size: 1.4rem;
	color: var(--color-red-700);
`;

function CreateCabinForm({ editCabin = {} }) {
	const { id: editId, ...editValues } = editCabin;
	// variable used to determine if we are editing or creating a new cabin
	const isEditSession = Boolean(editId);

	const { register, handleSubmit, reset, getValues, formState } = useForm({
		defaultValues: isEditSession ? editValues : {},
	});
	const { errors } = formState;
	const { mutate, isLoading } = useCreate();
	const { mutateEdit, isEditing } = useEdit();

	const loadingState = isLoading || isEditing;

	function onSubmit(data) {
		const image =
			typeof data.image === 'string' ? data.image : data.image[0];

		if (isEditSession) {
			return mutateEdit(
				{ newCabinData: { ...data, image }, id: editId },
				{
					onSuccess: () => reset(),
				}
			);
		}
		mutate(
			{ ...data, image: image },
			{
				onSuccess: () => reset(),
			}
		);
	}

	function onError(errors) {
		console.log(errors);
		toast.error('Something went wrong');
	}

	return (
		<Form onSubmit={handleSubmit(onSubmit, onError)}>
			<FormRow>
				<Label htmlFor="name">Cabin name</Label>
				<Input
					type="text"
					id="name"
					{...register('name', {
						required: 'this field is required',
					})}
					disabled={loadingState}
				/>
				{errors?.name?.message && <Error>{errors.name.message}</Error>}
			</FormRow>

			<FormRow>
				<Label htmlFor="maxCapacity">Maximum capacity</Label>
				<Input
					type="number"
					id="maxCapacity"
					{...register('maxCapacity', {
						required: 'this field is required',
						min: { value: 1, message: 'Minimum capacity is 1' },
					})}
					disabled={loadingState}
				/>
				{errors?.maxCapacity?.message && (
					<Error>{errors.maxCapacity.message}</Error>
				)}
			</FormRow>

			<FormRow>
				<Label htmlFor="regularPrice">Regular price</Label>
				<Input
					type="number"
					id="regularPrice"
					{...register('regularPrice', {
						required: 'this field is required',
						min: { value: 1, message: 'Minimum capacity is 1' },
					})}
					disabled={loadingState}
				/>
				{errors?.regularPrice?.message && (
					<Error>{errors.regularPrice.message}</Error>
				)}
			</FormRow>

			<FormRow>
				<Label htmlFor="discount">Discount</Label>
				<Input
					type="number"
					id="discount"
					disabled={loadingState}
					defaultValue={0}
					{...register('discount', {
						required: 'this field is required',
						validate: (value) =>
							value <= getValues().regularPrice ||
							'Discount cannot be higher than regular price',
					})}
				/>
				{errors?.discount?.message && (
					<Error>{errors.discount.message}</Error>
				)}
			</FormRow>

			<FormRow>
				<Label htmlFor="description">Description for website</Label>
				<Textarea
					type="number"
					id="description"
					defaultValue=""
					{...register('description', {
						required: 'this field is required',
					})}
				/>
				{errors?.description?.message && (
					<Error>{errors.description.message}</Error>
				)}
			</FormRow>

			<FormRow>
				<Label htmlFor="image">Cabin photo</Label>
				<FileInput
					id="image"
					type="file"
					accept="image/*"
					{...register('image', {
						required: isEditSession
							? false
							: 'this field is required',
					})}
				/>
			</FormRow>

			<FormRow>
				{/* type is an HTML attribute! */}
				<Button variation="secondary" type="reset">
					Cancel
				</Button>
				<Button disabled={loadingState}>
					{isEditSession ? 'Edit cabin' : 'Create cabin'}
				</Button>
			</FormRow>
		</Form>
	);
}

export default CreateCabinForm;
