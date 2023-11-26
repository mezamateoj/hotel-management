import { useMutation, useQueryClient } from "@tanstack/react-query";
import { createEditCabin } from "../../services/apiCabins";
import toast from "react-hot-toast";

export function useCreate() {
    const queryClient = useQueryClient();
    const { mutate, isLoading } = useMutation({
        mutationFn: createEditCabin,
        onSuccess: () => {
            toast.success('Cabin created');
            queryClient.invalidateQueries({ queryKey: ['cabins'] });
        },
        onError: (err) => {
            toast.error(err.message);
        },
    });

    return { mutate, isLoading }
}

export function useEdit() {
    const queryClient = useQueryClient();
    const { mutate: mutateEdit, isLoading: isEditing } = useMutation({
        mutationFn: ({ newCabinData, id }) => createEditCabin(newCabinData, id),
        onSuccess: () => {
            toast.success('Cabin edited');
            queryClient.invalidateQueries({ queryKey: ['cabins'] });
        },
        onError: (err) => {
            toast.error(err.message);
        },
    });

    return { mutateEdit, isEditing }

}