import supabase, { supabaseUrl } from "./supabase";

export async function getCabins() {

    try {
        const { data, error } = await supabase
            .from('cabins')
            .select('*')

        if (error) {
            console.error(error);
            throw new Error('Cabins could not get loaded')
        }

        return data

    } catch (error) {
        console.error(error);

    }

}

export async function createEditCabin(newCabin, id) {
    // https://hprixrcyydjxkclhmofo.supabase.co/storage/v1/object/public/cabin-images/cabin-002.jpg
    const hasImage = newCabin.image?.startsWith?.(supabaseUrl)

    const imageName = `${Math.random()}-${newCabin.image.name}`.replaceAll('/', '');
    const imagePath = hasImage ? newCabin.image : `${supabaseUrl}/storage/v1/object/public/cabin-images/${imageName}`;

    try {
        let query = supabase.from('cabins')
        // create new cabin
        if (!id) {
            query = query
                .insert([{ ...newCabin, image: imagePath }])
        }

        // edit cabin
        if (id) {
            query = query
                .update({ ...newCabin, image: imagePath })
                .eq('id', id)
        }

        const { data, error } = await query.select().single()


        if (error) {
            console.error(error);
            throw new Error('Cabin could not get created')
        }

        // Upload image to storage bucket supabase
        const { error: storageError } = await supabase
            .storage
            .from('cabin-images')
            .upload(imageName, newCabin.image)

        if (storageError) {
            console.error(storageError);
            await supabase
                .from('cabins')
                .delete()
                .eq('id', data.id)
            throw new Error('Image could not get uploaded')
        }

        return data

    } catch (error) {
        console.error(error);
    }
}


export async function deleteCabin(id) {
    try {

        const { data, error } = await supabase
            .from('cabins')
            .delete()
            .eq('id', id)

        if (error) {
            console.error(error);
            throw new Error('Cabin could not get deleted')
        }

        return data

    } catch (error) {
        console.error(error);
    }
}