import {
    useToast
} from '@chakra-ui/react'
import {
    useCallback
} from 'react';

const useShowToast = () => {

    const toast = useToast();

    //use to prevent infinite loop by caching the function
    const showToast = useCallback (
        (title, description, status) => {

            toast({
                title: title,
                description: description,
                status: status,
                duration: 3000,
                isClosable: true,
            })
        }
    )

    return showToast
}

export default useShowToast