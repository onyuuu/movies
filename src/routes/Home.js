import React from 'react';
import axios from 'axios';
import Movies from '../components/Movies';
import "./Home.scss";

class Home extends React.Component {
    state = {
        isLoading: true,
        movies: [],
    }

    getMovies= async () => {
        const {
            data : {
                data: {movies},
        },
    }=await axios.get('https://yts-proxy.now.sh/list_movies.json?sort_by=rating');
        this.setState({movies, isLoading:false})  //{movies} = {movies: movies} key와 value값이 같을때 한번만 써도 됨
    }
    componentDidMount() {
        this.getMovies();
    }
    render() {
        const {isLoading, movies} = this.state;
        return (
            <section className='container'>
                {
                isLoading ? (
                <div className='loader'><span className='loader_text'>'Loading...'</span></div>
                ) : (
                <div className='movies'>
                    {movies.map( movie => (
                        <Movies 
                            key={movie.id} 
                            id={movie.id} 
                            year={movie.year} 
                            title={movie.title} 
                            summary={movie.summary} 
                            poster={movie.medium_cover_image} 
                            genres={movie.genres}
                        />
                    ))
                    }
                </div>
                )
                }
            </section>
        );
    }
}

export default Home;