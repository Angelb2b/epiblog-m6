import React, { useState } from 'react'
import { Form, Button } from 'react-bootstrap'
import { useSession } from '../../middlewares/ProtectedRoutes'
import { useDispatch, useSelector } from 'react-redux'
import Carousel from 'react-bootstrap/Carousel';
import { getBlogPosts, searchBlogPost } from '../../Store/blogPostsSlice'



const Hero = () => {

    const [keyword, setKeyword] = useState('')

    const dispatch = useDispatch()
    const session = useSession()
    const actualTheme = useSelector(state => state.theme.theme)

    const handleInputChange = (e) => {
        setKeyword(e.target.value)

        if (e.target.value.trim() === '') dispatch(getBlogPosts())
    }

    return (
        <>
            <Carousel
                style={{ width: '80%px', height: '500px', margin: 'auto' }}
                className='pt-4'
            >
                <Carousel.Item>
                    <img
                        style={{ height: '500px', objectFit: 'cover' }}
                        className="d-block w-100"
                        src="https://www.oberlo.com/media/1634720852-linguaggi-di-programmazione.png"
                        alt="First slide"
                    />
                </Carousel.Item>
                <Carousel.Item>
                    <img
                        style={{ height: '500px', objectFit: 'cover' }}
                        className="d-block w-100"
                        src="https://www.click-academy.it/wp-content/uploads/2021/03/linguaggi-programmazione-web-back-end-sito.jpg"
                        alt="Second slide"
                    />
                </Carousel.Item>
                <Carousel.Item>
                    <img
                        style={{ height: '500px', objectFit: 'cover' }}
                        className="d-block w-100"
                        src="https://www.emitfeltrinelli.it/wp-content/uploads/2018/09/code-1076536_960_720.jpg"
                        alt="Third slide"
                    />
                </Carousel.Item>

            </Carousel>
            <div className='d-flex gap-2 mt-5'>
                <Form.Control
                    type="search"
                    placeholder="Search in all posts"
                    className=" mb-4"
                    aria-label="Search"
                    onChange={handleInputChange}
                    onKeyDown={(e) => {
                        if (e.key==='Enter') dispatch(searchBlogPost(keyword))
                    }}
                />
                <Button
                    onClick={()=> dispatch(searchBlogPost(keyword))}
                    className=" mb-4"
                    variant="info" >
                    Search!
                </Button>
            </div>
        </>


    )
}

export default Hero