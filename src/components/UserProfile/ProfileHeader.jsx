import { Avatar, AvatarGroup, Box, Button, Flex, Text, VStack, useDisclosure} from '@chakra-ui/react'
import React from 'react'
import useUserProfileStore from '../../store/userProfileStore'
import useAuthStore from '../../store/authStore';
import EditProfile from './EditProfile';
import useFollowUser from '../../hooks/useFollowUser';

const ProfileHeader = () => {

    const {userProfile} = useUserProfileStore();
    const authUser = useAuthStore(state => state.user)
    const visitingOwnProfileAndAuth = authUser && authUser.username === userProfile.username;
    const visitingAnotherProfileAndAuth = authUser && authUser.username !== userProfile.username;
    const { isOpen, onOpen, onClose } = useDisclosure()
    const {isUpdating, isFollowing, handleFollow} = useFollowUser(userProfile.uid);

  return <Flex 
        gap={{base:4, sm:12}}
        mx={2}
        direction={{base:"column", sm:"row"}}
        >

            <AvatarGroup size={{base:"xl", md:"2xl"}} justifySelf={"center"} alignSelf={"flex-start"} mx={"auto"}>
                <Avatar src={userProfile.profilePicURL} alt="User profile pic"/>
            </AvatarGroup>
        
            <VStack alignItems={"start"} gap={2} mx={"auto"} flex={1}>
                <Flex 
                gap={4} 
                direction={{base:'column', sm:"row"}}
                justifyContent={{base:"center", sm:"flex-start"}}
                alignItems={"center"}
                w={"full"}> 

                    <Text fontSize={{base:"sm", md:"lg"}}>
                        {userProfile.username}
                    </Text>

                    {visitingAnotherProfileAndAuth && (

                        <Flex gap={4} alignItems={"center"} justifyContent={"center"}>
                        <Button
                            bg={"blue.500"}
                            color={"white"}
                            _hover={{ bg: "blue.600" }}
                            size={{ base: "xs", md: "sm" }}
                            onClick={handleFollow}
                            isLoading={isUpdating}
                        >
                         {isFollowing ? "Unfollow" : "Follow"}
                        </Button>
                        </Flex>
                    )}

                    {visitingOwnProfileAndAuth && ( 
                        <Flex gap={4} alignItems={"center"} justifyContent={"center"}>

                            <Button size={{base:"xs", md:"sm"}} bg={"gray.700"} onClick={onOpen}>
                                Edit profile
                            </Button>
                            <Button size={{base:"xs", md:"sm"}} bg={"gray.700"}>
                                View archive
                            </Button>
                                        
                        </Flex>
                    )}

                </Flex>
            
                <Flex 
                gap={{base:2, sm:4, md:8}} 
                alignItems={"center"} 

                > 

                    <Text fontSize={{base:"xs", md:"sm"}}>
                        <Text  as="span" fontWeight={"bold"} mr={1}>{userProfile.posts.length}</Text>
                        posts
                    </Text>
                    <Text cursor={"pointer"} fontSize={{base:"xs", md:"sm"}}>
                        <Text  as="span" fontWeight={"bold"} mr={1}>{userProfile.followers.length}</Text>
                        followers
                    </Text>
                    <Text cursor={"pointer"} fontSize={{base:"xs", md:"sm"}}> 
                        <Text  as="span" fontWeight={"bold"} mr={1}>{userProfile.following.length}</Text>
                        following
                    </Text>

                </Flex>


                <Box my={"12px"}>
                    <Flex flexDirection={"column"}>
                        <Text fontWeight={"bold"} fontSize={14}>
                        {userProfile.fullname}
                        </Text>
                        <Text fontSize={14} as={"span"} >
                            {userProfile.bio}
                        </Text>
                    </Flex>
                </Box>

            </VStack>

            {isOpen && <EditProfile isOpen={isOpen} onClose={onClose}/>}
            
        </Flex>
}

export default ProfileHeader
