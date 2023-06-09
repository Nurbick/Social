import {
    Button,
    Popover,
    PopoverBody,
    PopoverContent,
    PopoverTrigger,
} from '@chakra-ui/react'
import EmojiPicker from 'emoji-picker-react'
import React, { useState } from 'react'
import { BsFillEmojiLaughingFill } from 'react-icons/bs'
import { useDispatch } from 'react-redux'
import { v4 as uuidv4 } from 'uuid'
import { fillUser } from '../../../redux/reducers/user.js'
import axios from '../../../utils/axios.js'

const MyProfileAddPosts = ({ user }) => {
    const dispatch = useDispatch()
    const [posts, setPosts] = useState('')
    const [emoji, setEmoji] = useState(false)
    const addPost = async () => {
        try {
            const res = await axios.patch(`/users/${user._id}/addpost`, {
                id: uuidv4(),
                owner: user._id,
                text: posts,
                date: Date.now(),
            })

            dispatch(fillUser(res.data))
            setPosts('')
        } catch (err) {
            console.log(err)
        }
    }

    return (
        <div className='profile__addPosts'>
            <div className='profile__addPosts-top'>
				<textarea
                    value={posts}
                    onChange={e => setPosts(e.target.value)}
                    className='profile__addPosts-textarea'
                    placeholder='Что у вас нового?'
                />
                <div className='profile__addPosts-emojiPopover'>
                    <Popover>
                        <PopoverTrigger className='profile__addPosts-emojiIcon'>
                            <Button colorScheme='blackAlpha' variant='ghost'>
                                <BsFillEmojiLaughingFill size='20px' />
                            </Button>
                        </PopoverTrigger>
                        <PopoverContent
                            background='none'
                            border='none'
                        >
                            <PopoverBody className='profile__addPosts-emojiPicker'>
                                <EmojiPicker
                                    onEmojiClick={e => setPosts(posts + e.emoji)}
                                    theme='light'
                                    emojiStyle='google'
                                    height='300px'
                                    skinTonePickerLocation='PREVIEW'
                                    searchDisabled='true'
                                    lazyLoadEmojis='trues'
                                />
                            </PopoverBody>
                        </PopoverContent>
                    </Popover>
                </div>
            </div>
            <div className='profile__addPosts-bottom'>
                <Button colorScheme='blue' onClick={addPost}>
                    Опубликовать
                </Button>
            </div>
        </div>
    )
}

export default MyProfileAddPosts