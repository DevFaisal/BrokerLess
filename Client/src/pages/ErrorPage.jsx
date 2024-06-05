import React from 'react'
import Container from '../components/Container'

function ErrorPage() {
    return (
        <Container>
            <div
                className='container mx-auto px-4 sm:px-6 lg:px-8 h-screen flex flex-col justify-center items-center'
            >
                <div class="tenor-gif-embed" data-postid="11064080389371270418" data-share-method="host" data-aspect-ratio="2.075" data-width="50%"><a href="https://tenor.com/view/chal-chal-chal-gaari-start-kar-gangs-of-wassepur-memes-gangs-of-wasseypur-lets-go-gif-11064080389371270418">Chal Chal Chal Gaari Start Kar GIF</a>from <a href="https://tenor.com/search/chal+chal+chal-gifs">Chal Chal Chal GIFs</a></div> 
                <h1
                    className='text-9xl text-danger font-bold text-center mt-20'
                >404</h1>
                <p
                    className='text-7xl font-semibold text-center mt-5'
                >Page not found</p>
            </div>
        </Container>
    )
}

export default ErrorPage