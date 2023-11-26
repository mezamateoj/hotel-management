import { useMutation, useQueryClient } from "@tanstack/react-query";
import { deleteCabin } from "../../services/apiCabins";
import toast from "react-hot-toast";


export function useDelete() {
    const queryClient = useQueryClient();

    const { isLoading, mutate } = useMutation({
        mutationFn: (id) => deleteCabin(id),
        onSuccess: () => {
            toast.success('Cabin deleted');

            queryClient.invalidateQueries({
                queryKey: ['cabins'],
            });
        },
        onError: (error) => {
            toast.error(error.message);
            console.log(error);
        },
    });

    return {
        isLoading,
        mutate,
    };
}